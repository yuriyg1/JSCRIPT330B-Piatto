const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true },
    hashedPassword: { type: String, required: true },
    // roles: { type: [String], default: ['user'], required: true },
  });

module.exports = mongoose.model("User", userSchema);