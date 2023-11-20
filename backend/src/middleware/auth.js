// TODO: add bcrpt implementation, static salt
const jwt = require('./jwt');
const userService = require('../services/user.service');
const employeeService = require('../services/employee.service');

const login = async(username, password) => {
    const user = await userService.getUserByUsername(username);
    const employee = await employeeService.getEmployeeByUsername(username);

    if (!user || !employee) {
        return false;
    }
    if (user?.contrasena === password){
        const token = jwt.generateToken({
            id: user.id,
            role: employee.id_cargo
        });
        return { token: token };
    }
    return true;
}

module.exports = {login};