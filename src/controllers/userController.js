const User = require('../models/userModel');

exports.getUser = async (req, res) => {
  try {
    // Validate query parameters
    // if (!req.query.user_id) {
    //   return res.status(400).send('Invalid query parameters');
    // }

    const user = await User.findOne({ user_id: req.user.sub });
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user);
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

exports.rename = async (req, res) => {
  try {
    // Validate query parameters
    if (!req.query.user_id || !req.query.new_name) {
      return res.status(400).send('Invalid query parameters');
    }

    const user = await User.findOne({ user_id: req.query.user_id });
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.user_name = req.query.new_name;
    await user.save();
    res.status(200).send('User name updated successfully');
  }
  catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message);
  }
}

exports.restrict = async (req, res) => {
  try {
    // Validate query parameters
    if (!req.query.user_id || req.query.restrict === undefined) {
      return res.status(400).send('Invalid query parameters');
    }

    const restrictParam = req.query.restrict?.toLowerCase();
    if (restrictParam !== 'true' && restrictParam !== 'false') {
      return res.status(400).send('Invalid query parameters: restrict must be true or false');
    }

    const user = await User.findOne({ user_id: req.query.user_id });
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.role = restrictParam === 'true' ? 'restricted' : 'user';
    await user.save();
    res.status(200).send('User role updated successfully');
  }
  catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message);
  }
}

exports.disable = async (req, res) => {
  try {
    // Validate query parameters
    if (!req.query.user_id) {
      return res.status(400).send('Invalid query parameters: user_id is required');
    }

    // Convert the disable parameter to lowercase and check if it is 'true' or 'false'
    const disableParam = req.query.disable.toLowerCase();
    if (disableParam !== 'true' && disableParam !== 'false') {
      return res.status(400).send('Invalid query parameters: disable must be true or false');
    }

    // Find the user
    const user = await User.findOne({ user_id: req.query.user_id });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Set user role
    user.role = disableParam === 'true' ? 'disabled' : 'user';
    await user.save();

    res.status(200).send('User status updated successfully');
  }
  catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message);
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  }
  catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message);
  }
}