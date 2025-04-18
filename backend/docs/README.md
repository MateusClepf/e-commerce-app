# E-Commerce API Documentation

This directory contains the OpenAPI specifications for the E-Commerce application.

## Files

- `openapi.yaml` - Main OpenAPI specification file that imports components and paths
- `components.yaml` - Contains schema definitions for all data models
- `paths.yaml` - Contains API endpoint definitions

## Usage

### Viewing the Documentation

You can use tools like Swagger UI or Redoc to view this documentation:

```bash
# Using Swagger UI
npx swagger-ui-express -p 8080 openapi.yaml

# Or using Redoc
npx redoc-cli serve openapi.yaml
```

### Validation

You can validate the OpenAPI specification using:

```bash
npx swagger-cli validate openapi.yaml
```

## API Overview

This API provides endpoints for:

- User authentication (registration, login)
- Product management (CRUD operations)
- User profile management
- Order processing
- Shopping cart operations

All authenticated endpoints require a JWT token which should be included in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
``` 