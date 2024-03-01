const express = require('express')
const router = express.Router()
const materiePrimeController = require('./materie-prime.controller.js');

// Retrieve all 'items'
router.get('/', materiePrimeController.findAll);

// // Create a new 'items'
router.post('/', materiePrimeController.create);

// // Retrieve a single 'item' with id
// router.get('/:id', materiePrimeController.findById);

// // Update a 'item' with id
router.put('/:id', materiePrimeController.update);

// // Delete a 'item' with id
router.delete('/:id', materiePrimeController.delete);

module.exports = router