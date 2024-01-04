// Load environment variables from a .env file
require('dotenv').config();

// Import mongoose to interact with MongoDB
const mongoose = require('mongoose');

/**
 * Asynchronous function to connect to MongoDB.
 * It uses the MONGO_URI environment variable for the database connection string.
 * On successful connection, it logs the host of the MongoDB server.
 * If it encounters an error, it logs the error message and exits the application.
 */
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb+srv://our-first-user:MJhshHlUpoOAuYgb@zaunmap.lgbnudq.mongodb.net/?retryWrites=true&w=majority'; // Retrieve MongoDB URI from environment variables
        const conn = await mongoose.connect(mongoURI); // Connect to MongoDB
        console.log(`MongoDB Connected: ${conn.connection.host}`); // Log the MongoDB host on successful connection
    } catch (err) {
        console.error(`Error: ${err.message}`); // Log any connection error
        process.exit(1); // Exit the application with a failure status code
    }
};

/**
 * Asynchronous function to disconnect from MongoDB.
 * It attempts to close the MongoDB connection.
 * On failure, it logs the error and exits the application.
 */
const disconnectDB = async () => {
    try {
        await mongoose.disconnect(); // Disconnect from MongoDB
        console.log(`MongoDB Disconnected`); // Log on successful disconnection
    } catch (err) {
        console.error(`Error: ${err.message}`); // Log any disconnection error
        process.exit(1); // Exit the application with a failure status code
    }
}

// Export the connectDB and disconnectDB functions for use elsewhere in the application
module.exports = { connectDB, disconnectDB };
