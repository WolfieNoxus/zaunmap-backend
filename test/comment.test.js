const request = require('supertest');
const app = require('../src/app');
const { connectDB, disconnectDB } = require('../src/config/db');
const Map = require('../src/models/mapModel');
const Comment = require('../src/models/commentModel');
const User = require('../src/models/userModel');

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await disconnectDB();
});

beforeEach(async () => {
    const map = new Map({
        name: 'Test Map',
        description: 'This is a test map',
        isPublic: true,
        tags: ['tag1', 'tag2'],
        comments: []
    });
    const comment = new Comment({
        content: 'This is a test comment',
        postedBy: 'testuser',
        replies: [],
        likes: [],
        dislikes: []
    });
    const user1 = new User({
        userId: 'testuser',
        name: 'Test User',
        role: 'user',
        maps: [],
        following: [],
        followers: [],
        blocked: [],
        messagesReceived: []
    });
    const user2 = new User({
        userId: 'testuser2',
        name: 'Test User 2',
        role: 'user',
        maps: [],
        following: [],
        followers: [],
        blocked: [],
        messagesReceived: []
    });
    await user1.save();
    await user2.save();
    await comment.save();
    map.comments.push(comment._id);
    await map.save();
});

afterEach(async () => {
    await User.deleteOne({ userId: 'testuser' });
    await User.deleteOne({ userId: 'testuser2' });
    await Map.deleteOne({ name: 'Test Map' });
    await Comment.deleteOne({ content: 'This is a test comment' });
    await Comment.deleteOne({ content: 'This is test comment 2' });
});

// Test for GET /comment
describe('GET /comment', () => {
    it('should retrieve a specific comment by id', async () => {
        const comment = await Comment.findOne({ content: 'This is a test comment' });
        const commentId = comment._id.toString();
        const res = await request(app)
            .get('/api/comment')
            .query({ commentId: commentId });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', commentId);
        expect(res.body).toHaveProperty('content', 'This is a test comment');
        expect(res.body).toHaveProperty('postedBy', 'testuser');
        expect(res.body).toHaveProperty('replies');
        expect(res.body).toHaveProperty('likes');
        expect(res.body).toHaveProperty('dislikes');
    });
});

// // Test for POST /comment
// describe('POST /comment', () => {
//     it('should create a new comment', async () => {
//         const user = await User.findOne({ userId: 'testuser' });
//         const map = await Map.findOne({ name: 'Test Map' });
//         const userId = user.userId;
//         const mapId = map._id.toString();
//         const res = await request(app)
//             .post('/api/comment')
//             .query({ userId: userId })
//             .send({
//                 mapId: mapId,
//                 content: 'This is a test comment 2'
//             });
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty('postedBy', userId);
//         expect(map.comments).toContain(res.body._id);
//         expect(res.body).toHaveProperty('content', 'This is a test comment 2');
//         expect(res.body).toHaveProperty('replies');
//         expect(res.body).toHaveProperty('likes');
//         expect(res.body).toHaveProperty('dislikes');
//     });
// });

// // Test for POST /comment/reply
// describe('POST /comment/reply', () => {
//     it('should post a reply to a comment', async () => {
//         const res = await request(app)
//             .post('/api/reply')
//             .send({
//                 userId: 'auth0|656669d317b4bdb501178567',
//                 commentId: '65680d250505420b42427a82',
//                 content: 'This is a test reply'
//             });
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty('content', 'This is a test reply');
//         // Additional assertions as necessary
//     });
// });

// // Test for PUT /comment/like
// describe('PUT /comment/like', () => {
//     it('should like or unlike a comment', async () => {
//         const res = await request(app)
//             .put('/api/like')
//             .send({
//                 userId: 'auth0|656669d317b4bdb501178567',
//                 commentId: '65680d250505420b42427a82',
//                 like: true
//             });
//         expect(res.statusCode).toEqual(200);
//         // Assertions to check if like array is updated
//     });
// });

// // Test for PUT /comment/dislike
// describe('PUT /comment/dislike', () => {
//     it('should dislike or undislike a comment', async () => {
//         const res = await request(app)
//             .put('/api/dislike')
//             .send({
//                 userId: 'auth0|656669d317b4bdb501178567',
//                 commentId: '65680d250505420b42427a82',
//                 dislike: true
//             });
//         expect(res.statusCode).toEqual(200);
//         // Assertions to check if dislike array is updated
//     });
// });

// // Test for DELETE /comment
// describe('DELETE /comment', () => {
//     it('should delete a specific comment by id', async () => {
//         const res = await request(app)
//             .delete('/api/comment')
//             .send({ commentId: '65680d250505420b42427a82' });
//         expect(res.statusCode).toEqual(200);
//         // Additional assertions as necessary
//     });
// });
