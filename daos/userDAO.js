const User = require('../models/user');

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

//should pull user by id
module.exports.getUserById = async (userId) => {
    try {
      const usr = await User.findById(userId);
      return usr;
    } catch (error) {
      // console.log(error);
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

module.exports.followUser = async (userId, followingId) => {
  try {
    const user = await User.findById(userId);
    if (user.followingId.includes(followingId)) {
      return null
    }
    user.followingId.push(followingId);
    await user.save();
    return user
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports.unfollowUser = async (userId, followingId) => {
  try {
    const user = await User.findById(userId);
    if (user.followingId.includes(followingId)) {
      user.followingId.pull(followingId);
      await user.save();

      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};


module.exports.followingUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    const followingUsers = [];

    for (const followingUserId of user.followingId) {
      const followingUser = await User.findById(followingUserId);
      followingUsers.push(followingUser);
    }

    return followingUsers;
  } catch (error) {
    console.log(error);
    return null;
  }
};
