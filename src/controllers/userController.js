const User = require('../models/userModel');

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.query.user_id });
    res.status(200).json(user);
  }
  catch (error) {
    res.status(404).send(error.message);
  }
}

exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  }
  catch (error) {
    res.status(400).send(error.message);
  }
}

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.id });
    Object.assign(user, req.body);
    await user.save();
    res.status(200).json(user);
  }
  catch (error) {
    res.status(404).send(error.message);
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.id });
    await user.remove();
    res.status(200).json({ message: 'User deleted successfully' });
  }
  catch (error) {
    res.status(404).send(error.message);
  }
}

exports.rename = async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.query.user_id });
    user.user_name = req.query.user_name;
    await user.save();
    res.status(200);
  }
  catch (error) {
    res.status(404).send(error.message);
  }
}

exports.restrict = async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.query.user_id });
    user.role = req.query.restrict ? 'banned_user' : 'user';
    await user.save();
    res.status(200);
  }
  catch (error) {
    res.status(404).send(error.message);
  }
}
