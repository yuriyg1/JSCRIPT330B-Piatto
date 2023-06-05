const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  quoteId: { type: String, unique: true, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  length: { type: Number },
  dateAdded: { type: Date },
});

quoteSchema.index({ content: 'text', author: 'text' });

module.exports = mongoose.model("Quote", quoteSchema);