/**
 * Script to generate OpenAPI/Swagger documentation
 * 
 * This script generates a YAML file containing the OpenAPI specification
 * based on JSDoc annotations in the codebase.
 */

const swaggerAutogen = require('swagger-autogen')();
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

// Create docs directory if it doesn't exist
const docsDir = path.join(__dirname, '../docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

// Read components from YAML file
let components = {};
const componentsPath = path.join(__dirname, '../docs/components.yaml');
if (fs.existsSync(componentsPath)) {
  const yamlContent = fs.readFileSync(componentsPath, 'utf8');
  components = YAML.parse(yamlContent);
}

// Define API documentation
const doc = {
  info: {
    title: 'E-Commerce API',
    description: 'API Documentation for the E-Commerce Application',
    version: '1.0.0',
    contact: {
      name: 'API Support',
      email: 'support@example.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  host: process.env.NODE_ENV === 'production' ? 'your-production-domain.com' : 'localhost:3001',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  },
  components: components || {}
};

// Output file paths
const jsonOutputPath = path.join(__dirname, '../docs/openapi.json');
const yamlOutputPath = path.join(__dirname, '../docs/openapi.yaml');

// Find route files that exist
const possibleRouteFiles = [
  path.join(__dirname, '../src/routes/auth.routes.js'),
  path.join(__dirname, '../src/routes/product.routes.js'),
  path.join(__dirname, '../src/routes/user.routes.js'),
  path.join(__dirname, '../src/routes/order.routes.js'),
  path.join(__dirname, '../src/routes/cart.routes.js'),
  path.join(__dirname, '../src/routes/category.routes.js'),
  path.join(__dirname, '../src/routes/deal.routes.js'),
  path.join(__dirname, '../src/routes/coupon.routes.js')
];

// Filter to only include files that exist
const routeFiles = possibleRouteFiles.filter(file => fs.existsSync(file));

if (routeFiles.length === 0) {
  console.error('No route files found! Unable to generate OpenAPI specification.');
  process.exit(1);
}

console.log('Found route files:', routeFiles);

// Generate OpenAPI document
swaggerAutogen(jsonOutputPath, routeFiles, doc)
  .then(() => {
    console.log(`JSON OpenAPI specification generated at ${jsonOutputPath}`);
    
    try {
      // Read the generated JSON
      const jsonContent = fs.readFileSync(jsonOutputPath, 'utf8');
      const jsonData = JSON.parse(jsonContent);
      
      // Convert to YAML and write to file
      const yamlContent = YAML.stringify(jsonData);
      fs.writeFileSync(yamlOutputPath, yamlContent, 'utf8');
      
      console.log(`YAML OpenAPI specification generated at ${yamlOutputPath}`);
    } catch (err) {
      console.error('Error converting JSON to YAML:', err);
      // Still return success as the JSON was generated
    }
  })
  .catch((err) => {
    console.error('Error generating OpenAPI schema:', err);
    process.exit(1);
  }); 