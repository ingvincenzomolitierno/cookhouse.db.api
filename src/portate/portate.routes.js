const express = require('express')
const router = express.Router()
const portateController = require('./portate.controller.js');

// Retrieve all 'items'
router.get('/', portateController.findAll);

// Create a new 'items'
router.post('/', portateController.create);

// Retrieve a single 'item' with id
router.get('/:id', portateController.findById);

// Retrieve a single 'item' with id & code
router.get('/tipo/:typecode', portateController.findByTypeCode);

// Update a 'item' with id
router.put('/:id', portateController.update);

// Delete a 'item' with id
router.delete('/:id', portateController.delete);

module.exports = router