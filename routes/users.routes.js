const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users.controller');

router.get('/users', UserController.getAll);
router.get('/users/:id', UserController.getById);
router.post('/users', UserController.addOne);
router.put('/users/:id', UserController.updateById);
router.delete('/users/:id', UserController.deleteById);

module.exports = router;