const express = require('express');
const saleController = require('../controllers/sale.controller');
const router = require('express').Router();

router.get('/', saleController.getAllSales);
router.get('/:id', saleController.getSaleById);
router.post('/', saleController.createSale);
router.get('/cliente/:id', saleController.getSaleByClientId);
router.get('/empleado/:id', saleController.getSalesByEmployeeId);
router.get('/sucursal/:id', saleController.getSalesByBranchId);

module.exports = router;