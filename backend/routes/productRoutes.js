// Product routes
const express = require('express');
const authMiddleware = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Admin routes
router.post('/', authMiddleware, authorize('admin'), createProduct);
router.put('/:id', authMiddleware, authorize('admin'), updateProduct);
router.delete('/:id', authMiddleware, authorize('admin'), deleteProduct);

module.exports = router;
