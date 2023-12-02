const employeeService = require('../services/employee.service');

const getAllEmployees = async (req, res) => {
    const employees = await employeeService.getAllEmployees();
    return res.status(200).json(employees);
}

const getEmployeeById = async (req, res) => {
    const id = req.params.id;
    const employee = await employeeService.getEmployeeById(id);
    return res.status(200).json(employee);
}

const createEmployee = async (req, res) => {
    const employee = req.body;
    const response = await employeeService.createEmployee(employee);
    return res.status(200).json(response);
}

const updateEmployee = async (req, res) => {
    const id = req.params.id;
    const employee = req.body;
    const response = await employeeService.updateEmployee(id, employee);
    return res.status(200).json(response);
}

const deleteEmployee = async (req, res) => {
    const id = req.params.id;
    const response = await employeeService.deleteEmployee(id);
    return res.status(200).json(response);
}

const deleteCellphone = async (req, res) => {
    const id = req.params.id;
    const cellphone = req.params.cellphone;
    const response = await employeeService.deleteCellphone(id, cellphone);
    return res.status(200).json(response);
}

const addCellphone = async (req, res) => {
    const id = req.params.id;
    const cellphone = req.body.telefono;
    const response = await employeeService.createCellphone(id, cellphone);
    return res.status(200).json(response);
}

const getEmployeeByBranch = async (req, res) => {
    console.log("getEmployeeByBranch");
    const id = req.params.id;
    const employees = await employeeService.getEmployeeByBranch(id);
    return res.status(200).json(employees);
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    deleteCellphone,
    addCellphone,
    getEmployeeByBranch
};