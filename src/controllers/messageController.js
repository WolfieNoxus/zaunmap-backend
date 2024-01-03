// Import required models
const Message = require('../models/messageModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Function to retrieve a specific message
exports.getMessage = async (req, res) => {
    try {
        // Validate JWT token from authorization header
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) return res.status(401).json({ message: 'Unauthorized' });
        const token = bearerHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });
        const decoded = jwt.decode(token);
        if (!decoded) return res.status(401).json({ message: 'Unauthorized' });

        // Retrieve userId from JWT and messageId from query parameters
        const userId = decoded.sub;
        const messageId = req.query.messageId;
        if (!messageId) return res.status(400).send('Missing messageId in query parameters');

        // Fetch message and validate ownership
        const message = await Message.findById(messageId);
        if (!message) return res.status(404).send('Message not found');
        if (message.receiverId !== userId) return res.status(403).send('Forbidden');

        res.status(200).json(message);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Function to create a new message
exports.createMessage = async (req, res) => {
    try {
        // Validate JWT token from authorization header
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) return res.status(401).json({ message: 'Unauthorized' });
        const token = bearerHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });
        const decoded = jwt.decode(token);
        if (!decoded) return res.status(401).json({ message: 'Unauthorized' });

        // Retrieve userId from JWT and receiverId from request body
        const userId = decoded.sub;
        const receiverId = req.body.receiverId;
        if (!receiverId) return res.status(400).send('Missing receiverId in request body');

        // Validate receiver existence and block status
        const receiver = await User.findOne({ userId: receiverId });
        if (!receiver) return res.status(404).send('Receiver not found');
        if (receiver.blocked.includes(userId)) return res.status(403).send('Receiver has blocked you');

        // Create and save the new message
        const newMessage = new Message(req.body);
        newMessage.senderId = userId;
        await newMessage.save();

        // Update receiver's messages received
        receiver.messagesReceived.push(newMessage._id);
        await receiver.save();

        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Function to mark a message as read
exports.readMessage = async (req, res) => {
    try {
        // Validate JWT token from authorization header
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) return res.status(401).json({ message: 'Unauthorized' });
        const token = bearerHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });
        const decoded = jwt.decode(token);
        if (!decoded) return res.status(401).json({ message: 'Unauthorized' });

        // Retrieve userId from JWT and messageId from query parameters
        const userId = decoded.sub;
        const messageId = req.query.messageId;
        if (!messageId) return res.status(400).send('Missing messageId');

        // Fetch message and validate ownership
        const message = await Message.findById(messageId);
        if (!message) return res.status(404).send('Message not found');
        if (message.receiverId !== userId) return res.status(403).send('Forbidden');

        // Update and save the read status of the message
        const readStr = req.query.read?.toLowerCase();
        if (!['true', 'false'].includes(readStr)) return res.status(400).send('Invalid query parameter: read must be true or false');
        message.isRead = readStr === 'true';
        await message.save();

        res.status(200).json(message);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Function to delete a message
exports.deleteMessage = async (req, res) => {
    try {
        // Validate JWT token from authorization header
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) return res.status(401).json({ message: 'Unauthorized' });
        const token = bearerHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });
        const decoded = jwt.decode(token);
        if (!decoded) return res.status(401).json({ message: 'Unauthorized' });

        // Retrieve userId from JWT and messageId from query parameters
        const userId = decoded.sub;
        const messageId = req.query.messageId;
        if (!messageId) return res.status(400).send('Missing messageId');

        // Fetch message and validate ownership
        const message = await Message.findById(messageId);
        if (!message) return res.status(404).send('Message not found');
        if (message.receiverId !== userId) return res.status(403).send('Forbidden');

        // Remove the message
        await message.remove();
        res.status(200).send('Message deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
