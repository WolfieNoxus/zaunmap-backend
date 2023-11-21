const express = require('express');
const connectDB = require('./config/db');
const { checkJwt, checkScopes } = require('./config/auth');
const userRoutes = require('./routes/userRoutes');

const app = express();
connectDB();

app.use(express.json());

// Secured route with JWT and scope checking
app.use('/api/users', checkJwt, checkScopes, userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
