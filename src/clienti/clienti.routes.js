const express = require('express')
const router = express.Router()
const clientiController = require('./clienti.controller.js');

// Retrieve all 'items'
router.get('/', clientiController.findAll);

// Retrieve a single 'item' with id
router.get('/:id', clientiController.findById);

// Create a new 'items'
router.post('/', clientiController.create);

// Update a 'item' with id
router.put('/:id', clientiController.update);

// Delete a 'item' with id
router.delete('/:id', clientiController.delete);

module.exports = router