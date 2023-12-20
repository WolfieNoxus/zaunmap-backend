const User = require('../models/userModel');
const Map = require('../models/mapModel');
const jwt = require('jsonwebtoken');

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
    const sortBy = req.query.sortBy;
    const sortOrder = req.query.sortOrder;
    let users = await User.find();
    if (name) {
      users = users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (sortBy && sortOrder) {
      if (sortBy !== 'name') {
        return res.status(400).send('Invalid query parameters: sortBy must be name');
      }
      if (sortOrder !== 'asc' && sortOrder !== 'desc') {
        return res.status(400).send('Invalid query parameters: sortOrder must be asc or desc');
      }
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
    if (!req.body) {
      return res.status(400).send('Request body is missing');
    }
    if (!req.body.userId) {
      return res.status(400).send('Request body is missing userId');
    }
    if (!req.body.name) {
      return res.status(400).send('Request body is missing name');
    }
    if (!req.body.picture) {
      return res.status(400).send('Request body is missing picture');
    }
    const newUser = new User({
      userId: req.body.userId,
      name: req.body.name,
      picture: req.body.picture
    });
    await newUser.save();
    res.status(201).json(newUser);
  }
  catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message);
  }
}

exports.renameUser = async (req, res) => {
  try {
    const newName = req.query.newName;
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const bearer = bearerHeader.split(' ');
    if (bearer.length !== 2) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = bearer[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = jwt.decode(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId = decoded.sub;
    if (!userId) {
      return res.status(401).send('Unauthorized');
    }
    if (!newName) {
      return res.status(400).send('Invalid query parameters');
    }
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.name = newName;
    await user.save();
    res.status(200).json(user);
  }
  catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message);
  }
}

exports.followUser = async (req, res) => {
  try {
    const bearerHeader = req.headers['authorization'];
    const token = bearerHeader.split(' ')[1];
    const decoded = jwt.decode(token);
    const userId = decoded.sub;
    const followId = req.query.followId;
    const followStr = req.query.follow?.toLowerCase();
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
    const bearerHeader = req.headers['authorization'];
    const token = bearerHeader.split(' ')[1];
    const decoded = jwt.decode(token);
    const userId = decoded.sub;
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
    const bearerHeader = req.headers['authorization'];
    const token = bearerHeader.split(' ')[1];
    const decoded = jwt.decode(token);
    const adminId = decoded.sub;
    if (!adminId) {
      return res.status(401).send('Unauthorized');
    }
    const admin = await User.findOne({ userId: adminId });
    if (!admin) {
      return res.status(404).send('Admin not found');
    }
    if (admin.role !== 'admin') {
      return res.status(403).send('User is not an admin');
    }
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
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const bearer = bearerHeader.split(' ');
    if (bearer.length !== 2) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = bearer[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = jwt.decode(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const userIdFromToken = decoded.sub;
    if (!userId) {
      return res.status(400).send('Invalid query parameters');
    }
    if (!userIdFromToken) {
      return res.status(401).send('Unauthorized');
    }
    if (userId !== userIdFromToken) {
      return res.status(403).send('Forbidden');
    }
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).send('User not found');
    }
    await User.deleteOne({ userId: userId });
    await Map.deleteMany({ _id: { $in: user.maps } });
    res.status(200).send('User deleted successfully');
  } catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message);
  }
}
