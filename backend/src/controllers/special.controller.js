const specialService = require('../services/special.service');

const getNewClients = async (req, res) => {
    const { month, year } = req.params;
    const clients = await specialService.getNewClients(month, year);
    return res.status(200).json(clients);
}

const getMostSoldBrands = async (req, res) => {
    const { status, month, year } = req.params;
    const brands = await specialService.getMostSoldBrands(status, month, year);
    return res.status(200).json(brands);
}

const getDetailedNewClients = async (req, res) => {
    const { month, year } = req.params;
    const clients = await specialService.getDetailedNewClients(month, year);
    return res.status(200).json(clients);
}

const getMostNewBrands = async (req, res) => {
    const { month, year } = req.params;
    const brands = await specialService.getMostNewBrands(month, year);
    return res.status(200).json(brands);
}

const getEmployeeDetailed = async (req, res) => {
    const employees = await specialService.getEmployeeDetailed();
    return res.status(200).json(employees);
}

module.exports = {
    getDetailedNewClients,
    getMostNewBrands,
    getEmployeeDetailed,
    getNewClients,
    getMostSoldBrands
};