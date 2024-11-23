const express = require('express');
const router = express.Router();
const { auth } = require('../utils');

const { commentController } = require('../controllers')

router.get('/:taskId', commentController.getComments);
router.post('/:taskId', auth(), commentController.addComment);

module.exports = router;