const lineService = require("../services/line.service");

const getAllLines = async (req, res) => {
    const lines = await lineService.getAllLines();
    return res.status(200).json(lines);
}

const getLineById = async (req, res) => {
    const id = req.params.id;
    const line = await lineService.getLineById(id);
    return res.status(200).json(line);
}

const createLine = async (req, res) => {
    const line = req.body;
    const response = await lineService.createLine(line);
    return res.status(200).json(response);
}

const updateLine = async (req, res) => {
    const id = req.params.id;
    const line = req.body;
    const response = await lineService.updateLine(id, line);
    return res.status(200).json(response);
}

const deleteLine = async (req, res) => {
    const id = req.params.id;
    const response = await lineService.deleteLine(id);
    return res.status(200).json(response);
}

module.exports = {
    getAllLines,
    getLineById,
    createLine,
    updateLine,
    deleteLine
};
