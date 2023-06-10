const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {};

// should store a user record
module.exports.createUser = async (userObj) => {
    try {
        const newUser = await User.create(userObj);
        return newUser;
      } catch (error) {
        console.error(error);
        return null;
      }
}

//should get a user record using their email
module.exports.getUser = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;
      } catch (error) {
        console.log(error);
        return null;
      }
}

//should update the user's password field
module.exports.updateUserPassword = async (userId, password) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return null;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

//should pull user by id
module.exports.getUserById = async (userId) => {
    try {
      const usr = await User.findById(userId);
      return usr;
    } catch (error) {
      console.log(error);
      return null;
    }
  };


module.exports.getAllUsers = async () => {
    try {
        const allUsers = await User.find();
        return allUsers;
      } catch (error) {
        console.error(error);
        return null;
      }
}