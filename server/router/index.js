const router = require('express').Router();
const users = require('./users');
const tasks = require('./tasks');
const notes = require('./notes');
const test = require('./test');
const { authController } = require('../controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/tasks', tasks);
router.use('/notes', notes);
router.use('/test', test);

module.exports = router;