const express = require('express')
const router = express.Router()
const distintaBaseController = require('./distinte-base.controller.js');

// Retrieve all 'items'
router.get('/', distintaBaseController.findAll);

// Create a new 'items'
router.post('/', distintaBaseController.create);

// Retrieve a single 'item' with id
// router.get('/:id', distintaBaseController.findById);

// Update a 'item' with id
router.put('/:id', distintaBaseController.update);

// Delete a 'item' with id
router.delete('/:id', distintaBaseController.delete);

module.exports = router