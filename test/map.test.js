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

// describe('GET /api/map', () => {
//   it('should return 200 OK', async () => {
//     const response = await request(app).get('/api/map?mapId=65666bac0d95f64b2c542802');
//     expect(response.status).toBe(200);
//   });
// });

// describe('GET /map/public', () => {
//     it('should return all public maps', async () => {
//         const response = await request(app)
//             .get('/map/public')
//             .expect(200);
//         expect(response.body).toBeInstanceOf(Array);
//         // Additional checks can be added based on expected structure
//     });
// });

// describe('GET /map', () => {
//     it('should return all maps', async () => {
//         const response = await request(app)
//             .get('/map')
//             .expect(200);
//         expect(response.body).toBeInstanceOf(Array);
//     });
// });

// describe('PUT /map/update', () => {
//     it('should update map metadata', async () => {
//         const mapId = 'some-map-id'; // Replace with a valid ID
//         const updatedData = { name: 'New Map Name' };
//         const response = await request(app)
//             .put(`/map/update?mapId=${mapId}`)
//             .send(updatedData)
//             .expect(200);
//         expect(response.body).toHaveProperty('name', 'New Map Name');
//     });
// });

// describe('GET /map/json', () => {
//     it('should return map JSON', async () => {
//         const mapId = 'some-map-id'; // Replace with a valid ID
//         const response = await request(app)
//             .get(`/map/json?mapId=${mapId}`)
//             .expect(200);
//         // Additional checks can be added based on expected JSON structure
//     });
// });
