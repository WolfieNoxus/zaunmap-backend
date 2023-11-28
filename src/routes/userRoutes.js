const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkJwt } = require('../config/auth');

router.get('/', userController.getUser);
router.post('/', userController.createUser);
router.put('/rename', userController.rename);
router.put('/restrict', userController.restrict);

module.exports = router;
