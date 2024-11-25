const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { noteController } = require('../controllers');

router.post('/:taskId/notes', auth(), noteController.addNote);
router.get('/:taskId/notes', noteController.getNotes);

module.exports = router;