const User = require('../models/userModel');
const Map = require('../models/mapModel');
const jwt = require('jsonwebtoken');

// Function to retrieve a specific user by userId
exports.getUser = async (req, res) => {
  try {
    // Extract userId from query parameters
    const userId = req.query.userId;
    if (!userId) {
      // Respond with an error if userId is not provided
      return res.status(400).send('Invalid query parameters');
    }

    // Find the user in the database
    const user = await User.findOne({ userId: userId });
    if (!user) {
      // Respond with an error if the user is not found
      return res.status(404).send('User not found');
    }

    // Send the found user in the response
    res.status(200).json(user);
  }
  catch (error) {
    // Handle any server errors
    res.status(500).send('Internal Server Error: ' + error.message);
  }
};

// Function to search for users based on name, with optional sorting
exports.searchUsers = async (req, res) => {
  try {
    // Extract search and sorting parameters from query
    const name = req.query.name;
    const sortBy = req.query.sortBy;
    const sortOrder = req.query.sortOrder;

    // Retrieve all users
    let users = await User.find();

    // Filter users by name if provided
    if (name) {
      users = users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
    }

    // Sort users if sorting parameters are provided
    if (sortBy && sortOrder) {
      if (sortBy !== 'name') {
        // Respond with an error if sortBy parameter is invalid
        return res.status(400).send('Invalid query parameters: sortBy must be name');
      }
      if (sortOrder !== 'asc' && sortOrder !== 'desc') {
        // Respond with an error if sortOrder parameter is invalid
        return res.status(400).send('Invalid query parameters: sortOrder must be asc or desc');
      }
      users = users.sort((a, b) => sortOrder === 'asc' ? (a[sortBy] < b[sortBy] ? -1 : 1) : (a[sortBy] > b[sortBy] ? 1 : -1));
    }

    // Send the sorted/filtered user list in the response
    res.status(200).json(users);
  }
  catch (error) {
    // Handle any server errors
    res.status(500).send('Internal Server Error: ' + error.message);
  }
};

