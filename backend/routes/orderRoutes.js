// Order routes
const express = require('express');
const authMiddleware = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
} = require('../controllers/orderController');

const router = express.Router();

// Protected routes for users
router.post('/', authMiddleware, createOrder);
router.get('/user/orders', authMiddleware, getUserOrders);
router.get('/:id', authMiddleware, getOrderById);

// Admin routes
router.put('/:id/status', authMiddleware, authorize('admin'), updateOrderStatus);
router.get('/', authMiddleware, authorize('admin'), getAllOrders);

module.exports = router;
