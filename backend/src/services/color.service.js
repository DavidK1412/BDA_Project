const pgClient = require("../config/db.config");

const getAllColors = async () => {
    const response = await pgClient.query("SELECT * FROM color");
    return response.rows;
}

const getColorById = async (id) => {
    const response = await pgClient.query(
        "SELECT * FROM color WHERE id = $1", [id]
    )
    return response.rows[0];
}

const createColor = async (color) => {
    const { id, nombre } = color;
    const response = await pgClient.query(
        "INSERT INTO color (id, nombre) VALUES ($0, $1)", [id ,nombre]
    )
    return response;
}

const updateColor = async (id, color) => {
    const { nombre } = color;
    const response = await pgClient.query(
        "UPDATE color SET nombre = $1 WHERE id = $2", [nombre, id]
    )
    return response;
}

const deleteColor = async (id) => {
    const response = await pgClient.query(
        "DELETE FROM color WHERE id = $1", [id]
    )
    return response;
}


module.exports = {
    getAllColors,
    getColorById,
    createColor,
    updateColor,
    deleteColor
};