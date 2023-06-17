const { Router } = require('express');
const { isAuthorized, isAdmin } = require('./middleware');
const userDAO = require('../daos/userDAO');
const quotesDAO = require('../daos/quotesDAO');

const router = Router();

// Add fav quote to User's Stack
router.post('/', isAuthorized, async (req, res) => {
    try {
      const quoteObj = req.body.quote;

      const userId = req.JWToken.userId;
      const savedQuote = await quotesDAO.saveQuote(userId, quoteObj)
      if(savedQuote){
        res.status(200).json({ savedQuote });
      }
    } catch(error) {
            //console.log('e-code',error.code)
      if (error.code === 11000) {
        res.status(400).send('Quote already exists');
      } else {
        console.log(error);
        res.status(500).send(e.message);
      }
    }
  });

// Get all fav quotes from User's Stack
router.get('/', isAuthorized, async (req, res) => {
    try {
      const userId = req.JWToken.userId;
      const allQuote = await quotesDAO.getAllQuotes(userId)

      if(allQuote){
        res.status(200).json({ allQuote });
      }
    } catch(error) {
        console.log(error);
        res.status(500).send(e.message);
    }
});

// Delete selected Quote
router.delete('/:quoteId', isAuthorized, async (req, res) => {
    try {
      const userId = req.JWToken.userId;
      const quoteId = req.params.quoteId;

      const deletedQuote = await quotesDAO.removeQuote(userId, quoteId);
      
      if (deletedQuote) {
        res.status(200).json({ message: 'Successfully deleted' });
      } else {
        res.status(404).json({ message: 'Failed to delete' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
});  

module.exports = router;
