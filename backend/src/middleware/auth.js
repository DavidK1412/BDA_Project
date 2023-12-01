const bcrypt = require('bcrypt');
const jwt = require('./jwt');
const userService = require('../services/user.service');
const employeeService = require('../services/employee.service');

const login = async(username, password) => {
    const user = await userService.getUserByUsername(username);
    const employee = await employeeService.getEmployeeByUsername(username);

    if (!user || !employee) {
        return false;
    }
    if (await bcrypt.compare(password, user.contrasena)){
        console.log(employee)
        const token = jwt.generateToken({
            id: user.id,
            role: employee.id_cargo,
            employeeCode: employee.codigo
        });
        return { token: token };
    }
    return false;
}

const create = async(userId, username, employeeCode, password) => {
    const cryptedPassword = await bcrypt.hash(password, 10, (err, hash) => { 
        if (err) {
            return false;
        }
        userService.createUser(userId, username, hash, employeeCode);
    });
    return true;
}

const changePassword = async(username, password) => {
    const user = await userService.getUserByUsername(username);
    if (!user) {
        return false;
    }
    const cryptedPassword = await bcrypt.hash(password, 10, (err, hash) => { 
        if (err) {
            return false;
        }
        userService.changePassword(username, hash);
    });
    return true;
}

module.exports = {login, create, changePassword};