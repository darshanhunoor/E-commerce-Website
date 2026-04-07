// Main Express server file
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const isAllowedOrigin = (origin) => allowedOrigins.some((allowedOrigin) => {
  if (allowedOrigin === origin) {
    return true;
  }

  if (!allowedOrigin.includes('*')) {
    return false;
  }

  const wildcardPattern = allowedOrigin
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\*/g, '.*');

  return new RegExp(`^${wildcardPattern}$`).test(origin);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend build (production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
}

app.use(cors({
  origin(origin, callback) {
    if (!origin || isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }

    console.warn(`Blocked CORS origin: ${origin}`);

    const corsError = new Error(`Not allowed by CORS: ${origin}`);
    corsError.status = 403;
    callback(corsError);
  },
  credentials: true,
}));

// Routes
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'E-Commerce API is running',
    health: '/api/health',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.use(['/api/auth', '/api/orders', '/api/users'], (req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
    return;
  }

  res.status(503).json({
    message: 'Database unavailable. The API is running in limited mode until MongoDB is reachable.',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    message: 'Server is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// SPA Fallback - Serve index.html for unmatched routes (in production)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api/')) {
      res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    }
  });
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl,
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const databaseConnected = await connectDB();

  if (!databaseConnected) {
    console.warn('Starting API without a database connection. Protected API routes will return 503 until MongoDB is reachable.');
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
