const express = require('express')
const router = express.Router()
const turniController = require('./turni.controller.js');

// Retrieve all 'items'
router.get('/', turniController.findAll);

// Retrieve a single 'item' with id
router.get('/:id', turniController.findById);

// Create a new 'items'
router.post('/', turniController.create);

// Update a 'item' with id
router.put('/:id', turniController.update);

// Delete a 'item' with id
router.delete('/:id', turniController.delete);

module.exports = router