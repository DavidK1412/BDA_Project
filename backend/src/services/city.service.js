const pgClient = require("../config/db.config");

const getAllCities = async () => {
    pgClient.query("SELECT * FROM Ciudad", (err, res) => {
        if (err) throw err;
        return res.rows;
    });
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