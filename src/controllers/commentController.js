const Comment = require('../models/commentModel');
const Map = require('../models/mapModel');

exports.getComment = async (req, res) => {
    try {
        const commentId = req.query.commentId;
        const comment = await Comment.findById(commentId);
        res.status(200).json(comment);
    }
    catch (error) {
        res.status(404).send(error.message);
    }
}

exports.createComment = async (req, res) => {
    try {
        const userId = req.query.userId;
        const mapId = req.body.mapId;
        if (!userId) {
            return res.status(400).json({ message: 'User ID not provided' });
        }
        if (!mapId) {
            return res.status(400).json({ message: 'Map ID not provided' });
        }
        const comment = new Comment({
            content: req.body.content,
            postedBy: userId
        });
        await comment.save();
        const map = await Map.findById(mapId);
        map.comments.push(comment._id);
        await map.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error: error.message });
    }
}

exports.replyComment = async (req, res) => {
    try {
        const userId = req.query.userId;
        const commentId = req.body.commentId;
        const comment = await Comment.findById(commentId);
        const reply = new Comment({
            content: req.body.content,
            postedBy: userId
        });
        await reply.save();
        comment.replies.push(reply._id);
        await comment.save();
        res.status(200).json({ message: 'Comment replied successfully' });
    } catch (error) {
        res.status(404).send(error.message);
    }
}

exports.likeComment = async (req, res) => {
    try {
        const commentId = req.query.commentId;
        const userId = req.query.userId;
        const comment = await Comment.findById(commentId);
        if (comment.likes.includes(userId)) {
            res.status(200).json({ message: 'Comment already liked' });
        }
        else {
            comment.likes.push(userId);
            await comment.save();
            res.status(200).json({ message: 'Comment liked successfully' });
        }
    }
    catch (error) {
        res.status(404).send(error.message);
    }
}

exports.unlikeComment = async (req, res) => {
    try {
        const commentId = req.query.commentId;
        const userId = req.query.userId;
        const comment = await Comment.findById(commentId);
        if (!comment.likes.includes(userId)) {
            res.status(200).json({ message: 'Comment not liked' });
        }
        else {
            comment.likes.pull(userId);
            await comment.save();
            res.status(200).json({ message: 'Comment unliked successfully' });
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}

exports.dislikeComment = async (req, res) => {
    try {
        const commentId = req.query.commentId;
        const userId = req.query.userId;
        const comment = await Comment.findById(commentId);
        if (comment.dislikes.includes(userId)) {
            res.status(200).json({ message: 'Comment already disliked' });
        }
        else {
            comment.dislikes.push(userId);
            await comment.save();
            res.status(200).json({ message: 'Comment disliked successfully' });
        }
    }
    catch (error) {
        res.status(404).send(error.message);
    }
}

exports.undislikeComment = async (req, res) => {
    try {
        const commentId = req.query.commentId;
        const userId = req.query.userId;
        const comment = await Comment.findById(commentId);
        if (!comment.dislikes.includes(userId)) {
            res.status(200).json({ message: 'Comment not disliked' });
        }
        else {
            comment.dislikes.pull(userId);
            await comment.save();
            res.status(200).json({ message: 'Comment undisliked successfully' });
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}

exports.deleteComment = async (req, res) => {
    try {
        await deleteCommentHelper(req.query.commentId);
        res.status(200).json({ message: 'Comment deleted successfully' });
    }
    catch (error) {
        res.status(404).send(error.message);
    }
}

async function deleteCommentHelper(commentId) {
    try {
        // reomve the comment and all its replies and their replies and so on
        const comment = await Comment.findById(commentId);

        // Recursively delete all replies
        for (let replyId of comment.replies) {
            await deleteCommentHelper(replyId);
        }

        // Delete the comment itself
        await Comment.findByIdAndDelete(commentId);
    }
    catch (error) {
        console.log(error.message);
    }
}
