const express = require('express');
const router = express.Router();
const autoController = require('../controllers/auto.controller');


router.get('/', autoController.getAllAutos);
router.get('/get/:id', autoController.getAutoById);
router.post('/', autoController.createAuto);
router.put('/:id', autoController.updateAuto);
router.delete('/:id', autoController.deleteAuto);
router.get('/used', autoController.getUsedAutos);
router.get('/new', autoController.getNewestAutos);
router.post('/used', autoController.setUsedAuto);
router.post('/new', autoController.setNewAuto);

module.exports = router;
