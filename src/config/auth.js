// Load environment variables from the .env file
require('dotenv').config();

// Import authentication middleware from 'express-oauth2-jwt-bearer' package
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

/**
 * Middleware to check JSON Web Token (JWT) in requests.
 * This middleware validates the token using the audience and issuer URL 
 * from the environment variables.
 */
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE || 'https://zaunmap.com', // The intended audience of the JWT (usually your API)
  issuerBaseURL: process.env.AUTH0_ISSUER_URL || 'https://zaunmap.us.auth0.com/' // Base URL of the token issuer (Auth0 domain)
});

/**
 * Factory function to create middleware for scope checking.
 * It takes an array of strings representing the required scopes 
 * and returns a middleware function that checks if the JWT 
 * includes these scopes.
 *
 * @param scopes Array of scopes required for a particular route
 */
const checkScopes = (scopes) => requiredScopes(scopes);

// Export the middleware functions for use in other parts of the application
module.exports = { checkJwt, checkScopes };
