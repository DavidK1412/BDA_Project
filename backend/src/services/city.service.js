const pgClient = require("../config/db.config");

const getAllCities = async () => {
    pgClient.query("SELECT * FROM Ciudad", (err, res) => {
        if (err) throw err;
        return res.rows;
    });
}

module.exports = {
    getAllCities
}