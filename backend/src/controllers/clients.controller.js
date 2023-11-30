const clientService = require('../services/client.service');

const getAllClients = async (req, res) => {
    const clients = await clientService.getAllClients();
    return res.status(200).json(clients);
}

const getClientById = async (req, res) => {
    const id = req.params.id;
    const client = await clientService.getClientById(id);
    return res.status(200).json(client);
}

const createClient = async (req, res) => {
    const client = req.body;
    const response = await clientService.createClient(client);
    if (response.rowCount == 0) {
        return res.status(400).json({ message: "El cliente ya existe" });
    }
    return res.status(200).json({ message: "Cliente creado correctamente" });
}

const updateClient = async (req, res) => {
    const id = req.params.id;
    const client = req.body;
    const response = await clientService.updateClient(id, client);
    if (response.rowCount == 0) {
        return res.status(400).json({ message: "El cliente no existe" });
    }
    return res.status(200).json({ message: "Cliente actualizado correctamente" });
}

const deleteClient = async (req, res) => {
    const id = req.params.id;
    const response = await clientService.deleteClient(id);
    if (response.rowCount == 0) {
        return res.status(400).json({ message: "El cliente no existe" });
    }
    return res.status(200).json({ message: "Cliente eliminado correctamente" });
}

const deleteCellphone = async (req, res) => {
    const id = req.params.id;
    const cellphone = req.params.cellphone;
    const response = await clientService.deleteCellphone(id, cellphone);
    if (response.rowCount == 0) {
        return res.status(400).json({ message: "El cliente no existe" });
    }
    return res.status(200).json({ message: "Teléfono eliminado correctamente" });
}

const addCellphone = async (req, res) => {
    const id = req.params.id;
    const cellphone = req.body.telefono;
    const response = await clientService.createCellphone(id, cellphone);
    if (response.rowCount == 0) {
        return res.status(400).json({ message: "El cliente no existe" });
    }
    return res.status(200).json({ message: "Teléfono agregado correctamente" });
}

const getClientsByBranch = async (req, res) => {
    const id = req.params.id;
    const clients = await clientService.getClientsByBranch(id);
    return res.status(200).json(clients);
}

module.exports = {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
    deleteCellphone,
    addCellphone,
    getClientsByBranch
};