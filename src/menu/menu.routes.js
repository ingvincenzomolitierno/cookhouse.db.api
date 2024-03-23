const express = require('express')
const router = express.Router()
const menuController = require('./menu.controller.js');

// Retrieve all 'items'
router.get('/', menuController.findAll);

// Retrieve a single 'item' with id
router.get('/:id', menuController.findById);

// // Create a new 'items'
router.post('/', menuController.create);

// // Update a 'item' with id
router.put('/:id', menuController.update);

// // Delete a 'item' with id
router.delete('/:id', menuController.delete);

module.exports = router