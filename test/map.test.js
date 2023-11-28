// const request = require('supertest');
// const app = require('./app'); // Replace with the path to your Express app

// Sample test to ensure Jest is working
describe('Sample Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true);
    });
  });

// describe('GET /map', () => {
//     it('should return a specific map', async () => {
//         const _id = 'some-map-id'; // Replace with a valid ID
//         const response = await request(app)
//             .get(`/map?_id=${_id}`)
//             .expect(200);
//         expect(response.body).toHaveProperty('_id', _id);
//     });

//     it('should return 400 for missing _id', async () => {
//         await request(app)
//             .get('/map')
//             .expect(400);
//     });
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
//         const _id = 'some-map-id'; // Replace with a valid ID
//         const updatedData = { name: 'New Map Name' };
//         const response = await request(app)
//             .put(`/map/update?_id=${_id}`)
//             .send(updatedData)
//             .expect(200);
//         expect(response.body).toHaveProperty('name', 'New Map Name');
//     });
// });

// describe('GET /map/json', () => {
//     it('should return map JSON', async () => {
//         const _id = 'some-map-id'; // Replace with a valid ID
//         const response = await request(app)
//             .get(`/map/json?_id=${_id}`)
//             .expect(200);
//         // Additional checks can be added based on expected JSON structure
//     });
// });
