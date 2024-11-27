const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { noteController } = require('../controllers');

router.get('/:taskId', noteController.getNotes);
router.post('/:taskId', auth(), noteController.addNote);

module.exports = router;