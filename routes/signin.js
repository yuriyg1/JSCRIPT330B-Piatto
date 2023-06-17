const { Router } = require("express");
const router = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDAO = require('../daos/userDAO');
const User = require('../models/user');
require('dotenv').config()
const secretKey = process.env.JWT_SECRET

// Sign-in route
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Find the user by email
    const user = await userDAO.getUser(email);
    
    // If user not found, return error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    // If passwords don't match, return error
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '30d' });
    res.header('Authorization', `Bearer ${token}`);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

