const mongoose = require('mongoose');
const Quote = require('../models/quote');
const User = require('../models/user');

module.exports = {};

//should create a quote for the given user
module.exports.saveQuote = async (userId, quoteObj) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return null;
      }
      const doubleQuote = await Quote.findOne({ quoteId: quoteObj._id });
      if (doubleQuote) {
        return null;
      }
      
      const newQuote = new Quote({
        userId: user._id,
        quoteId: quoteObj._id,
        author: quoteObj.author,
        content: quoteObj.content,
        tags: quoteObj.tags,
        length: quoteObj.length,
        dateAdded: new Date()
      });

      await newQuote.save();
      return newQuote;
    } catch (error) {
        console.error(error);
        return null;
    }
  }

module.exports.getAllQuotes = async (userId) => {
  try {
    const quotes = await Quote.find({ userId: userId });
    return quotes;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports.removeQuote = async (userId, quoteId) => {
  try {
    const quote = await Quote.findOneAndDelete({ userId: userId, _id: quoteId });
    return quote;
  } catch (error) {
    // console.error(error);
    return null;
  }
};

module.exports.getUserQuotes = async (userId, quoteId) => {
  try {
    const quote = await Quote.findOne({ userId: userId, _id: quoteId })
    return quote;
  } catch (error) {
    console.error(error);
    return null;
  }
}
