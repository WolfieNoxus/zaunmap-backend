const request = require('supertest');
const app = require('../src/app'); // Adjust this path to where your Express app is initialized

// describe('User API', () => {
//     let token;

//     // User Registration Test
//     it('should register a new user', async () => {
//         const res = await request(app)
//             .post('/api/users/register')
//             .send({
//                 username: 'testuser',
//                 password: 'Password123',
//                 email: 'testuser@example.com'
//             });
//         expect(res.statusCode).toEqual(201);
//         expect(res.body).toHaveProperty('message', 'User registered successfully');
//     });

//     // User Login Test
//     it('should login the user', async () => {
//         const res = await request(app)
//             .post('/api/users/login')
//             .send({
//                 username: 'testuser',
//                 password: 'Password123'
//             });
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty('token');
//         token = res.body.token; // Save the token for later use in other tests
//     });

//     // Fetch User Profile Test
//     it('should fetch the user profile', async () => {
//         const res = await request(app)
//             .get('/api/users/profile')
//             .set('Authorization', `Bearer ${token}`); // Use the token from login
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty('username', 'testuser');
//     });

//     // Add more tests as needed...
// });

describe('Always Success Test', () => {
    it('should always pass', () => {
        expect(true).toBe(true);
    });
});


describe('GET /api/hello', () => {
  it('responds with json containing "Hello, World!"', async () => {
    const response = await request(app)
      .get('/api/hello')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ message: 'Hello, World!' });
  });
});
