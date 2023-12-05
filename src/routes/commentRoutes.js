const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');

router.get('/', CommentController.getComment);
router.post('/', CommentController.createComment);
router.post('/reply', CommentController.replyComment);
router.put('/like', CommentController.likeComment);
router.put('/dislike', CommentController.dislikeComment);
router.delete('/', CommentController.deleteComment);

module.exports = router;
