require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb+srv://our-first-user:MJhshHlUpoOAuYgb@zaunmap.lgbnudq.mongodb.net/?retryWrites=true&w=majority'
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Exit with failure
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log(`MongoDB Disconnected`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Exit with failure
    }
}

module.exports = { connectDB, disconnectDB };
