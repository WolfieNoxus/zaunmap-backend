const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/messageController');

router.get('/', MessageController.getMessage);
router.post('/', MessageController.createMessage);
router.put('/read', MessageController.readMessage);
router.delete('/', MessageController.deleteMessage);

module.exports = router;