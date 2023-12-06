const express = require('express');
const specialController = require('../controllers/special.controller');
const router = require('express').Router();

router.get('/new-clients/:month/:year', specialController.getNewClients);
router.get('/most-sold/:status/:month/:year', specialController.getMostSoldBrands);
router.get('/new-clients-detailed/:month/:year', specialController.getDetailedNewClients);
router.get('/most-new-brands/:month/:year', specialController.getMostNewBrands);
router.get('/employee-detailed', specialController.getEmployeeDetailed);

module.exports = router;
