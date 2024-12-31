const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); // Import your User model


module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token
  console.log('Token:', token); // Log the token value
  console.log('Request Headers:', req.headers); // Log all request headers
  if (!token) {
    return res.status(401).json({ message: 'Authorization failed. Token missing.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    console.log('Decoded Token:', decoded); // Log decoded token

  // Fetch operator information from the database
  const user = await User.findById(decoded.id); // Assuming `id` is in the token payload
  if (!user) {
    return res.status(401).json({ message: 'User authentication failed. User not found.' });
  }

  req.user = {
    id: user._id,
    name: user.name, // Assuming the user's name column is `name`
    role: user.role, // Assuming the user's role column is `role`
  };
    // req.user = decoded; // Attach decoded token data to request object
    next();
  } catch (error) {
    res.status(400).json({ message: 'Authentication error. Invalid token.' });
  }
};
