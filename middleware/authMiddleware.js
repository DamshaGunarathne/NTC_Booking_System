const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authorization failed. Token missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    req.user = {
      id: user._id,
      name: user.name,
      role: user.role,
    };
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Authentication error. Invalid token.' });
  }
};
