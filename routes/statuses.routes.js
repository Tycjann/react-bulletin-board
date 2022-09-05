const express = require('express');
const router = express.Router();
const StatusesController = require('../controllers/statuses.controller');

router.get('/statuses', StatusesController.getAll);
router.get('/statuses/:id', StatusesController.getById);

module.exports = router;
