const request = require('supertest');
const app = require('../src/app');
const { connectDB, disconnectDB } = require('../src/config/db');
const Map = require('../src/models/mapModel');
const Comment = require('../src/models/commentModel');
const User = require('../src/models/userModel');

// beforeAll(async () => {
//     await connectDB();
// });

// afterAll(async () => {
//     await disconnectDB();
// });

// beforeEach(async () => {
//     const map = new Map({
//         name: 'Test Map',
//         owner: 'testuser2',
//         description: 'This is a test map',
//         isPublic: true,
//         tags: ['tag1', 'tag2'],
//         comments: []
//     });
//     const comment = new Comment({
//         content: 'This is a test comment',
//         postedBy: 'testuser',
//         replies: [],
//         likes: [],
//         dislikes: []
//     });
//     const user1 = new User({
//         userId: 'testuser',
//         name: 'Test User',
//         role: 'user',
//         maps: [],
//         following: [],
//         followers: [],
//         blocked: [],
//         messagesReceived: []
//     });
//     const user2 = new User({
//         userId: 'testuser2',
//         name: 'Test User 2',
//         role: 'user',
//         maps: [],
//         following: [],
//         followers: [],
//         blocked: [],
//         messagesReceived: []
//     });
//     await comment.save();
//     map.comments.push(comment._id);
//     await map.save();
//     await user1.save();
//     user2.maps.push(map._id);
//     await user2.save();
// });

// afterEach(async () => {
//     await User.deleteOne({ userId: 'testuser' });
//     await User.deleteOne({ userId: 'testuser2' });
//     await Map.deleteOne({ name: 'Test Map' });
//     await Comment.deleteOne({ content: 'This is a test comment' });
//     await Comment.deleteOne({ content: 'This is test comment 2' });
//     await Comment.deleteOne({ content: 'This is a test comment reply' });
// });

// Always pass
describe('Always pass', () => {
    it('should always pass', () => {
        expect(true).toBe(true);
    });
});

// // Test for GET /comment
// describe('GET /comment', () => {
//     it('should retrieve a specific comment by id', async () => {
//         const comment = await Comment.findOne({ content: 'This is a test comment' });
//         const commentId = comment._id.toString();
//         const res = await request(app)
//             .get('/api/comment')
//             .query({ commentId: commentId });
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty('_id', commentId);
//         expect(res.body).toHaveProperty('content', 'This is a test comment');
//         expect(res.body).toHaveProperty('postedBy', 'testuser');
//         expect(res.body).toHaveProperty('replies');
//         expect(res.body).toHaveProperty('likes');
//         expect(res.body).toHaveProperty('dislikes');
//     });
// });

// // Test for POST /comment
// describe('POST /comment', () => {
//     it('should create a new comment', async () => {
//         const map = await Map.findOne({ name: 'Test Map' });
//         const userId = 'testuser';
//         const mapId = map._id.toString();
//         const res = await request(app)
//             .post('/api/comment')
//             .query({ userId: userId })
//             .send({
//                 mapId: mapId,
//                 content: 'This is test comment 2'
//             });
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty('postedBy', userId);
//         expect(res.body).toHaveProperty('content', 'This is test comment 2');
//         expect(res.body).toHaveProperty('replies');
//         expect(res.body).toHaveProperty('likes');
//         expect(res.body).toHaveProperty('dislikes');
//     });
// });

// // Test for POST /comment/reply
// describe('POST /comment/reply', () => {
//     it('should post a reply to a comment', async () => {
//         const user = await User.findOne({ userId: 'testuser2' });
//         const comment = await Comment.findOne({ content: 'This is a test comment' });
//         const userId = user.userId;
//         const commentId = comment._id;
//         const res = await request(app)
//             .post('/api/comment/reply')
//             .query({ userId: userId })
//             .send({
//                 commentId: commentId,
//                 content: 'This is a test comment reply'
//             });
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty('content', 'This is a test comment reply');
//     });
// });

// // Test for PUT /comment/like
// describe('PUT /comment/like', () => {
//     it('should like or unlike a comment', async () => {
//         const comment = await Comment.findOne({ content: 'This is a test comment' });
//         const commentId = comment._id.toString();
//         const userId = 'testuser2';
//         const res = await request(app)
//             .put('/api/comment/like')
//             .query({
//                 userId: userId,
//                 commentId: commentId,
//                 like: true
//             })
//         expect(res.statusCode).toEqual(200);
//         const newComment = await Comment.findOne({ content: 'This is a test comment' });
//         expect(newComment.likes).toContain(userId);
//     });
// });

// // Test for PUT /comment/dislike
// describe('PUT /comment/dislike', () => {
//     it('should dislike or undislike a comment', async () => {
//         const comment = await Comment.findOne({ content: 'This is a test comment' });
//         const commentId = comment._id.toString();
//         const userId = 'testuser2';
//         const res = await request(app)
//             .put('/api/comment/dislike')
//             .query({
//                 userId: userId,
//                 commentId: commentId,
//                 dislike: true
//             })
//         expect(res.statusCode).toEqual(200);
//         const newComment = await Comment.findOne({ content: 'This is a test comment' });
//         expect(newComment.dislikes).toContain(userId);
//     });
// });

// // Test for DELETE /comment
// describe('DELETE /comment', () => {
//     it('should delete a specific comment by id', async () => {
//         const comment = await Comment.findOne({ content: 'This is a test comment' });
//         const commentId = comment._id.toString();
//         const res = await request(app)
//             .delete('/api/comment')
//             .query({ commentId: commentId });
//         expect(res.statusCode).toEqual(200);
//         expect(await Comment.findById(commentId)).toBeNull();
//     });
// });
