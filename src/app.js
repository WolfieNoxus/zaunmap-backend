require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const mapRoutes = require('./routes/mapRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

app.use(express.json());

// Add a route for /api/hello
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// Export the app for testing purposes
module.exports = app;

// Only start the server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Secured route with JWT and scope checking
app.use('/api/user', userRoutes);
app.use('/api/map', mapRoutes);
app.use('/api/comment', commentRoutes);
