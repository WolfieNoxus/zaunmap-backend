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
            mapId: mapId,
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
        res.status(200).json(reply);
    } catch (error) {
        res.status(500).json({ message: 'Error replying to comment', error: error.message });
    }
}

exports.likeComment = async (req, res) => {
    try {
        const commentId = req.query.commentId;
        if (!commentId) {
            return res.status(400).json({ message: 'Comment ID not provided' });
        }

        const userId = req.query.userId;
        if (!userId) {
            return res.status(400).json({ message: 'User ID not provided' });
        }

        const likeStr = req.query.like.toLowerCase();
        if (likeStr !== 'true' && likeStr !== 'false') {
            return res.status(400).json({ message: 'Invalid like parameter' });
        }
        const like = likeStr === 'true';

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        if (like) {
            if (comment.likes.includes(userId)) {
                res.status(200).json({ message: 'Comment already liked' });
            } else if (comment.dislikes.includes(userId)) {
                res.status(200).json({ message: 'Comment already disliked' });
            } else {
                comment.likes.push(userId);
                await comment.save();
                res.status(200).json({ message: 'Comment liked successfully' });
            }
        } else {
            if (!comment.likes.includes(userId)) {
                res.status(200).json({ message: 'Comment not liked' });
            } else {
                comment.likes.pull(userId);
                await comment.save();
                res.status(200).json({ message: 'Comment unliked successfully' });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error liking comment', error: error.message });
    }
}

exports.dislikeComment = async (req, res) => {
    try {
        const commentId = req.query.commentId;
        if (!commentId) {
            return res.status(400).json({ message: 'Comment ID not provided' });
        }
        const userId = req.query.userId;
        if (!userId) {
            return res.status(400).json({ message: 'User ID not provided' });
        }
        const dislikeStr = req.query.dislike.toLowerCase();
        if (dislikeStr !== 'true' && dislikeStr !== 'false') {
            return res.status(400).json({ message: 'Invalid dislike parameter' });
        }
        const dislike = dislikeStr === 'true';

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (dislike) {
            if (comment.dislikes.includes(userId)) {
                res.status(200).json({ message: 'Comment already disliked' });
            } else if (comment.likes.includes(userId)) {
                res.status(200).json({ message: 'Comment already liked' });
            } else {
                comment.dislikes.push(userId);
                await comment.save();
                res.status(200).json({ message: 'Comment disliked successfully' });
            }
        } else {
            if (!comment.dislikes.includes(userId)) {
                res.status(200).json({ message: 'Comment not disliked' });
            } else {
                comment.dislikes.pull(userId);
                await comment.save();
                res.status(200).json({ message: 'Comment undisliked successfully' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Error disliking comment', error: error.message });
    }
}


exports.deleteComment = async (req, res) => {
    try {
        const commentId = req.query.commentId;
        if (!commentId) {
            return res.status(400).json({ message: 'Comment ID not provided' });
        }
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        const mapId = await Map.findById(comment.mapId);
        if (!mapId) {
            return res.status(404).json({ message: 'This comment does not belong to any map' });
        }
        const map = await Map.findById(mapId);
        if (!map) {
            return res.status(404).json({ message: 'Map not found' });
        }
        if (map.comments.includes(commentId)) {
            map.comments.pull(commentId);
            await map.save();
        } else {
            return res.status(404).json({ message: 'Comment not found in map' });
        }
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
