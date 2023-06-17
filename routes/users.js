const { Router } = require("express");
const { isAuthorized } = require('./middleware');
const router = Router();
const userDAO = require('../daos/userDAO');

// Grabs the user 
router.get('/', isAuthorized, async (req, res) => {
  const { JWToken } = req;

  try {
    const user = await userDAO.getUserById(JWToken.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Grabs Users he/she follows
router.get('/following', isAuthorized, async (req, res) => {
  const { JWToken } = req;

  try {
    const users = await userDAO.followingUser(JWToken.userId);

    res.status(200).json({ users });
  } catch (error) {
    console.error('Failed to follow user', error);
    res.status(500).json({ error: 'Failed to follow user' });
  }
});

// Grabs Users he/she is not following
router.get('/not-following', isAuthorized, async (req, res) => {
  const { JWToken } = req;

  try {
    const users = await userDAO.getAllUsers();
    const meJSON = await userDAO.getUserById(JWToken.userId);
    const arrayOfFollowingIds = meJSON.followingId;
    
    const filteredUsers = users.filter(
      (user) =>
        user._id.toString() !== JWToken.userId &&
        !arrayOfFollowingIds.includes(user._id.toString())
    );
    
    return res.status(200).json({ users: filteredUsers });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Adds user he/she wants to follow
router.post('/follow', isAuthorized, async (req, res) => {
  const { userId } = req.body;
  const { JWToken } = req;

  try {
    const user = await userDAO.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const following = await userDAO.followUser(JWToken.userId, userId);

    if (following) {
      const allUsers = await userDAO.getAllUsers();
      const followingIds = following.followingId.map(id => id.toString());
      const users = allUsers.filter(user => !followingIds.includes(user._id.toString()));

      return res.status(200).json({ users });
    } 
  } catch (error) {
    console.error('Failed to follow user', error);
    res.status(500).json({ error: 'Failed to follow user' });
  }
});



// Removes user he/she doesn't want to follow
router.post('/unfollow', isAuthorized, async (req, res) => {
  const { userId } = req.body;
  const { JWToken } = req;

  try {
    const following = await userDAO.unfollowUser(JWToken.userId, userId);

    if (following) {
      return res.status(200).send({ message: 'Unfollowed successfully' });
    } else {
      return res.status(404).send({ message: 'User not found or other issue' });
    }
  } catch (error) {
    console.error('Failed to unfollow user', error);
    res.status(500).send({ error: 'Failed to unfollow user' });
  }
});

module.exports = router;
