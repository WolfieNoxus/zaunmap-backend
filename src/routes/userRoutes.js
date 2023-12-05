const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkJwt, checkScopes } = require('../config/auth');

router.get('/', userController.getUser);
router.get('/search', userController.searchUsers);
router.post('/', userController.createUser);
router.put('/rename', userController.renameUser);
router.put('/follow', userController.followUser);
router.put('/block', userController.blockUser);
router.put('/role', userController.changeUserRole);
router.delete('/', userController.deleteUser);

module.exports = router;
