const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkJwt, checkScopes } = require('../config/auth');

// Secure route with JWT check and scopes
router.get('/', checkJwt, checkScopes('read:users'), userController.getUsers);
router.post('/', checkJwt, checkScopes('write:users'), userController.createUser);

// Other routes...

module.exports = router;
