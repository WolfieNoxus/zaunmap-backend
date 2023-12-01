const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');

router.get('/', CommentController.getComment);
router.delete('/', CommentController.deleteComment);
router.post('/', CommentController.createComment);
router.post('/reply', CommentController.replyComment);
router.post('/like', CommentController.likeComment);
router.post('/unlike', CommentController.unlikeComment);
router.post('/dislike', CommentController.dislikeComment);
router.post('/undislike', CommentController.undislikeComment);

module.exports = router;
