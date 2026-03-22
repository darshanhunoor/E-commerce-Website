// Order Model - Stores order information
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        productName: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      name: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      country: String,
      postcode: String,
    },
    paymentInfo: {
      method: {
        type: String,
        enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer'],
        default: 'credit_card',
      },
      status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
      },
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
