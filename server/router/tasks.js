const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { taskController } = require('../controllers');

router.get('/', taskController.getTasks);
router.get('/latest-tasks', taskController.getLatestTasks);
router.get('/:taskId', taskController.getOneTask);
router.post('/', auth(), taskController.createTask);
router.put('/:taskId', auth(), taskController.editTask);
router.delete('/:taskId', auth(), taskController.deleteTask);


module.exports = router;