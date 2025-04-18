/**
 * Script to automatically generate OpenAPI/Swagger documentation
 * 
 * This script analyzes the Express routes and generates OpenAPI documentation
 * based on route structures, without requiring JSDoc annotations.
 */

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-Commerce API',
    description: 'API Documentation for E-Commerce Application',
    version: '1.0.0',
  },
  host: 'localhost:5000',
  basePath: '/api',
  schemes: ['http', 'https'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"',
    },
  },
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions: {
    User: {
      $firstName: 'John',
      $lastName: 'Doe',
      $email: 'john@example.com',
      isAdmin: false
    },
    Product: {
      $name: 'Example Product',
      $description: 'This is a sample product',
      $price: 29.99,
      imageUrl: 'https://example.com/image.jpg',
      stock: 100,
      categoryId: 1
    },
    Category: {
      $name: 'Electronics',
      description: 'Electronic devices and accessories'
    },
    Order: {
      status: 'pending',
      $total: 123.45,
      shippingAddress: {
        $street: '123 Main St',
        $city: 'Metropolis',
        $state: 'NY',
        $zipCode: '12345',
        $country: 'USA'
      }
    }
  }
};

const outputFile = './docs/swagger-autogen.json';
const endpointsFiles = [
  './src/routes/auth.routes.js',
  './src/routes/product.routes.js',
  './src/routes/category.routes.js',
  './src/routes/order.routes.js',
  './src/routes/user.routes.js',
  // Add all your route files here
];

console.log('Generating OpenAPI specification using swagger-autogen...');

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log(`OpenAPI specification successfully generated at ${outputFile}`);
  })
  .catch((error) => {
    console.error('Error generating OpenAPI specification:', error);
    process.exit(1);
  }); 