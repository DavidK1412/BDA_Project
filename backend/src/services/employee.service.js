const pgClient = require("../config/db.config");

const getAllEmployees = async () => {
    const response = await pgClient.query("SELECT * FROM Empleado");
    return response.rows;
};

const getEmployeeById = async (id) => {
    const response = await pgClient.query("SELECT * FROM Empleado WHERE id = $1", [id]);    return response.rows[0];
}

const getEmployeeByUsername = async (username) => {
    const response = await pgClient.query(
        "SELECT * FROM Empleados_username WHERE usuario = $1", [username] 
    );
    return response.rows[0];
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    getEmployeeByUsername
};