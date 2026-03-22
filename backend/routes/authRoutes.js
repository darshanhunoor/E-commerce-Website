// Authentication routes
const express = require('express');
const authMiddleware = require('../middleware/auth');
const { register, login, getCurrentUser } = require('../controllers/authController');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;
