const { Router } = require('express');
const { isAuthorized } = require('./middleware');
const User = require('../models/user');
const Quote = require('../models/quote');

const router = Router();

router.get('/', async (req, res) => {
    try {
      const searchTerm = req.query.q;
      const results = await Quote.find({ $text: { $search: searchTerm } })
        .sort({ score: { $meta: 'textScore' } })
        .exec();
        if(results){
            res.status(200).json(results);
        } else{
            return null
        }

    } catch (error) {
      // console.error(error);
      res.status(500).send('Search Error');
    }
  });

module.exports = router;
