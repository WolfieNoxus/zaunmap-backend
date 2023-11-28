const Comment = require('../models/commentModel');

exports.getComment = async (req, res) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.id });
        res.status(200).json(comment);
    }
    catch (error) {
        res.status(404).send(error.message);
    }
}

exports.createComment = async (req, res) => {
    try {
        const newComment = new Comment(req.body);
        await newComment.save();
        res.status(201).json(newComment);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

exports.updateComment = async (req, res) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.id });
        Object.assign(comment, req.body);
        await comment.save();
        res.status(200).json(comment);
    }
    catch (error) {
        res.status(404).send(error.message);
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.id });
        await comment.remove();
        res.status(200).json({ message: 'Comment deleted successfully' });
    }
    catch (error) {
        res.status(404).send(error.message);
    }
}
