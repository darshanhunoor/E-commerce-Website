// User routes
const express = require('express');
const authMiddleware = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getDashboardStats,
} = require('../controllers/userController');

const router = express.Router();

// User routes
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);

// Admin routes
router.get('/admin/all-users', authMiddleware, authorize('admin'), getAllUsers);
router.get('/admin/stats', authMiddleware, authorize('admin'), getDashboardStats);

module.exports = router;
