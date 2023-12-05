const request = require('supertest');
const app = require('../src/app');
const { connectDB, disconnectDB } = require('../src/config/db');
const Map = require('../src/models/mapModel');
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
        owner: 'testuser2',
        description: 'This is a test map',
        isPublic: true,
        tags: ['tag1', 'tag2'],
        comments: []
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
    await map.save();
    await user1.save();
    user2.maps.push(map._id);
    await user2.save();
});

afterEach(async () => {
    await Map.deleteOne({ name: 'Test Map' });
    await Map.deleteOne({ name: 'Test Map 2' });
    await User.deleteOne({ userId: 'testuser' });
    await User.deleteOne({ userId: 'testuser2' });
});

// GET /map
describe('GET /map', () => {
    it('should retrieve a map by its ID', async () => {
        const map = await Map.findOne({ name: 'Test Map' });
        const mapId = map._id.toString();
        const res = await request(app).get('/api/map').query({ mapId: mapId });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
    });
});

// GET /map/search
describe('GET /map/search', () => {
    it('should search public maps by name and tags', async () => {
        const res = await request(app).get('/api/map/search');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

// PUT /map
describe('PUT /map', () => {
    it('should update a map', async () => {
        const map = await Map.findOne({ name: 'Test Map' });
        const mapId = map._id.toString();
        const res = await request(app)
            .put('/api/map')
            .query({ mapId: mapId })
            .send({
                name: 'Test Map 2'
            })
            expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Test Map 2');
    });
});

// PUT /map/rate
describe('PUT /map/rate', () => {
    it('should rate a map', async () => {
        const map = await Map.findOne({ name: 'Test Map' });
        const mapId = map._id.toString();
        const userId = 'testuser'
        const res = await request(app)
            .put('/api/map/rate')
            .query({ mapId: mapId, userId: userId, rating: 5 });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('averageRating');
    });
});

// DELETE /map
describe('DELETE /map', () => {
    it('should delete a map', async () => {
        const map = await Map.findOne({ name: 'Test Map' });
        const mapId = map._id.toString();
        const res = await request(app)
            .delete('/api/map')
            .query({ mapId: mapId });
        expect(res.statusCode).toEqual(200);
    });
});
