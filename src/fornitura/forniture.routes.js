const express = require('express')
const router = express.Router()
const fornitureController = require('./forniture.controller.js');

// Retrieve all 'items'
router.get('/', fornitureController.findAll);

// Retrieve a single 'item' with id
router.get('/:id', fornitureController.findById);

// Retrieve a single 'item' by menu id
router.get('/bymenu/:id', fornitureController.findByMenuId);

// Create a new 'items'
router.post('/', fornitureController.create);

// Update a 'item' with id
router.put('/:id', fornitureController.update);

// Delete a 'item' with id
router.delete('/:id', fornitureController.delete);

module.exports = router