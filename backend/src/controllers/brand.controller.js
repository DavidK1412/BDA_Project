const brandService = require('../services/brand.service');

const getAllBrands = async (req, res) => {
    const brands = await brandService.getAllBrands();
    return res.status(200).json(brands);
}

const getBrandById = async (req, res) => {
    const id = req.params.id;
    const brand = await brandService.getBrandById(id);
    return res.status(200).json(brand);
}

const createBrand = async (req, res) => {
    const brand = req.body;
    const response = await brandService.createBrand(brand);
    return res.status(200).json(response);
}

const updateBrand = async (req, res) => {
    const id = req.params.id;
    const brand = req.body;
    const response = await brandService.updateBrand(id, brand);
    return res.status(200).json(response);
}

const deleteBrand = async (req, res) => {
    const id = req.params.id;
    const response = await brandService.deleteBrand(id);
    return res.status(200).json(response);
}


module.exports = {
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand
};