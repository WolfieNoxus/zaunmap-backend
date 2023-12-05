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
});

afterEach(async () => {
});

// GET /map
describe('GET /map', () => {
    it('should retrieve a map by its ID', async () => {
        const res = await request(app).get('/api/map?mapId=656e78105dea6eebc1b05981');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');

    });
});

// // GET /map/search
// describe('GET /map/search', () => {
//     it('should search public maps by name and tags', async () => {
//         const res = await request(app).get('/api/map/search?name=testmap&tags=tag1,tag2');
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toBeInstanceOf(Array);

//     });
// });

// // POST /map
// describe('POST /map', () => {
//     it('should create a new map', async () => {
//         const res = await request(app)
//             .post('/map')
//             .send({ userId: 'auth0|656669d317b4bdb501178567' });
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty('_id');

//     });
// });

// // PUT /map
// describe('PUT /map', () => {
//     it('should update a map', async () => {
//         const res = await request(app)
//             .put('/map')
//             .send({ mapId: '65680d250505420b42427a82', userId: 'auth0|656669d317b4bdb501178567', name: 'New Map Name' });
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty('_id');

//     });
// });

// // PUT /map/rate
// describe('PUT /map/rate', () => {
//     it('should rate a map', async () => {
//         const res = await request(app)
//             .put('/map/rate')
//             .send({ userId: 'auth0|656669d317b4bdb501178567', mapId: '65680d250505420b42427a82', rating: 5 });
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty('_id');

//     });
// });

// // PUT /map/import
// describe('PUT /map/import', () => {
//     it('should import a map', async () => {
//         const res = await request(app)
//             .put('/map/import')
//             .send({ userId: 'auth0|656669d317b4bdb501178567', mapId: '65680d250505420b42427a82', object_id: '65680d250505420b42427a82' });
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty('_id');

//     });
// });

// // DELETE /map
// describe('DELETE /map', () => {
//     it('should delete a map', async () => {
//         const res = await request(app)
//             .delete('/map')
//             .send({ mapId: '65680d250505420b42427a82', userId: 'auth0|656669d317b4bdb501178567' });
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty('_id');

//     });
// });
