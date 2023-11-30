const autoService = require('../services/auto.service');

const getAllAutos = async (req, res) => {
    const autos = await autoService.getAllAutos();
    return res.status(200).json(autos);
}

const getAutoById = async (req, res) => {
    const id = req.params.id;
    const auto = await autoService.getAutoById(id);
    return res.status(200).json(auto);
}

const createAuto = async (req, res) => {
    const auto = req.body;
    const response = await autoService.createAuto(auto);
    return res.status(200).json(response);
}

const updateAuto = async (req, res) => {
    const id = req.params.id;
    const auto = req.body;
    const response = await autoService.updateAuto(id, auto);
    return res.status(200).json(response);
}

const deleteAuto = async (req, res) => {
    const id = req.params.id;
    const response = await autoService.deleteAuto(id);
    return res.status(200).json(response);
}

const getNewestAutos = async (req, res) => {
    const autos = await autoService.getNewAutos();
    return res.status(200).json(autos);
}

const getUsedAutos = async (req, res) => {
    const autos = await autoService.getUsedAutos();
    return res.status(200).json(autos);
}


module.exports = {
    getAllAutos,
    getAutoById,
    createAuto,
    updateAuto,
    deleteAuto,
    getNewestAutos,
    getUsedAutos
};