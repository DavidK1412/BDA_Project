const pgClient = require("../config/db.config");

const getAllEmployees = async () => {
    const response = await pgClient.query("SELECT * FROM Empleado");
    return response.rows;
};

const getEmployeeById = async (id) => {
    const response = await pgClient.query("SELECT * FROM Empleado WHERE codigo = $1", [id]);    return response.rows[0];
}

const getEmployeeByUsername = async (username) => {
    const response = await pgClient.query(
        "SELECT * FROM Empleados_username WHERE usuario = $1", [username] 
    );
    return response.rows[0];
}

const createEmployee = async (employee) => {
    const response = await pgClient.query(
        "INSERT INTO Empleado(cedula, nombre, salario, fecha_nacimiento, fecha_ingreso, id_cargo, id_sucursal) VALUES($1, $2, $3, $4, $5, $6, $7)",
        [employee.cedula, employee.nombre, employee.salario, employee.fecha_nacimiento, employee.fecha_ingreso, employee.id_cargo, employee.id_sucursal]
    );
    return response;
}

const updateEmployee = async (id, employee) => {
    const response = await pgClient.query(
        "UPDATE Empleado SET nombre = $1, salario = $2, fecha_nacimiento = $3, fecha_ingreso = $4, id_cargo = $5, id_sucursal = $6 WHERE codigo = $7",
        [employee.nombre, employee.salario, employee.fecha_nacimiento, employee.fecha_ingreso, employee.id_cargo, employee.id_sucursal, id]
    );
    return response;
}

const deleteEmployee = async (id) => {
    const response = await pgClient.query(
        "DELETE FROM Empleado WHERE codigo = $1",
        [id]
    );
    return response;
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    getEmployeeByUsername,
    createEmployee,
    updateEmployee,
    deleteEmployee
};