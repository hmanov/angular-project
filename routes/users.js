const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//  @route      POST /users
//  @desc       Register a user
//  @access     Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'At least 6 char password is required').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).send('A user with this email is already exists');
      }
      //hashing the password
      const hashedPasword = await bcrypt.hash(password, 10);

      user = new User({ name, email, password: hashedPasword });
      user.save();
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
