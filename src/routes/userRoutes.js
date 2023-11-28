const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkJwt } = require('../config/auth');

router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/changename/:id', userController.changeName);
router.put('/ban/:id', userController.banUser);
router.put('/unban/:id', userController.unbanUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
