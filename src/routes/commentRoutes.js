const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');

router.get('/:id', CommentController.getComment);
router.post('/', CommentController.createComment);
router.put('/:id', CommentController.updateComment);
router.delete('/:id', CommentController.deleteComment);

module.exports = router;
