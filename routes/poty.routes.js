const express = require('express');
const router = express.Router();
const potyController = require('../controllers/poty.controller');
const verifyToken = require('../middleware/auth.middleware');

// Auth routes
router.post('/login', potyController.login);
router.post('/register', potyController.create);

// Protected routes
router.get('/', verifyToken, potyController.findAll);
router.put('/:id', verifyToken, potyController.update);
router.delete('/:id', verifyToken, potyController.delete);

module.exports = router; 