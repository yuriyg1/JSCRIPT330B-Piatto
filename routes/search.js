const { Router } = require('express');
const { isAuthorized } = require('./middleware');
const User = require('../models/user');
const Quote = require('../models/quote');

const router = Router();

router.get('/', isAuthorized, async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const userId = req.JWToken.userId;

    const results = await Quote.find({
      $and: [
        { $text: { $search: searchTerm } },
        { userId: userId } // Only want my quotes, not others
      ]
    })
      .sort({ score: { $meta: 'textScore' } })
      .exec();

    if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(200).json([]);
    }

  } catch (error) {
    // console.error(error);
    res.status(500).send('Search Error');
  }
});



module.exports = router;
