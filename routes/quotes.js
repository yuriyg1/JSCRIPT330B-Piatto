const { Router } = require('express');
const { isAuthorized, isAdmin } = require('./middleware');
// const User = require('../models/user');
const userDAO = require('../daos/userDAO');
const quotesDAO = require('../daos/quotesDAO');

const router = Router();

router.post('/', isAuthorized, async (req, res) => {
    try {
      const quoteObj = req.body.quote;
          // console.log('quoteObj',quoteObj)

      const userId = req.JWToken.userId;
          console.log('userId',userId)
      const usr = await userDAO.getUserById(userId)
      const savedQuote = await quotesDAO.saveQuote(userId, quoteObj)
          //console.log('savedQuote',savedQuote)
      if(savedQuote){
        res.status(200).json({ savedQuote });
      }
    } catch(error) {
            console.log('e-code',error.code)
      if (error.code === 11000) {
        res.status(400).send('Quote already exists');
      } else {
        console.log(error);
        res.status(500).send(e.message);
      }
    }
  });

  router.get('/', isAuthorized, async (req, res) => {
    try {
      const userId = req.JWToken.userId;
          //console.log('userId',userId)
      //const usr = await userDAO.getUserById(userId)
      const allQuote = await quotesDAO.getAllQuotes(userId)
          //console.log('allQuote',allQuote)
      if(allQuote){
        res.status(200).json({ allQuote });
      }
    } catch(error) {
            console.log('e-code',error.code)
      if (error.code === 11000) {
        res.status(400).send('Quote already exists');
      } else {
        console.log(error);
        res.status(500).send(e.message);
      }
    }
  });

  router.delete('/:quoteId', isAuthorized, async (req, res) => {
    try {
      const userId = req.JWToken.userId;
      const quoteId = req.params.quoteId; // Access quoteId from req.params
      console.log('userId', userId);
      const deletedQuote = await quotesDAO.removeQuote(userId, quoteId);
      // console.log('allQuote', allQuote)
      if (deletedQuote) {
        res.status(200).json({ message: 'Successfully deleted' });
      } else {
        res.status(200).json({ message: 'Failed to delete' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });
  

module.exports = router;
