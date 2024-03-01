const express = require('express')
const router = express.Router()
const plessiController = require('./plessi.controller.js');

// Retrieve all 'items'
router.get('/', plessiController.findAll);

// Retrieve a single 'item' with id
router.get('/:id', plessiController.findById);

// Create a new 'items'
router.post('/', plessiController.create);

// Update a 'item' with id
router.put('/:id', plessiController.update);

// Delete a 'item' with id
router.delete('/:id', plessiController.delete);

module.exports = router