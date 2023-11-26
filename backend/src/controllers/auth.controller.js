const authMiddleware = require('../middleware/auth');
const jwtMiddleware = require('../middleware/jwt');

const logIn = async (req, res) => {
    const { username, password } = req.body;
    const token = await authMiddleware.login(username, password);
    if (token) {
        return res.status(200).json(token);
    }
    return res.status(401).json({"message": "Invalid username or password"});
};

const verifyToken = async (req, res) => {
    const { token } = req.body;
    const decodedToken = await jwtMiddleware.verifyToken(token);
    if (decodedToken) {
        return res.status(200).json(decodedToken);
    }
    return res.status(401).json({"message": "Invalid token"});
};

module.exports = { 
    logIn,
    verifyToken
};