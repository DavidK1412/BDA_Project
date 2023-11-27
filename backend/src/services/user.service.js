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

const getUserByEmployeeId = async (id) => {
    const response = await pgClient.query("SELECT * FROM Usuario WHERE codigo_empleado = $1", [id]);
    return response.rows[0];
}

const createUser = async (userId, username, password, employeeId) => {
    console.log (userId, username, password, employeeId);
    const response = await pgClient.query(
        "INSERT INTO Usuario VALUES ($1, $2, $3, $4)",
        [userId, employeeId, username, password]
    );
    return response;
}

const changePassword = async (username, password) => {
    const response = await pgClient.query(
        "UPDATE Usuario SET contrasena = $1 WHERE usuario = $2",
        [password, username]
    );
    return response;
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    getUserByEmployeeId,
    createUser,
    changePassword
};