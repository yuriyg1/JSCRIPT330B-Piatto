const { Router } = require("express");
const { isAuthorized, isAdmin } = require('./middleware');
const router = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDAO = require('../daos/userDAO');
const User = require('../models/user');

const secretKey = 'abc123' 

router.get('/', isAuthorized, async (req, res) => {
  const { JWToken } = req;
            console.log('UserID: ',JWToken.userId)

  try {
    const user = await userDAO.getUserById(JWToken.userId);
            console.log('user', user)

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/all', async (req, res) => {
    try {
      // Retrieve all users
      const users = await userDAO.getAllUsers();
      if(users){
        return res.status(200).json({ users });
      } else{
        return null
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
