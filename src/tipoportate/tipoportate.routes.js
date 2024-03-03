const express = require('express')
const router = express.Router()
const tipoPortateController = require('./tipoportate.controller.js');

// Retrieve all 'items'
router.get('/', tipoPortateController.findAll);

// // Create a new 'items'
// router.post('/', tipoPortateController.create);

// // Retrieve a single 'item' with id
// router.get('/:id', tipoPortateController.findById);

// // Retrieve a single 'item' with id & code
// router.get('/tipo/:typecode', tipoPortateController.findByTypeCode);

// // Update a 'item' with id
// router.put('/:id', tipoPortateController.update);

// // Delete a 'item' with id
// router.delete('/:id', tipoPortateController.delete);

module.exports = router