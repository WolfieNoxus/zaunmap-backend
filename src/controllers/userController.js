const User = require('../models/userModel');

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.id });
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

exports.changeName = async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.id });
    user.user_name = req.body.user_name;
    await user.save();
    res.status(200).json(user);
  }
  catch (error) {
    res.status(404).send(error.message);
  }
}

exports.banUser = async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.id });
    user.role = 'banned_user';
    await user.save();
    res.status(200).json(user);
  }
  catch (error) {
    res.status(404).send(error.message);
  }
}

exports.unbanUser = async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.id });
    user.role = 'user';
    await user.save();
    res.status(200).json(user);
  }
  catch (error) {
    res.status(404).send(error.message);
  }
}
