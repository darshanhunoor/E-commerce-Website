# MERN E-Commerce Application

A full-stack e-commerce web application built with MongoDB, Express.js, React.js (Vite), and Node.js.

## Features

### User Features
- ✅ User authentication (JWT-based login/register)
- ✅ Browse products with filtering
- ✅ Product details and reviews
- ✅ Add to cart / Remove from cart
- ✅ Wishlist management
- ✅ Checkout and order placement
- ✅ User profile management
- ✅ Order history tracking

### Admin Features
- ✅ Admin dashboard with statistics
- ✅ Add/Edit/Delete products
- ✅ Manage orders (update status)
- ✅ View all users and orders
- ✅ Revenue tracking

## Tech Stack

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Context API** - State management

## Project Structure

```
E-Commerce/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   └── userRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── authorize.js
│   │   └── errorHandler.js
│   ├── config/
│   │   └── database.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProductCard.jsx
    │   │   ├── Footer.jsx
    │   │   ├── PrivateRoute.jsx
    │   │   └── AdminRoute.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── ProductDetails.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Checkout.jsx
    │   │   ├── Wishlist.jsx
    │   │   ├── Profile.jsx
    │   │   └── AdminDashboard.jsx
    │   ├── api/
    │   │   └── api.js
    │   ├── context/
    │   │   ├── AuthContext.js
    │   │   └── CartContext.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── .env
    └── package.json
```

## Installation & Setup

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Update `.env` file with your settings:
   ```
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start MongoDB** (ensure it's running):
   ```bash
   mongod
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Update `.env` file:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders/user/orders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `PUT /api/orders/:id/status` - Update order status (Admin)
- `GET /api/orders` - Get all orders (Admin)

### Users
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update profile (Protected)
- `GET /api/users/admin/all-users` - Get all users (Admin)
- `GET /api/users/admin/stats` - Get dashboard stats (Admin)

## Default Admin Account

To test admin features, you can create an admin account by:

1. Registering normally
2. Manually updating user role in MongoDB:
   ```javascript
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "admin" } }
   )
   ```

## Deployment Guide

### Deploy Backend to Render

1. Push your code to GitHub
2. Visit [Render.com](https://render.com)
3. Create a new Web Service
4. Connect your GitHub repository
5. Set environment variables:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - Your JWT secret
   - `PORT` - 10000 (Render default)
   - `FRONTEND_URL` - https://e-commerce-website-neon-seven.vercel.app

6. Set build command: `npm install`
7. Set start command: `node server.js`
8. Deploy!

### Deploy Frontend to Vercel

1. Push your frontend code to GitHub
2. Visit [Vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Set environment variables:
   - `VITE_API_URL` - Your Render backend URL

5. Deploy!

## Testing

### Test Data
You can seed the database with sample products:

1. Create a seed.js file in backend:
   ```javascript
   const mongoose = require('mongoose');
   const Product = require('./models/Product');
   
   mongoose.connect(process.env.MONGODB_URI);
   
   const products = [
     {
       name: 'Sample Product 1',
       description: 'Sample description',
       price: 29.99,
       category: 'Electronics',
       stock: 10,
     },
     // Add more products...
   ];
   
   Product.insertMany(products)
     .then(() => console.log('Products added!'))
     .catch(err => console.error(err));
   ```

2. Run: `node seed.js`

## Error Handling

- All API errors return JSON with message
- Frontend catches and displays user-friendly errors
- Authentication errors redirect to login
- Unauthorized access returns 403 status

## Security Features

- ✅ JWT token-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Role-based access control
- ✅ CORS configuration
- ✅ Protected routes
- ✅ Input validation

## Future Enhancements

- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Advanced filtering and search
- [ ] Inventory management
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard
- [ ] Multi-currency support
- [ ] Social login (Google, Facebook)
- [ ] Product recommendations

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue on GitHub.

---

**Happy Coding! 🚀**
