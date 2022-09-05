const express = require('express');
const router = express.Router();
const PostController = require('../controllers/posts.controller');

router.get('/posts', PostController.getAll);
router.get('/posts/:id', PostController.getById);
router.post('/posts', PostController.addOne);
router.put('/posts/:id', PostController.updateById);
router.delete('/posts/:id', PostController.deleteById);

module.exports = router;