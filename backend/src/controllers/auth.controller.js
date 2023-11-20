const authMiddleware = require('../middleware/auth');

const logIn = async (req, res) => {
    const { username, password } = req.body;
    const token = await authMiddleware.login(username, password);
    if (token) {
        return res.status(200).json(token);
    }
    return res.status(401).json({message: 'Unauthorized'});
};

module.exports = { logIn };