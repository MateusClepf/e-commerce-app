const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const fs = require('fs');
const YAML = require('yaml');

// Basic information about the API
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce API',
      version: '1.0.0',
      description: 'API documentation for the E-Commerce application',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  // Path to the API docs
  apis: [
    './src/routes/*.js',
    './src/models/*.js',
    './src/controllers/*.js',
    './docs/components.yaml', // For reusable components
    './docs/paths.yaml'       // For API paths
  ]
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Function to write the Swagger spec to a file
const writeSwaggerJson = () => {
  // JSON output path (for backward compatibility)
  const jsonOutputPath = path.resolve(__dirname, '../docs/openapi.json');
  
  // YAML output path (primary format)
  const yamlOutputPath = path.resolve(__dirname, '../docs/openapi.yaml');
  
  // Create the docs directory if it doesn't exist
  const docsDir = path.resolve(__dirname, '../docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  
  // Write the Swagger spec to a YAML file
  fs.writeFileSync(
    yamlOutputPath,
    YAML.stringify(swaggerSpec),
    'utf8'
  );
  
  // Also write JSON for backward compatibility
  fs.writeFileSync(
    jsonOutputPath,
    JSON.stringify(swaggerSpec, null, 2),
    'utf8'
  );
  
  console.log(`OpenAPI specification has been written to ${yamlOutputPath} and ${jsonOutputPath}`);
};

module.exports = {
  swaggerSpec,
  writeSwaggerJson
}; 