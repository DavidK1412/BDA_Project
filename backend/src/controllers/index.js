const db = require('../models');

// Controller for handling user registration
exports.register = async (req, res) => {
  try {
    const user = await db.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller for handling user login
exports.login = async (req, res) => {
  try {
    const user = await db.findUser(req.body);
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }
    const token = await db.generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller for handling data retrieval
exports.getData = async (req, res) => {
  try {
    const data = await db.getData(req.user.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};