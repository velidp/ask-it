const express = require('express');
const usersController = require('../controllers/users.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.post('/signin', usersController.signin);
router.post('/signup', usersController.signup);
router.patch('/:id/update', usersController.updateUser);
router.get('/top-users', usersController.topUsers);
router.get('/:id', auth, usersController.getNotifications);

module.exports = router;