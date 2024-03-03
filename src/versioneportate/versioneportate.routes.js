const express = require('express')
const router = express.Router()
const versionePortateController = require('./versioneportate.controller.js');

// Retrieve all 'items'
router.get('/', versionePortateController.findAll);

// // Create a new 'items'
// router.post('/', versionePortateController.create);

// // Retrieve a single 'item' with id
// router.get('/:id', versionePortateController.findById);

// // Retrieve a single 'item' with id & code
// router.get('/tipo/:typecode', versionePortateController.findByTypeCode);

// // Update a 'item' with id
// router.put('/:id', versionePortateController.update);

// // Delete a 'item' with id
// router.delete('/:id', versionePortateController.delete);

module.exports = router