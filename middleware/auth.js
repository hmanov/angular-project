const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  //check token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    const verified = jwt.verify(token, config.get('jwtSecret'));
    req.user = verified.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'token not valid' });
  }
};