// Function to create a new user
exports.createUser = async (req, res) => {
  try {
    // Check if the request body is present
    if (!req.body) {
      return res.status(400).send('Request body is missing');
    }

    // Extract user details from request body
    const userId = req.body.userId;
    const name = req.body.name;
    const picture = req.body.picture;

    // Validate the required fields
    if (!userId) {
      return res.status(400).send('Request body is missing userId');
    }
    if (!name) {
      return res.status(400).send('Request body is missing name');
    }
    if (!picture) {
      return res.status(400).send('Request body is missing picture');
    }

    // Create a new user object
    const newUser = new User({
      userId: userId,
      name: name,
      picture: picture
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with the created user
    res.status(201).json(newUser);
  }
  catch (error) {
    // Handle any errors during the process
    res.status(500).send('Internal Server Error: ' + error.message);
  }
};

// Function to rename an existing user
exports.renameUser = async (req, res) => {
  try {
    // Extract the new name from the query parameters
    const newName = req.query.newName;

    // Validate the authorization token from the request header
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

    // Decode the JWT token to get user information
    const decoded = jwt.decode(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Retrieve userId from the decoded token
    const userId = decoded.sub;
    if (!userId) {
      return res.status(401).send('Unauthorized');
    }

    // Validate the newName parameter
    if (!newName) {
      return res.status(400).send('Invalid query parameters');
    }

    // Find the user in the database
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Check if the requesting user is the same as the user being renamed
    if (userId !== user.userId) {
      return res.status(403).send('Forbidden');
    }

    // Update the user's name
    user.name = newName;
    await user.save();

    // Respond with the updated user
    res.status(200).json(user);
  }
  catch (error) {
    // Handle any errors during the process
    res.status(500).send('Internal Server Error: ' + error.message);
  }
};

// Function to handle following or unfollowing a user
exports.followUser = async (req, res) => {
  try {
    // Validate the authorization token from the request header
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

    // Decode the JWT token to get user information
    const decoded = jwt.decode(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Retrieve userId from the decoded token and extract followId and follow status from query parameters
    const userId = decoded.sub;
    const followId = req.query.followId;
    const followStr = req.query.follow?.toLowerCase();
    if (!userId || !followId || followStr === undefined) {
      return res.status(400).send('Invalid query parameters');
    }
    if (followStr !== 'true' && followStr !== 'false') {
      return res.status(400).send('Invalid query parameters: follow must be true or false');
    }
    const follow = followStr === 'true';

    // Find the user and the user to be followed/unfollowed
    const user = await User.findOne({ userId: userId });
    const followedUser = await User.findOne({ userId: followId });
    if (!user) {
      return res.status(404).send('User not found');
    }
    if (!followedUser) {
      return res.status(404).send('Followed user not found');
    }

    // Update following and followers list based on the action
    if (follow) {
      if (user.following.includes(followId)) {
        return res.status(200).send('User already following');
      }
      user.following.push(followId);
      followedUser.followers.push(userId);
    } else {
      if (!user.following.includes(followId)) {
        return res.status(200).send('User not following');
      }
      user.following.pull(followId);
      followedUser.followers.pull(userId);
    }

    // Save the changes to both users
    await user.save();
    await followedUser.save();

    // Send a success response
    res.status(200).send('User updated successfully');
  } catch (error) {
    // Handle any errors during the process
    res.status(500).send('Internal Server Error: ' + error.message);
  }
};

// Function to handle blocking or unblocking a user
exports.blockUser = async (req, res) => {
  try {
    // Validate the authorization token from the request header
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

    // Decode the JWT token to get user information
    const decoded = jwt.decode(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Retrieve userId from the decoded token and extract blockId and block status from query parameters
    const userId = decoded.sub;
    const blockId = req.query.blockId;
    const blockStr = req.query.block.toLowerCase();
    if (!userId || !blockId || !blockStr) {
      return res.status(400).send('Invalid query parameters');
    }
    if (blockStr !== 'true' && blockStr !== 'false') {
      return res.status(400).send('Invalid query parameters: block must be true or false');
    }
    const block = blockStr === 'true';

    // Find the user and the user to be blocked/unblocked
    const user = await User.findOne({ userId: userId });
    const blockedUser = await User.findOne({ userId: blockId });
    if (!user) {
      return res.status(404).send('User not found');
    }
    if (!blockedUser) {
      return res.status(404).send('Blocked user not found');
    }

    // Update the user's blocked list based on the action
    if (block) {
      if (user.blocked.includes(blockId)) {
        return res.status(200).send('User already blocked');
      }
      user.blocked.push(blockId);
    } else {
      if (!user.blocked.includes(blockId)) {
        return res.status(200).send('User not blocked');
      }
      user.blocked.pull(blockId);
    }

    // Save the changes to the user
    await user.save();

    // Send a success response
    res.status(200).send('User updated successfully');
  } catch (error) {
    // Handle any errors during the process
    res.status(500).send('Internal Server Error: ' + error.message);
  }
};

// Function to change the role of a user
exports.changeUserRole = async (req, res) => {
  try {
    // Validate the authorization token from the request header
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

    // Decode the JWT token to get admin user information
    const decoded = jwt.decode(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Retrieve adminId from the decoded token
    const adminId = decoded.sub;
    if (!adminId) {
      return res.status(401).send('Unauthorized');
    }

    // Find the admin user in the database
    const admin = await User.findOne({ userId: adminId });
    if (!admin) {
      return res.status(404).send('Admin not found');
    }
    if (admin.role !== 'admin') {
      return res.status(403).send('User is not an admin');
    }

    // Extract userId and newRole from query parameters
    const userId = req.query.userId;
    const newRole = req.query.newRole;
    if (!userId || !newRole) {
      return res.status(400).send('Invalid query parameters');
    }

    // Validate newRole value
    if (!['user', 'admin', 'restricted', 'disabled'].includes(newRole)) {
      return res.status(400).send('Invalid query parameters: newRole must be user, admin, restricted, or disabled');
    }

    // Find the user whose role is to be changed
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Change the user's role
    user.role = newRole;
    await user.save();

    // Send a success response
    res.status(200).send('User updated successfully');
  } catch (error) {
    // Handle any errors during the process
    res.status(500).send('Internal Server Error: ' + error.message);
  }
};

// Function to delete a user
exports.deleteUser = async (req, res) => {
  try {
    // Extract userId from query parameters
    const userId = req.query.userId;

    // Validate the authorization token from the request header
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

    // Decode the JWT token to get user information
    const decoded = jwt.decode(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Retrieve userId from the decoded token
    const userIdFromToken = decoded.sub;
    if (!userId) {
      return res.status(400).send('Invalid query parameters');
    }
    if (!userIdFromToken) {
      return res.status(401).send('Unauthorized');
    }

    // Ensure that the requesting user is the same as the user to be deleted
    if (userId !== userIdFromToken) {
      return res.status(403).send('Forbidden');
    }

    // Find the user in the database
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Delete the user from the database
    await User.deleteOne({ userId: userId });

    // Send a success response
    res.status(200).send('User deleted successfully');
  } catch (error) {
    // Handle any errors during the process
    res.status(500).send('Internal Server Error: ' + error.message);
  }
};
