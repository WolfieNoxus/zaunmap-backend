require('dotenv').config();
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

// Authorization middleware
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE || 'https://localhost:3000',
  issuerBaseURL: process.env.AUTH0_ISSUER_URL || 'https://dev-1234.us.auth0.com',
});

// Define scopes required for different routes
const checkScopes = (scopes) => requiredScopes(scopes);

module.exports = { checkJwt, checkScopes };
