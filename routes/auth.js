const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//  @route      GET api/auth
//  @desc       Get logged in user
//  @access     Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.send(500).json({ msg: 'Server Error' });
  }
});
//  @route      POST api/auth
//  @desc       auth user and get token
//  @access     Public
router.post(
  '/',
  [
    check('email', 'Valid email is required').isEmail(),
    check('password', 'At least 6 char password is required').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    console.log(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'invalid credentials' });
      }
      const payload = {
        user: {
          id: user.id
        }
      };
      const jwtSecret = config.get('jwtSecret');
      jwt.sign(payload, jwtSecret, { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);
module.exports = router;
