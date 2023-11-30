const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');

router.get('/', CommentController.getComment);
router.delete('/', CommentController.deleteComment);
router.post('/', CommentController.createComment);
router.post('/reply', CommentController.replyComment);

module.exports = router;
