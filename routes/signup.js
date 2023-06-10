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

      // console.log(`
      //   firstName: ${firstName} 
      //   lastName: ${lastName}
      //   email: ${email}
      //   password: ${password}
      // `)

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  try {
    const existingUser = await userDAO.getUser(email);
          // console.log('existingUser',existingUser)

    if (existingUser) {
      return res.status(409).json({ message: 'Email taken. Try again.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userDAO.createUser({ firstName, lastName, email, hashedPassword });
    const jwToken = jwt.sign({ email: newUser.email }, secretKey);

    if (newUser) {
      return res.status(200).json({ jwToken });
    } else {
      return res.status(500).json({ message: 'Failed to create user' });
    }
  } 
  catch (e) {
    console.error(e);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
