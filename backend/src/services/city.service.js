const pgClient = require("../config/db.config");

const getAllCities = async () => {
    const response = await pgClient.query("SELECT * FROM Ciudad");
    return response.rows;
}

const getCityById = async (id) => {
    const response = await pgClient.query(
        "SELECT * FROM Ciudad WHERE id = $1", [id]
    )
    return response.rows;
}

module.exports = {
    getAllCities,
    getCityById
}