// const request = require('supertest');
// const app = require('../src/app'); // Replace with the path to your Express app
// const { connectDB, disconnectDB } = require('../src/config/db');

// beforeAll(async () => {
//   await connectDB();
// });

// afterAll(async () => {
//   await disconnectDB();
// }
// );

// Sample test to ensure Jest is working
describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true);
  });
});

// describe('GET /user/', () => {
//   it('should return a user', async () => {
//     const response = await request.get('/user?userId=auth0|656669d317b4bdb501178567');
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty('userId');
//   });
// });

// describe('GET /user/list', () => {
//   it('should return a list of users', async () => {
//     const response = await request.get('/user/list');
//     expect(response.statusCode).toBe(200);
//     expect(Array.isArray(response.body)).toBeTruthy();
//   });
// });

// describe('POST /user/', () => {
//   it('should create a new user', async () => {
//     const newUser = {
//       userId: '123',
//       user_name: 'Test User'
//     };
//     const response = await request.post('/user/').send(newUser);
//     expect(response.statusCode).toBe(201);
//     expect(response.body).toEqual(expect.objectContaining(newUser));
//   });
// });

// describe('PUT /user/rename', () => {
//   it('should rename a user', async () => {
//     const response = await request(app).put('/user/rename').query({ userId: 'auth0|656669d317b4bdb501178567', new_name: 'NewName' });
//     expect(response.statusCode).toBe(200);
//   });
// });

// describe('PUT /user/restrict', () => {
//   it('should restrict a user', async () => {
//     const response = await request(app).put('/user/restrict').query({ userId: '123', restrict: true });
//     expect(response.statusCode).toBe(200);
//   });
// });

// describe('PUT /user/disable', () => {
//   it('should disable a user', async () => {
//     const response = await request(app).put('/user/disable').query({ userId: '123', disable: 'true' });
//     expect(response.statusCode).toBe(200);
//   });
// });

// describe('GET /user/maps', () => {
//   it('should get user maps', async () => {
//     const response = await request(app).get('/user/maps?userId=123');
//     expect(response.statusCode).toBe(200);
//     expect(Array.isArray(response.body)).toBeTruthy();
//   });
// });
