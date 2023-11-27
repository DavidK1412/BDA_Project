const cityService = require('../services/city.service');

const getAllCities = async (req, res) => {
    const cities = await cityService.getAllCities();
    return res.status(200).json(cities);
}

module.exports = {
    getAllCities
}