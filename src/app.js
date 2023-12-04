require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const mapRoutes = require('./routes/mapRoutes');
const commentRoutes = require('./routes/commentRoutes');
const messageRoutes = require('./routes/messageRoutes');
const bodyParser = require('body-parser');

const app = express();
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Only start the server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

app.use('/api/user', userRoutes);
app.use('/api/map', mapRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/message', messageRoutes);

// Export the app for testing purposes
module.exports = app;