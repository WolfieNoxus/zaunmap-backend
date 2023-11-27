require('dotenv').config();
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

// Authorization middleware
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_URL,
});

// Define scopes required for different routes
const checkScopes = (scopes) => requiredScopes(scopes);

module.exports = { checkJwt, checkScopes };
