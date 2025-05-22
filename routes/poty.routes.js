const express = require('express');
const router = express.Router();
const potyController = require('../controllers/poty.controller');

// Auth routes
router.post('/login', potyController.login);

// CRUD routes
router.post('/', potyController.create);
router.get('/', potyController.findAll);
router.put('/:id', potyController.update);
router.delete('/:id', potyController.delete);

module.exports = router; 