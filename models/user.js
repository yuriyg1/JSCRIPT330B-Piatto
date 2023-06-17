const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true },
  hashedPassword: { type: String, required: true },
  followingId: { type: [String], default: [] },
});


module.exports = mongoose.model("User", userSchema);