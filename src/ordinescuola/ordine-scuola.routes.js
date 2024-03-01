const express = require('express')
const router = express.Router()
const ordineScuolaController = require('./ordine-scuola.controller.js');

// Retrieve all 'items'
router.get('/', ordineScuolaController.findAll);

// Retrieve a single 'item' with id
router.get('/:id', ordineScuolaController.findById);

// Create a new 'items'
router.post('/', ordineScuolaController.create);

// Update a 'item' with id
router.put('/:id', ordineScuolaController.update);

// Delete a 'item' with id
router.delete('/:id', ordineScuolaController.delete);

module.exports = router