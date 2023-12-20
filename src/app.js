// Load environment variables from a .env file
require('dotenv').config();

// Import necessary modules
const express = require('express'); // Express framework for creating the server
const cors = require('cors'); // CORS middleware to enable cross-origin requests
const { connectDB } = require('./config/db'); // Function to connect to the database

// Import route handlers
const userRoutes = require('./routes/userRoutes'); // Routes for user-related operations
const mapRoutes = require('./routes/mapRoutes'); // Routes for map-related operations
const commentRoutes = require('./routes/commentRoutes'); // Routes for comment-related operations
const messageRoutes = require('./routes/messageRoutes'); // Routes for message-related operations

// Create an Express application
const app = express();

// Connect to the database unless the environment is set to 'test'
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

// Middlewares
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable JSON body parsing for incoming requests

// Start the server unless the environment is set to 'test'
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000; // Use the port from environment variables or default to 3000
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start listening on the specified port
}

// Route handlers
app.use('/api/user', userRoutes); // Use user routes for requests to '/api/user'
app.use('/api/map', mapRoutes); // Use map routes for requests to '/api/map'
app.use('/api/comment', commentRoutes); // Use comment routes for requests to '/api/comment'
app.use('/api/message', messageRoutes); // Use message routes for requests to '/api/message'

// Export the Express application for use in other files (like for testing)
module.exports = app;
