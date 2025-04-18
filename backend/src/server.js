const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const { sequelize } = require('./models');
const seedDatabase = require('./utils/dbSeeder');
const { swaggerSpec, writeSwaggerJson } = require('../config/swagger');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Import routes
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');
const orderRoutes = require('./routes/order.routes');
// Import new routes
const categoryRoutes = require('./routes/category.routes');
const dealRoutes = require('./routes/deal.routes');
const couponRoutes = require('./routes/coupon.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Documentation setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Endpoint to get the OpenAPI specification
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
// Register new routes
app.use('/api/categories', categoryRoutes);
app.use('/api/deals', dealRoutes);
app.use('/api/coupons', couponRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to E-Commerce API' });
});

const PORT = process.env.PORT || 5000;

// Database connection and server start
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync database (in development)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database synced');
      
      // Seed the database with initial data
      await seedDatabase();
    }
    
    // Generate OpenAPI specification on server start
    try {
      writeSwaggerJson();
      console.log('OpenAPI specification generated on server start');
    } catch (err) {
      console.error('Error generating OpenAPI specification:', err);
    }
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();