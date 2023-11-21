const User = require('../models/userModel');

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId; // Get user_id from route parameter
    const user = await User.findOne({ user_id: userId }); // Find user by user_id
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Additional controller methods like updateUser, deleteUser, etc.
