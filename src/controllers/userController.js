const User = require('../models/userModel');
const Map = require('../models/mapModel');

exports.getUser = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).send('Invalid query parameters');
    }

    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user);
  }
  catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message);
  }
}

exports.searchUsers = async (req, res) => {
  try {
    const name = req.query.name;
    const role = req.query.role;
    const sortBy = req.query.sortBy;
    const sortOrder = req.query.sortOrder;

    let users = await User.find();
    if (name) {
      users = users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (sortBy && sortOrder) {
      users = users.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (a[sortBy] > b[sortBy]) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    res.status(200).json(users);
  }
  catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message);
  }
}

exports.createUser = async (req, res) => {
  try {
    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send('Invalid user data');
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  }
  catch (error) {
    // Assuming the error is due to invalid data provided by the client
    res.status(400).send('Error creating user: ' + error.message);
  }
}

exports.renameUser = async (req, res) => {
  try {
    // Validate query parameters
    if (!req.query.userId || !req.query.newName) {
      return res.status(400).send('Invalid query parameters');
    }

    const user = await User.findOne({ userId: req.query.userId });
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.name = req.query.newName;
    await user.save();
    res.status(200).json(user);
  }
  catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message);
  }
}

exports.followUser = async (req, res) => {
  try {
    const userId = req.query.userId;
    const followId = req.query.followId;
    const followStr = req.query.follow.toLowerCase();
    if (followStr !== 'true' && followStr !== 'false') {
      return res.status(400).send('Invalid query parameters: follow must be true or false');
    }
    const follow = followStr === 'true';
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const followedUser = await User.findOne({ userId: followId });
    if (!followedUser) {
      return res.status(404).send('Followed user not found');
    }
    if (follow) {
      if (user.following.includes(followId)) {
        return res.status(200).send('User already following');
      }
      user.following.push(followId);
      followedUser.followers.push(userId);
    }
    else {
      if (!user.following.includes(followId)) {
        return res.status(200).send('User not following');
      }
      user.following.pull(followId);
      followedUser.followers.pull(userId);
    }
    await user.save();
    await followedUser.save();
    res.status(200).send('User updated successfully');
  } catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message);
  }
}

exports.blockUser = async (req, res) => {
  try {
    const userId = req.query.userId;
    const blockId = req.query.blockId;
    const blockStr = req.query.block.toLowerCase();
    if (blockStr !== 'true' && blockStr !== 'false') {
      return res.status(400).send('Invalid query parameters: block must be true or false');
    }
    const block = blockStr === 'true';
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const blockedUser = await User.findOne({ userId: blockId });
    if (!blockedUser) {
      return res.status(404).send('Blocked user not found');
    }
    if (block) {
      if (user.blocked.includes(blockId)) {
        return res.status(200).send('User already blocked');
      }
      user.blocked.push(blockId);
    }
    else {
      if (!user.blocked.includes(blockId)) {
        return res.status(200).send('User not blocked');
      }
      user.blocked.pull(blockId);
    }
    await user.save();
    res.status(200).send('User updated successfully');
  } catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message);
  }
}

exports.changeUserRole = async (req, res) => {
  try {
    const userId = req.query.userId;
    const newRole = req.query.newRole;
    if (!userId || !newRole) {
      return res.status(400).send('Invalid query parameters');
    }
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.role = newRole;
    await user.save();
    res.status(200).send('User updated successfully');
  } catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message);
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).send('Invalid query parameters');
    }
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).send('User not found');
    }
    await user.remove();
    res.status(200).send('User deleted successfully');
  } catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message);
  }
}
