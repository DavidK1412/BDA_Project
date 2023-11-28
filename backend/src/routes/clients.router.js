const express = require('express');
const clientController = require('../controllers/clients.controller');
const router = express.Router();

router.get('/', clientController.getAllClients);
router.get('/:id', clientController.getClientById);
router.post('/', clientController.createClient);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);
router.delete('/:id/:cellphone', clientController.deleteCellphone);

module.exports = router;