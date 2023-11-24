const authMiddleware = require('../middleware/auth');

// Hola :)

const logIn = async (req, res) => {
    const { username, password } = req.body;
    const token = await authMiddleware.login(username, password);
    if (token) {
        return res.status(200).json(token);
    }
    return res.status(401).json({"message": "Invalid username or password"});
};

module.exports = { logIn };