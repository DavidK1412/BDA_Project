const saleService = require('../services/sale.service');

const getAllSales = async (req, res) => {
    const sales = await saleService.getAllSales();
    res.status(200).json(sales);
}

const getSaleById = async (req, res) => {
    const { id } = req.params;
    const sale = await saleService.getSaleById(id);
    res.status(200).json(sale);
}

const createSale = async (req, res) => {
    const sale = req.body;
    const newSale = await saleService.createSale(sale);
    res.status(201).json(newSale);
}

const getSaleByClientId = async (req, res) => {
    const { id } = req.params;
    const sale = await saleService.getSaleByClientId(id);
    res.status(200).json(sale);
}

const getSalesByEmployeeId = async (req, res) => {
    const { id } = req.params;
    const sale = await saleService.getSalesByEmployeeId(id);
    res.status(200).json(sale);
}

const getSalesByBranchId = async (req, res) => {
    const { id } = req.params;
    const sale = await saleService.getSalesByBranchId(id);
    res.status(200).json(sale);
}


module.exports = {
    getAllSales,
    getSaleById,
    createSale,
    getSaleByClientId,
    getSalesByEmployeeId,
    getSalesByBranchId
}