// controllers/UserController.js
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');

// Register User
exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'ERROR! User already exists' });

    const user = await User.create({ name, email, password });

    if (user) {
      res.status(201).json({
        message: "User registered successfully",
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400).json({ message: 'ERROR! Invalid user data' });
    }
  } catch (error) {
    next(error);
  }
};

// Login User
const jwt = require('jsonwebtoken');
 
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
 
  try {
    const user = await User.findOne({ email });
 
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
 
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: token,
      });
    } else {
      res.status(401).json({ message: 'ERROR! Invalid email or password' });
    }
  } catch (error) {
    next(error);
  }
};
