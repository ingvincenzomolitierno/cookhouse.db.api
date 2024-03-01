const express = require('express')
const router = express.Router()
const menuStrutturaController = require('./menu-struttura.controller.js');

// Retrieve all 'items'
router.get('/', menuStrutturaController.findAll);

// Retrieve all 'items'
router.get('/:id', menuStrutturaController.findById);

// // Create a new 'item'
router.post('/', menuStrutturaController.create);

// // Update a 'item' with id
router.put('/:id', menuStrutturaController.update);

// // Delete a 'item' with id
router.delete('/:id', menuStrutturaController.delete);

module.exports = router