const pgClient = require("../config/db.config");
const brandService = require("./brand.service");

const getAllLines = async () => {
    const response = await pgClient.query("SELECT * FROM linea");
    const lines = response.rows;
    return lines;
}

const getLineById = async (id) => {
    const response = await pgClient.query(
        "SELECT * FROM linea WHERE id = $1", [id]
    )
    const line = response.rows[0];
    const brand = await brandService.getBrandById(line.id_marca);
    line.marca = brand;
    return line;
}

const createLine = async (line) => {
    const { id, nombre, id_marca } = line;
    const response = await pgClient.query(
        "INSERT INTO linea (id, nombre, id_marca) VALUES ($1, $2, $3)", [id ,nombre, id_marca]
    )
    return response;
}

const updateLine = async (id, line) => {
    const { nombre, id_marca } = line;
    const response = await pgClient.query(
        "UPDATE linea SET nombre = $1, id_marca = $2 WHERE id = $3", [nombre, id_marca, id]
    )
    return response;
}

const deleteLine = async (id) => {
    const response = await pgClient.query(
        "DELETE FROM linea WHERE id = $1", [id]
    )
    return response;
}


module.exports = {
    getAllLines,
    getLineById,
    createLine,
    updateLine,
    deleteLine
};