const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkJwt, checkScopes } = require('../config/auth');

// Secure route with JWT check and scopes
router.get('/', userController.getUsers);
router.post('/', userController.createUser);

// Other routes...

module.exports = router;
