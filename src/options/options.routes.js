const express = require('express')
const router = express.Router()
const optionController = require('./options.controller.js');

// Retrieve all 'materie prime'
router.get('/versioneportate', optionController.findAllVersioniPortate);
router.get('/tipoportate', optionController.findAllTipoPortate);

// // Create a new 'materie prime'
// router.post('/', distintaBaseController.create);

// // Retrieve a single 'materie prime' with id
// router.get('/:id', distintaBaseController.findById);

// // Update a 'materie prime' with id
// router.put('/:id', distintaBaseController.update);

// // Delete a 'materie prime' with id
// router.delete('/:id', distintaBaseController.delete);

module.exports = router