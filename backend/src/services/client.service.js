const pgClient = require("../config/db.config");
const cityService = require("./city.service");
const branchService = require("./branch.service");

const getClientsByBranch = async (id) => {
    const response = await pgClient.query(
        "SELECT * FROM cliente WHERE id_sucursal = $1", [id]
    )
    return response.rows;
}

const getCellphoneById = async (id) => {
    const response = await pgClient.query(
        "SELECT * FROM telefono_cliente WHERE cedula_cliente = $1", [id]
    )
    return response.rows;
}

const createCellphone = async (id, cellphone) => {
    const response = await pgClient.query(
        "INSERT INTO telefono_cliente (cedula_cliente, numero) VALUES ($1, $2)", [id, cellphone]
    )
    return response;
}

const deleteCellphone = async (id, cellphone) => {
    const response = await pgClient.query(
        "DELETE FROM telefono_cliente WHERE cedula_cliente = $1 AND numero = $2", [id, cellphone]
    )
    return response;
}

const getAllClients = async () => {
    const response = await pgClient.query("SELECT * FROM cliente");
    return response.rows;
}

const getClientById = async (id) => {
    const response = await pgClient.query(
        "SELECT * FROM cliente WHERE cedula = $1", [id]
    )

    const client = response.rows[0];
    const city = await cityService.getCityById(client.id_ciudad);
    const branch = await branchService.getBranchById(client.id_sucursal);
    const cellphone = await getCellphoneById(id);
    
    client.ciudad = city[0];
    client.sucursal = branch[0];
    client.telefonos = cellphone;
    return client;
}

const createClient = async (client) => {
    const { cedula, nombre, id_ciudad, id_sucursal } = client;
    // Obtiene fecha actual en formato YYYY-MM-DD
    const date = new Date().toISOString().split('T')[0];
    const response = await pgClient.query(
        "INSERT INTO cliente (cedula, nombre, id_ciudad, fecha_ingreso) VALUES ($1, $2, $3, $4)", [cedula, nombre, id_ciudad, date]
    )
    const { telefonos } = client;
    if (telefonos.length > 0 && response.rowCount > 0) {
        telefonos.forEach(async (telefono) => {
            await pgClient.query(
                "INSERT INTO telefono_cliente (cedula_cliente, numero) VALUES ($1, $2)", [cedula, telefono]
            )
        });
    }
    return response;
}

const updateClient = async (id, client) => {
    const { nombre, id_ciudad, id_sucursal } = client;
    const response = await pgClient.query(
        "UPDATE cliente SET nombre = $1, id_ciudad = $2, id_sucursal = $3 WHERE cedula = $4", [nombre, id_ciudad, id_sucursal, id]
    )
    return response;
}

const deleteClient = async (id) => {
    const response = await pgClient.query(
        "DELETE FROM cliente WHERE cedula = $1", [id]
    )
    return response;
}

module.exports = {
    getCellphoneById,
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
    deleteCellphone,
    createCellphone,
    getClientsByBranch
};
