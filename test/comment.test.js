const request = require('supertest');
const app = require('../src/app');
const { connectDB, disconnectDB } = require('../src/config/db');

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await disconnectDB();
});

// Test Suite for Comment Endpoints
describe('Comment Endpoints', () => {

    // Test for GET /comment
    describe('GET /comment', () => {
        it('should retrieve a specific comment by id', async () => {
            const res = await request(app)
                .get('/api/comment')
                .query({ commentId: '656eafbf64919b2d48c802d0' });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body._id).toBe('656eafbf64919b2d48c802d0');
            // Additional assertions as necessary
        });
    });

    // // Test for POST /comment
    // describe('POST /comment', () => {
    //     it('should create a new comment', async () => {
    //         const res = await request(app)
    //             .post('/api/comment')
    //             .send({
    //                 userId: 'auth0|656669d317b4bdb501178567',
    //                 mapId: '65680d250505420b42427a82',
    //                 content: 'This is a test comment'
    //             });
    //         expect(res.statusCode).toEqual(200);
    //         expect(res.body).toHaveProperty('content', 'This is a test comment');
    //         // Additional assertions as necessary
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
});
