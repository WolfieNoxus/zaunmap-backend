const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

// Authorization middleware
const checkJwt = auth({
  audience: "https://zaunmap.com",
  issuerBaseURL: "https://zaunmap.us.auth0.com/",
});

// Define scopes required for different routes
const checkScopes = (scopes) => requiredScopes(scopes);

module.exports = { checkJwt, checkScopes };
