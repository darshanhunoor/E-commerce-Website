# Quick Start Guide

Get your MERN E-Commerce application running in 5 minutes!

## Prerequisites

- Node.js v16+ and npm
- MongoDB (local or MongoDB Atlas)
- Git
- Code editor (VS Code recommended)

## Step 1: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Configure MongoDB
# Edit .env file (already created)
# By default uses: mongodb://localhost:27017/ecommerce

# Start server
npm run dev
```

✅ Backend running on http://localhost:5000

## Step 2: Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend running on http://localhost:5173

## Step 3: Test the Application

1. **Open browser:** http://localhost:5173
2. **Register Account:** Click "Register" button
3. **Login:** Use your credentials
4. **Browse Products:** View all products on home page
5. **Add to Cart:** Click "Add to Cart" on any product
6. **View Cart:** Click the cart icon in navbar
7. **Checkout:** Proceed to checkout page
8. **Admin Dashboard:** Login with admin account and visit /admin

## Sample Data

To add sample products:

1. MongoDB should be running
2. Connect to your database using MongoDB Compass
3. Create database: `ecommerce`
4. Add sample documents to `products` collection:

```json
{
  "name": "Laptop",
  "description": "High-performance laptop for work and gaming",
  "price": 1299.99,
  "category": "Electronics",
  "stock": 10,
  "image": "https://via.placeholder.com/300",
  "rating": 4.5
}
```

## Create Admin Account

1. Register normally
2. Open MongoDB and find your user
3. Change `role` field from `"user"` to `"admin"`
4. Now you can access admin dashboard at `/admin`

## Common Commands

### Backend
```bash
npm run dev      # Development server
npm start        # Production server
npm install      # Install dependencies
```

### Frontend
```bash
npm run dev      # Development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## API Testing

Use Postman or Insomnia to test API:

### Register User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get All Products
```
GET http://localhost:5000/api/products
```

### Get Product by ID
```
GET http://localhost:5000/api/products/{productId}
```

## Troubleshooting

### Port Already in Use
```bash
# Kill the process using the port
# Windows: netstat -ano | findstr :5000
# Replace 5000 with your port number
```

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in .env
- Verify credentials if using MongoDB Atlas

### CORS Error
- Backend and frontend must run on different ports
- Backend: 5000, Frontend: 5173
- Check CORS configuration in server.js

### Blank Page
- Check browser console for errors
- Check terminal for API errors
- Ensure backend is running
- Clear browser cache and reload

## File Structure Quick Reference

```
backend/
├── server.js           ← Main server file
├── .env                ← Configuration
├── models/             ← Database schemas
├── routes/             ← API endpoints
├── controllers/        ← Business logic
└── middleware/         ← Auth & error handling

frontend/
├── src/
│   ├── App.jsx         ← Main component
│   ├── pages/          ← Page components
│   ├── components/     ← Reusable components
│   ├── api/            ← API calls
│   └── context/        ← State management
├── index.html          ← HTML entry point
└── vite.config.js      ← Vite configuration
```

## Next Steps

1. **Customize:** Update logo, colors, and branding
2. **Add Products:** Add your products to the database
3. **Payment:** Integrate Stripe or PayPal
4. **Deploy:** Follow DEPLOYMENT.md guide
5. **Scale:** Add more features as needed

## Need Help?

- Check [README.md](README.md) for detailed documentation
- Review [DEPLOYMENT.md](DEPLOYMENT.md) for production setup
- Check console logs for error messages
- Look at controller files for API logic

---

**You're all set! Happy building! 🚀**
