const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils');

router.get('/', auth(),authController.getUser);
router.get('/profile', auth(), authController.getProfile);

module.exports = router