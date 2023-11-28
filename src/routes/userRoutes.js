const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkJwt, requiredScopes } = require('../config/auth');

router.get('/', userController.getUser);
router.get('/list', userController.listUsers);
router.post('/', userController.createUser);
router.put('/rename', userController.rename);
router.put('/restrict', userController.restrict);
router.put('/disable', userController.disable);
router.get('/maps', userController.getUserMaps);

module.exports = router;
