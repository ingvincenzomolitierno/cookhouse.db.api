const express = require('express')
const router = express.Router()
const menuController = require('./menu.controller.js');

// Retrieve all 'items'
router.get('/', menuController.findAll);

// // Create a new 'items'
router.post('/', menuController.create);

// // Retrieve a single 'item' with id
// router.get('/:id', menuController.findById);

// // Update a 'item' with id
router.put('/:id', menuController.update);

// // Delete a 'item' with id
router.delete('/:id', menuController.delete);

module.exports = router