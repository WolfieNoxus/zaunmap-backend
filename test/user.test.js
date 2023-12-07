const request = require('supertest');
const app = require('../src/app');
const { connectDB, disconnectDB } = require('../src/config/db');
const User = require('../src/models/userModel');

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await disconnectDB();
});

beforeEach(async () => {
    await User.create({
        userId: "user12345",
        name: "John Doe",
        role: "user",
        maps: ["5f50c31e467a5d1234567890"],
        following: ["user23456"],
        followers: ["user34567"],
        blocked: ["user45678"],
        messagesReceived: ["5f50c31e467a5d9876543210"]
    });
    await User.create({
        userId: "admin67890",
        name: "Alice Smith",
        role: "admin",
        maps: ["5f50c31e467a5d1234567890", "5f50c31e467a5d1234567891"],
        following: ["user12345", "user67890"],
        followers: ["user23456", "user34567"],
        blocked: ["user45678", "user56789"],
        messagesReceived: ["5f50c31e467a5d9876543210", "5f50c31e467a5d9876543211"]
    });
    await User.create({
        userId: "user67890",
        name: "Bob Brown",
        role: "user",
        maps: ["5f50c31e467a5d1234567892", "5f50c31e467a5d1234567893"],
        following: ["admin67890", "user12345", "user45678"],
        followers: ["user23456", "user34567", "user56789"],
        blocked: ["user67891"],
        messagesReceived: ["5f50c31e467a5d9876543212", "5f50c31e467a5d9876543213"]
    });
    await User.create({
        userId: "disabled123",
        name: "Eve White",
        role: "disabled",
        maps: ["5f50c31e467a5d1234567894"],
        following: ["user12345"],
        followers: ["user67890"],
        blocked: ["user67890", "user12345"],
        messagesReceived: ["5f50c31e467a5d9876543214"]
    });
});

afterEach(async () => {
    await User.deleteOne({ userId: 'user12345' });
    await User.deleteOne({ userId: 'admin67890' });
    await User.deleteOne({ userId: 'user67890' });
    await User.deleteOne({ userId: 'disabled123' });
    await User.deleteOne({ userId: 'testuser' });
});

// Test: Get User
describe('GET /user', () => {
    it('should return user details', async () => {
        const userId = 'user12345';
        const response = await request(app).get(`/api/user?userId=${userId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('userId', 'user12345');
        expect(response.body).toHaveProperty('name', 'John Doe');
        expect(response.body).toHaveProperty('role', 'user');
        expect(response.body).toHaveProperty('maps', ["5f50c31e467a5d1234567890"]);
        expect(response.body).toHaveProperty('following', ["user23456"]);
        expect(response.body).toHaveProperty('followers', ["user34567"]);
        expect(response.body).toHaveProperty('blocked', ["user45678"]);
        expect(response.body).toHaveProperty('messagesReceived', ["5f50c31e467a5d9876543210"]);
    });
});

// Test: Search Users
describe('GET /user/search', () => {
    it('should return a list of users', async () => {
        const response = await request(app).get('/api/user/search');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});

// Test: Create User
describe('POST /user', () => {
    it('should create a new user', async () => {
        // create a contentful user to check if it is created
        const response = await request(app).post('/api/user').send({
            userId: 'testuser'
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('userId', 'testuser');
        User.deleteOne({ userId: 'testuser' });
    });
});

// Test: Rename User
describe('PUT /user/rename', () => {
    it('should rename an existing user', async () => {
        const userId = 'user12345';
        const newName = 'Jane Doe';
        const response = await request(app).put(`/api/user/rename?userId=${userId}&newName=${newName}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', newName);
    });
});

// Test: Follow/Unfollow User
describe('PUT /user/follow', () => {
    it('should follow/unfollow a user', async () => {
        const userId = 'user12345';
        const followId = 'user67890';
        const follow = true;
        const response = await request(app).put(`/api/user/follow?userId=${userId}&followId=${followId}&follow=${follow}`);
        expect(response.status).toBe(200);
    });
});

// Test: Block/Unblock User
describe('PUT /user/block', () => {
    it('should block/unblock a user', async () => {
        const userId = 'user12345';
        const blockId = 'user67890';
        const block = true;
        const response = await request(app).put(`/api/user/block?userId=${userId}&blockId=${blockId}&block=${block}`);
        expect(response.status).toBe(200);
    });
});

// Test: Change User Role
describe('PUT /user/role', () => {
    it('should change the role of a user', async () => {
        const userId = 'user12345';
        const newRole = 'admin';
        const response = await request(app).put(`/api/user/role?userId=${userId}&newRole=${newRole}`);
        expect(response.status).toBe(200);
    });
});

// Test: Delete User
describe('DELETE /user', () => {
    it('should delete a user', async () => {
        const userId = 'user12345';
        const response = await request(app).delete(`/api/user?userId=${userId}`);
        expect(response.status).toBe(200);

        // check if user is deleted
        expect(await User.findOne({ userId: userId })).toBeNull();
    });
});
