const { Router } = require("express");
const router = Router();
const bcrypt = require('bcrypt');
const userDAO = require('../daos/userDAO');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const secretKey = 'abc123';

// Create account route
router.post('/', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
    try {
      const existingUser = await userDAO.getUser(email);

      if (existingUser) {
        return res.status(409).json({ message: 'Email taken. Try agian.' });
      } 
      
      else{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userDAO.createUser({ firstName, lastName, email, hashedPassword })
        const jwToken = jwt.sign({ email: newUser.email }, secretKey);

        if(newUser){
          return res.status(200).json({ jwToken });
        } else{
          return res.status(404).json({ message: 'Failed to create user' });
        }
      }
    } catch (e) {
      if (e.code === 11000) {
        res.status(400).send('User already exists');
      } 
      else {
        console.log(e);
        res.status(500).send(e.message);
      }
    }
  });

module.exports = router;
