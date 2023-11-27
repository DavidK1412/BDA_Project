const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.logIn);
router.post('/verify', authController.verifyToken);
router.post('/signup', authController.signUp);
router.put('/change-password', authController.changePassword);

module.exports = router;