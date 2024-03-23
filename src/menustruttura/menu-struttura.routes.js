const express = require('express')
const router = express.Router()
const menuStrutturaController = require('./menu-struttura.controller.js');

// Retrieve all 'items'
router.get('/', menuStrutturaController.findAll);

// Retrieve all 'items'
router.get('/:id', menuStrutturaController.findById);

// Retrieve all 'items' by Menu PK
router.get('/menu/:id', menuStrutturaController.findByMenuPK);

// Create a new 'item'
router.post('/', menuStrutturaController.create);

// Update a 'item' with id
router.put('/:id', menuStrutturaController.update);

// Delete a 'item' with id
router.delete('/:id', menuStrutturaController.delete);

// Delete 'items' by menu_fk
router.delete('/menu/:id', menuStrutturaController.deleteByMenuPK);

module.exports = router