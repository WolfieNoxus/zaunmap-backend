const Message = require('../models/messageModel');
const User = require('../models/userModel');
const mongoose = require('mongoose'); // Assuming mongoose is used for MongoDB

function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

exports.getMessage = async (req, res) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const bearer = bearerHeader.split(' ');
        if (bearer.length !== 2) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = bearer[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.decode(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const userId = decoded.sub;
        const messageId = req.query.messageId;
        if (!messageId) {
            return res.status(400).send('Missing messageId in query parameters');
        }
        if (!isValidObjectId(messageId)) {
            return res.status(400).send('Invalid messageId format');
        }
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).send('Message not found');
        }
        res.status(200).json(message);
    } catch (error) {
        console.error(error); // Logging the error
        res.status(500).send('Internal Server Error');
    }
};

exports.createMessage = async (req, res) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const bearer = bearerHeader.split(' ');
        if (bearer.length !== 2) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = bearer[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.decode(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const userId = decoded.sub;
        if (!userId) {
            return res.status(400).send('Missing userId in query parameters');
        }
        if (!isValidObjectId(userId)) {
            return res.status(400).send('Invalid userId format');
        }
        const receiverId = req.body.receiverId;
        if (!receiverId) {
            return res.status(400).send('Missing receiverId in request body');
        }
        if (!isValidObjectId(receiverId)) {
            return res.status(400).send('Invalid receiverId format');
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
        console.error(error); // Logging the error
        res.status(500).send('Internal Server Error');
    }
};

exports.readMessage = async (req, res) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const bearer = bearerHeader.split(' ');
        if (bearer.length !== 2) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = bearer[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.decode(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const userId = decoded.sub;
        const messageId = req.query.messageId;
        if (!messageId) {
            return res.status(400).send('Missing messageId');
        }
        if (!isValidObjectId(messageId)) {
            return res.status(400).send('Invalid messageId format');
        }
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).send('Message not found');
        }
        const readStr = req.query.read?.toLowerCase();
        if (!['true', 'false'].includes(readStr)) {
            return res.status(400).send('Invalid query parameter: read must be true or false');
        }
        message.isRead = readStr === 'true';
        await message.save();
        res.status(200).json(message);
    } catch (error) {
        console.error(error); // Logging the error
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const bearer = bearerHeader.split(' ');
        if (bearer.length !== 2) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = bearer[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.decode(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const userId = decoded.sub;
        const messageId = req.query.messageId;
        if (!messageId) {
            return res.status(400).send('Missing messageId');
        }
        if (!isValidObjectId(messageId)) {
            return res.status(400).send('Invalid messageId format');
        }
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).send('Message not found');
        }
        await message.remove();
        res.status(200).send('Message deleted successfully');
    } catch (error) {
        console.error(error); // Logging the error
        res.status(500).send('Internal Server Error');
    }
};
