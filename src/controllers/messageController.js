const Message = require('../models/messageModel');
const User = require('../models/userModel');

exports.getMessage = async (req, res) => {
    try {
        const messageId = req.query.messageId;
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).send('Message not found');
        }
        res.status(200).json(message);
    } catch (error) {
        res.status(500).send('Internal Server Error: ' + error.message);
    }
}

exports.createMessage = async (req, res) => {
    try {
        const userId = req.query.userId;
        if (!userId) {
            return res.status(400).send('Missing userId in query parameters');
        }
        const receiverId = req.body.receiverId;
        if (!receiverId) {
            return res.status(400).send('Missing receiverId in request body');
        }
        const receiver = await User.findOne({ userId: receiverId });
        if (!receiver) {
            return res.status(404).send('Receiver not found');
        }
        if (receiver.blocked.includes(userId)) {
            return res.status(403).send('Receiver has blocked you');
        }
        const newMessage = new Message(req.body);
        newMessage.senderId = userId;
        await newMessage.save();
        receiver.messagesReceived.push(newMessage._id);
        await receiver.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).send('Internal Server Error: ' + error.message);
    }
}

exports.readMessage = async (req, res) => {
    try {
        const messageId = req.query.messageId;
        const message = await Message.findById(messageId);
        const readStr = req.query.read.toLowerCase();
        if (!message) {
            return res.status(404).send('Message not found');
        }
        if (!readStr || (readStr !== 'true' && readStr !== 'false')) {
            return res.status(400).send('Invalid query parameters: read must be true or false');
        }
        message.isRead = readStr === 'true';
        await message.save();
        res.status(200).json(message);
    } catch (error) {
        res.status(500).send('Internal Server Error: ' + error.message);
    }
}

exports.deleteMessage = async (req, res) => {
    try {
        const messageId = req.query.messageId;
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).send('Message not found');
        }
        await message.remove();
        res.status(200).send('Message deleted successfully');
    } catch (error) {
        res.status(500).send('Internal Server Error: ' + error.message);
    }
}
