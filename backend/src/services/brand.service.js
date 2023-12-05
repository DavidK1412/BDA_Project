const pgClient = require("../config/db.config");

const getAllBrands = async () => {
    const response = await pgClient.query("SELECT * FROM marca");
    return response.rows;
}

const getBrandById = async (id) => {
    const response = await pgClient.query(
        "SELECT * FROM marca WHERE id = $1", [id]
    )
    return response.rows[0];
}

const createBrand = async (brand) => {
    const { id, nombre } = brand;
    console.log(brand);
    const response = await pgClient.query(
        "INSERT INTO marca (id, nombre) VALUES ($1, $2)", [id ,nombre]
    )
    return response;
}

const updateBrand = async (id, brand) => {
    const { nombre } = brand;
    const response = await pgClient.query(
        "UPDATE marca SET nombre = $1 WHERE id = $2", [nombre, id]
    )
    return response;
}

const deleteBrand = async (id) => {
    const response = await pgClient.query(
        "DELETE FROM marca WHERE id = $1", [id]
    )
    return response;
}


module.exports = {
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand
};