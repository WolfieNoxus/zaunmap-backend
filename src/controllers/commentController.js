const Comment = require('../models/commentModel');
const Map = require('../models/mapModel');

exports.getComment = async (req, res) => {
    try {
        const comment_id = req.query.comment_id;
        const comment = await Comment.findById(comment_id);
        res.status(200).json(comment);
    }
    catch (error) {
        res.status(404).send(error.message);
    }
}

exports.createComment = async (req, res) => {
    try {
        const user_id = req.query.user_id;
        const map_id = req.query.map_id;
        const comment = new Comment({
            content: req.body.content,
            postedBy: user_id
        });
        await comment.save();
        const map = await Map.findById(map_id);
        map.comments.push(comment._id);
        await map.save();
        res.status(200).json({ message: 'Comment created successfully' });
    } catch (error) {
        res.status(404).send(error.message);
    }
}

exports.replyComment = async (req, res) => {
    try {
        const user_id = req.query.user_id;
        const comment_id = req.query.comment_id;
        const comment = await Comment.findById(comment_id);
        const reply = new Comment({
            content: req.body.content,
            postedBy: user_id
        });
        await reply.save();
        comment.replies.push(reply._id);
        await comment.save();
        res.status(200).json({ message: 'Comment replied successfully' });
    } catch (error) {
        res.status(404).send(error.message);
    }
}

exports.deleteComment = async (req, res) => {
    try {
        await deleteCommentHelper(req.query.comment_id);
        res.status(200).json({ message: 'Comment deleted successfully' });
    }
    catch (error) {
        res.status(404).send(error.message);
    }
}

async function deleteCommentHelper(comment_id) {
    try {
        // reomve the comment and all its replies and their replies and so on
        const comment = await Comment.findById(comment_id);

        // Recursively delete all replies
        for (let reply_id of comment.replies) {
            await deleteCommentHelper(reply_id);
        }

        // Delete the comment itself
        await Comment.findByIdAndDelete(comment_id);
    }
    catch (error) {
        console.log(error.message);
    }
}

exports.likeComment = async (req, res) => {
    try {
        const comment_id = req.query.comment_id;
        const user_id = req.query.user_id;
        const comment = await Comment.findById(comment_id);
        if (comment.likes.includes(user_id)) {
            res.status(200).json({ message: 'Comment already liked' });
        }
        else {
            comment.likes.push(user_id);
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
        const comment_id = req.query.comment_id;
        const user_id = req.query.user_id;
        const comment = await Comment.findById(comment_id);
        if (!comment.likes.includes(user_id)) {
            res.status(200).json({ message: 'Comment not liked' });
        }
        else {
            comment.likes.pull(user_id);
            await comment.save();
            res.status(200).json({ message: 'Comment unliked successfully' });
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}

exports.dislikeComment = async (req, res) => {
    try {
        const comment_id = req.query.comment_id;
        const user_id = req.query.user_id;
        const comment = await Comment.findById(comment_id);
        if (comment.dislikes.includes(user_id)) {
            res.status(200).json({ message: 'Comment already disliked' });
        }
        else {
            comment.dislikes.push(user_id);
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
        const comment_id = req.query.comment_id;
        const user_id = req.query.user_id;
        const comment = await Comment.findById(comment_id);
        if (!comment.dislikes.includes(user_id)) {
            res.status(200).json({ message: 'Comment not disliked' });
        }
        else {
            comment.dislikes.pull(user_id);
            await comment.save();
            res.status(200).json({ message: 'Comment undisliked successfully' });
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}