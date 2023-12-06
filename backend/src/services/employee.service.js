const pgClient = require("../config/db.config");
const branchService = require("./branch.service");

const getCellphoneById = async (id) => {
    const response = await pgClient.query(
        "SELECT * FROM telefono_empleado WHERE codigo_empleado = $1", [id]
    )
    return response.rows;
}

const createCellphone = async (id, cellphone) => {
    const response = await pgClient.query(
        "INSERT INTO telefono_empleado (codigo_empleado, numero) VALUES ($1, $2)", [id, cellphone]
    )
    return response;
}

const deleteCellphone = async (id, cellphone) => {
    const response = await pgClient.query(
        "DELETE FROM telefono_empleado WHERE codigo_empleado = $1 AND numero = $2", [id, cellphone]
    )
    return response;
}

const getAllEmployees = async () => {
    const response = await pgClient.query("SELECT * FROM Empleado");
    // add branch to each employee
    for (let i = 0; i < response.rows.length; i++) {
        const branch = await branchService.getBranchById(response.rows[i].id_sucursal);
        // arregla formato de fecha_nacimiento y fecha_ingreso
        response.rows[i].fecha_nacimiento = response.rows[i].fecha_nacimiento.toISOString().split('T')[0];
        response.rows[i].fecha_ingreso = response.rows[i].fecha_ingreso.toISOString().split('T')[0];
        response.rows[i].sucursal = branch[0];
    }
    return response.rows;
};

const getEmployeeById = async (id) => {
    console.log(id);
    const response = await pgClient.query("SELECT * FROM Empleado WHERE codigo = $1", [id]);
    const employee = response.rows[0];
    const branch = await branchService.getBranchById(employee.id_sucursal);
    const cellphone = await getCellphoneById(id);
    employee.sucursal = branch[0];
    employee.telefonos = cellphone;
    return employee;
}

const getEmployeeByUsername = async (username) => {
    const response = await pgClient.query(
        "SELECT * FROM Empleados_Username WHERE usuario = $1", [username] 
    );
    return response.rows[0];
}

const getEmployeeByBranch = async (id) => {
    const response = await pgClient.query(
        "SELECT * FROM Empleado WHERE id_sucursal = $1", [id]
    );
    for (let i = 0; i < response.rows.length; i++) {
        const branch = await branchService.getBranchById(response.rows[i].id_sucursal);
        // arregla formato de fecha_nacimiento y fecha_ingreso
        response.rows[i].fecha_nacimiento = response.rows[i].fecha_nacimiento.toISOString().split('T')[0];
        response.rows[i].fecha_ingreso = response.rows[i].fecha_ingreso.toISOString().split('T')[0];
        response.rows[i].sucursal = branch[0];
    }
    return response.rows;
}

const createClient = async (client) => {
    const { cedula, nombre, id_ciudad, id_sucursal } = client;
    // Obtiene fecha actual en formato YYYY-MM-DD
    const date = new Date().toISOString().split('T')[0];
    const response = await pgClient.query(
        "INSERT INTO cliente (cedula, nombre, id_ciudad, fecha_ingreso) VALUES ($1, $2, $3, $4)", [cedula, nombre, id_ciudad, date]
    )
    const { telefonos } = client;
    if (telefonos.length > 0 && response.rowCount > 0) {
        telefonos.forEach(async (telefono) => {
            await pgClient.query(
                "INSERT INTO telefono_cliente (cedula_cliente, numero) VALUES ($1, $2)", [cedula, telefono]
            )
        });
    }
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
    deleteEmployee,
    getCellphoneById,
    createCellphone,
    deleteCellphone,
    getEmployeeByBranch
};
