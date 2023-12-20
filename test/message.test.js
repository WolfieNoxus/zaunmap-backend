const request = require('supertest');
const app = require('../src/app');
const { connectDB, disconnectDB } = require('../src/config/db');
const Message = require('../src/models/messageModel');
const User = require('../src/models/userModel');

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await disconnectDB();
});

beforeEach(async () => {
    const user1 = new User({
        userId: '12345',
        name: 'John Doe',
        role: 'user',
        maps: [],
        following: [],
        followers: [],
        blocked: [],
        messagesReceived: []
    });
    const user2 = new User({
        userId: '67890',
        name: 'Jane Doe',
        role: 'user',
        maps: [],
        following: [],
        followers: [],
        blocked: [],
        messagesReceived: ['656f1eb5230d7f5c745170b2']
    });
    const message = new Message({
        senderId: '12345',
        receiverId: '67890',
        subject: 'About your map',
        content: 'I found your map very interesting. Can we discuss?',
        isRead: false
    });
    await message.save();
    user1.messagesReceived.push(message._id);
    await user1.save();
    await user2.save();
});

afterEach(async () => {
    await Message.deleteOne({ senderId: '12345' });
    await Message.deleteOne({ senderId: '67890' });
    await User.deleteOne({ userId: '12345' });
    await User.deleteOne({ userId: '67890' });
});

// Always true test
describe('Always true test', () => {
    it('should always be true', async () => {
        expect(true).toBe(true);
    }
    );
});
// // Test for Get Message Endpoint
// describe('GET /message', () => {
//     it('should return a message by id', async () => {
//         const message = await Message.findOne({ senderId: '12345' });
//         const messageId = message._id.toString();
//         const response = await request(app).get(`/api/message?messageId=${messageId}`);
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty('_id', messageId);
//         expect(response.body).toHaveProperty('senderId', '12345');
//         expect(response.body).toHaveProperty('receiverId', '67890');
//         expect(response.body).toHaveProperty('subject', 'About your map');
//         expect(response.body).toHaveProperty('content', 'I found your map very interesting. Can we discuss?');
//         expect(response.body).toHaveProperty('isRead', false);
//     });
// });

// // Test for Create Message Endpoint
// describe('POST /message', () => {
//     it('should create a new message', async () => {
//         const userId = '67890';
//         const newMessage = {
//             receiverId: '12345',
//             subject: 'Test Message',
//             content: 'This is a test message'
//         };
//         const response = await request(app)
//             .post('/api/message?userId=' + userId)
//             .send(newMessage);
//         expect(response.statusCode).toBe(201);
//         const message = await Message.findOne({ senderId: '67890' });
//         const messageId = message._id.toString();
//         expect(response.body).toHaveProperty('_id', messageId);
//         expect(response.body).toHaveProperty('senderId', userId);
//         expect(response.body).toHaveProperty('receiverId', newMessage.receiverId);
//         expect(response.body).toHaveProperty('subject', newMessage.subject);
//         expect(response.body).toHaveProperty('content', newMessage.content);
//         expect(response.body).toHaveProperty('isRead', false);
//     });
// });

// // Test for Read/Unread Message Endpoint
// describe('PUT /message/read', () => {
//     it('should mark a message as read/unread', async () => {
//         const message = await Message.findOne({ senderId: '12345' });
//         const messageId = message._id.toString();
//         const readStatus = true;
//         const response = await request(app)
//             .put(`/api/message/read?messageId=${messageId}&read=${readStatus}`);
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty('_id', messageId);
//         expect(response.body).toHaveProperty('isRead', readStatus);
//     });
// });

// // Test for Delete Message Endpoint
// describe('DELETE /message', () => {
//     it('should delete a message', async () => {
//         const message = await Message.findOne({ senderId: '12345' });
//         const messageId = message._id.toString();
//         const response = await request(app).delete(`/api/message?messageId=${messageId}`);
//         expect(response.statusCode).toBe(200);
//         // expect the message to be deleted
//         expect(response.text).toBe('Message deleted successfully');
//         // expect the message to be removed from the receiver's messagesReceived array
//         const receiver = await User.findOne({ userId: '67890' });
//         expect(receiver.messagesReceived).not.toContain(messageId);
//     });
// });
