const authMiddleware = require('../middleware/auth');
const jwtMiddleware = require('../middleware/jwt');
const employeeService = require('../services/employee.service');
const userService = require('../services/user.service');

const logIn = async (req, res) => {
    const { username, password } = req.body;
    const token = await authMiddleware.login(username, password);
    if (token) {
        return res.status(200).json(token);
    }
    return res.status(401).json({"message": "Invalid username or password"});
};

const signUp = async (req, res) => {
    const { userId, username, employeeCode , password } = req.body;
    const bearerToken = req.headers.authorization;
    if (jwtMiddleware.decodeToken(bearerToken).role !== 0){
        return res.status(401).json({"message": "Unauthorized"});
    }
    // validate if employee exists
    const employee = await employeeService.getEmployeeById(employeeCode);
    const validation = await userService.getUserByEmployeeId(employeeCode);
    const user = await userService.getUserByUsername(username);
    if (!employee) {
        return res.status(401).json({"message": "Employee does not exist"});
    }
    if (validation || user) {
        return res.status(401).json({"message": "User already exists"});
    }

    if (!await authMiddleware.create(userId, username, employeeCode, password)) {
        return res.status(401).json({"message": "Error creating user"});
    }
    return res.status(200).json({"message": "User created"});
};

const verifyToken = async (req, res) => {
    const { token } = req.body;
    const decodedToken = await jwtMiddleware.verifyToken(token);
    if (decodedToken) {
        return res.status(200).json(decodedToken);
    }
    return res.status(401).json({"message": "Invalid token"});
};

const changePassword = async (req, res) => {
    const { username, password } = req.body;
    const bearerToken = req.headers.authorization;
    if (jwtMiddleware.decodeToken(bearerToken).role !== 0){
        return res.status(401).json({"message": "Unauthorized"});
    }
    if (!await authMiddleware.changePassword(username, password)) {
        return res.status(400).json({"message": "Error changing password"});
    }
    return res.status(200).json({"message": "Password changed"});
}

module.exports = { 
    logIn,
    verifyToken,
    signUp,
    changePassword
};