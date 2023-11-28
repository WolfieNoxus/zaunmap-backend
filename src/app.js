require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const mapRoutes = require('./routes/mapRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

app.use(express.json());


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", '*');
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//   next();
// });

app.use(cors());

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
