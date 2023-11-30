const colorService = require('../services/color.service');

const getAllColors = async (req, res) => {
    const colors = await colorService.getAllColors();
    return res.status(200).json(colors);
}

const getColorById = async (req, res) => {
    const id = req.params.id;
    const color = await colorService.getColorById(id);
    return res.status(200).json(color);
}

const createColor = async (req, res) => {
    const color = req.body;
    const response = await colorService.createColor(color);
    return res.status(200).json(response);
}

const updateColor = async (req, res) => {
    const id = req.params.id;
    const color = req.body;
    const response = await colorService.updateColor(id, color);
    return res.status(200).json(response);
}

const deleteColor = async (req, res) => {
    const id = req.params.id;
    const response = await colorService.deleteColor(id);
    return res.status(200).json(response);
}


module.exports = {
    getAllColors,
    getColorById,
    createColor,
    updateColor,
    deleteColor
};