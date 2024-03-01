const express = require('express')
const router = express.Router()
const scuoleController = require('./scuole.controller.js');

// Retrieve all 'items'
router.get('/', scuoleController.findAll);

// Retrieve a single 'item' with id
router.get('/:id', scuoleController.findById);

// Create a new 'items'
router.post('/', scuoleController.create);

// Update a 'item' with id
router.put('/:id', scuoleController.update);

// Delete a 'item' with id
router.delete('/:id', scuoleController.delete);

module.exports = router