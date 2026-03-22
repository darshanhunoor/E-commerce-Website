# MERN E-Commerce Deployment Guide

Complete guide to deploy your MERN application to production.

## Table of Contents
1. [Database Setup (MongoDB Atlas)](#database-setup)
2. [Backend Deployment (Render)](#backend-deployment)
3. [Frontend Deployment (Vercel)](#frontend-deployment)
4. [Environment Configuration](#environment-configuration)
5. [Troubleshooting](#troubleshooting)

---

## Database Setup

### Using MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas Account**
   - Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account
   - Create a new project

2. **Create Cluster**
   - Click "Create" to build a new cluster
   - Choose free Shared tier
   - Select your region (closest to your audience)
   - Click "Create Cluster"

3. **Set Up Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Add your IP or "0.0.0.0/0" (allows all - not recommended for production)
   - Add comment: "Development"

4. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Enter username and password
   - Copy the password
   - Click "Add User"

5. **Get Connection String**
   - Go to "Clusters" and click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `ecommerce`

   Example:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```

---

## Backend Deployment (Render)

### Step 1: Prepare Your Code

1. **Update Backend for Production**
   - Ensure all environment variable names are correct
   - Remove any console.error calls that expose sensitive info
   - Test locally that everything works

2. **Create a Github Repository**
   ```bash
   cd E-Commerce
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/ecommerce.git
   git push -u origin main
   ```

### Step 2: Deploy on Render

1. **Sign Up on Render**
   - Visit [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub account
   - Select your repository
   - Select the `main` branch

3. **Configure Service**
   
   | Setting | Value |
   |---------|-------|
   | Name | `ecommerce-api` |
   | Environment | Node |
   | Build Command | `npm install` |
   | Start Command | `node server.js` |
   | Root Directory | `backend` |

4. **Set Environment Variables**
   Click "Add Environment Variable" for each:
   
   ```
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   JWT_SECRET = your_strong_jwt_secret_key_change_this
   PORT = 10000
   FRONTEND_URL = https://yourdomain.vercel.app
   NODE_ENV = production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for build and deployment (3-5 minutes)
   - Your API will be available at: `https://ecommerce-api.onrender.com`

---

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend Code

1. **Update Frontend Configuration**
   - In `frontend/.env`, ensure:
     ```
     VITE_API_URL=https://ecommerce-api.onrender.com/api
     ```

2. **Build Command Check**
   - In `frontend/package.json`, ensure:
     ```json
     "scripts": {
       "build": "vite build"
     }
     ```

### Step 2: Deploy on Vercel

1. **Sign Up on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**
   
   | Setting | Value |
   |---------|-------|
   | Framework Preset | Vite |
   | Root Directory | `frontend` |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |

4. **Set Environment Variables**
   - Go to "Settings" → "Environment Variables"
   - Add:
     ```
     VITE_API_URL = https://ecommerce-api.onrender.com/api
     ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build completion (2-3 minutes)
   - Your frontend will be available at: `https://yourdomain.vercel.app`

---

## Environment Configuration

### Backend (.env)
```
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=generate_a_strong_random_string_here

# Server Configuration
PORT=10000
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=https://yourdomain.vercel.app
```

### Frontend (.env)
```
VITE_API_URL=https://ecommerce-api.onrender.com/api
```

---

## Post-Deployment Checklist

- [ ] Test user registration
- [ ] Test user login
- [ ] Test product browsing
- [ ] Test adding to cart
- [ ] Test checkout
- [ ] Test admin dashboard (create admin user)
- [ ] Test order history
- [ ] Test wishlist
- [ ] Check console for errors
- [ ] Test on mobile devices
- [ ] Update database credentials (remove test data)

---

## Performance Optimization

### Backend Optimization
```javascript
// Add caching headers in server.js
app.use((req, res, next) => {
  res.header('Cache-Control', 'public, max-age=3600');
  next();
});

// Add compression
const compression = require('compression');
app.use(compression());
```

### Frontend Optimization
- Images are lazy-loaded automatically with Vite
- Tailwind CSS is tree-shaken in production
- React is minified and optimized
- Consider adding image optimization service

---

## Monitoring & Maintenance

### Render Dashboard
- Monitor application metrics
- Check build and deployment logs
- Set up email notifications for errors

### Vercel Dashboard
- Monitor deployment analytics
- Check Web Vitals
- Monitor function performance

### Database Monitoring
- Monitor MongoDB Atlas cluster
- Keep backups enabled
- Monitor storage usage

---

## Scaling for Production

### When Traffic Increases

**Backend (Render)**
- Upgrade to paid plan for better resources
- Enable auto-scaling
- Optimize database queries
- Add caching layer (Redis)

**Frontend (Vercel)**
- Consider Vercel Pro for better performance
- Enable automatic image optimization
- Use CDN for static assets

**Database (MongoDB)**
- Monitor connection pool
- Optimize indexes
- Consider upgrade to paid Atlas tier

---

## Security Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Use HTTPS for all connections
- [ ] Enable CORS only for your domain
- [ ] Set secure database user credentials
- [ ] Enable MongoDB network access restrictions
- [ ] Keep dependencies updated
- [ ] Enable automatic backups
- [ ] Use environment variables for sensitive data
- [ ] Implement rate limiting
- [ ] Add CSRF protection

---

## Troubleshooting

### Backend Not Connecting to MongoDB
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MONGODB_URI is set correctly and includes auth credentials.

### CORS Errors
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Update FRONTEND_URL in backend .env to match your Vercel domain.

### Frontend Can't Connect to Backend
```
Failed to fetch from API
```
**Solution:** Ensure VITE_API_URL in frontend .env matches your Render API URL.

### 502 Bad Gateway
**Solution:** Check Render build logs, restart service, verify start command.

### Vercel Build Fails
**Solution:** Check build logs, ensure Root Directory is set to `frontend`.

---

## Support Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [Express.js Documentation](https://expressjs.com)
- [React Documentation](https://react.dev)

---

**Congratulations! Your MERN application is now deployed! 🚀**
