const pgClient = require("../config/db.config");

const getAllUsers = async () => {
    const response = await pgClient.query("SELECT * FROM Usuario");
    return response.rows;
};

const getUserById = async (id) => {
    const response = await pgClient.query("SELECT * FROM Usuario WHERE id = $1", [id]);
    return response.rows[0];
};

const getUserByUsername = async (username) => {
    const response = await pgClient.query("SELECT * FROM Usuario WHERE usuario = $1", [username]);
    return response.rows[0];
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername
};