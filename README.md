# E-Commerce Application

A simple yet functional e-commerce application built with Node.js, Express, React, and PostgreSQL, all containerized with Docker.

## Features

- **Product Browsing**: View all products or filter by category.
- **Product Details**: View detailed information about products.
- **Shopping Cart**: Add products to cart, update quantities, and remove items.
- **User Authentication**: Register, login, and profile management.
- **Checkout**: Complete purchases as a guest or authenticated user.
- **Order Management**: View order history for authenticated users.
- **Modern UI/UX**: Redesigned interface with animations, micro-interactions, and smooth transitions.

## Tech Stack

- **Frontend**: React, React Router, CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT
- **Containerization**: Docker & Docker Compose
- **UI Libraries**: Tailwind CSS, React Icons, Framer Motion

## Project Structure

```
e-commerce/
├── backend/               # Node.js Express backend
│   ├── config/            # Configuration files
│   ├── docs/              # API documentation and database schema
│   ├── src/               # Source code
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Sequelize models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utility functions
├── frontend/              # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── context/       # Context API for state
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Images, fonts, etc.
├── docker/                # Docker configuration
│   ├── docker-compose.yml # Docker Compose configuration
│   ├── Dockerfile.frontend # Frontend Dockerfile
│   └── Dockerfile.backend # Backend Dockerfile
```

## Documentation

All project documentation is available in the repository:

- **API Documentation**: 
  - OpenAPI specification in [backend/docs/openapi.yaml](backend/docs/openapi.yaml)
  - Interactive documentation when running the server at http://localhost:5000/api-docs
  - See [backend/docs/README.md](backend/docs/README.md) for more information on the API documentation
- **Database Schema**: Database structure and relationships in [backend/docs/DATABASE_SCHEMA.md](backend/docs/DATABASE_SCHEMA.md)
- **Security**: Security practices and implementation details in [backend/SECURITY.md](backend/SECURITY.md)

## Getting Started

### Prerequisites

- Docker and Docker Compose

### Running the Application

1. Clone the repository

```bash
git clone https://github.com/yourusername/e-commerce.git
cd e-commerce
```

2. Start the application with Docker Compose

```bash
docker-compose -f docker/docker-compose.yml up
```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Development Setup

For local development without Docker:

1. Setup the backend:

```bash
cd backend
npm install
npm run dev
```

2. Setup the frontend:

```bash
cd frontend
npm install
npm start
```

### Rebuilding Docker Images After Changes

When you make changes to the code, you'll need to rebuild the Docker images to see those changes in the containerized application:

1. For minor changes to the frontend or backend:

```bash
docker-compose -f docker/docker-compose.yml up --build
```

2. For more significant changes or if you're experiencing caching issues:

```bash
# Stop any running containers
docker-compose -f docker/docker-compose.yml down

# Remove existing images to ensure a clean build
docker rmi e-commerce-app_frontend e-commerce-app_backend

# Rebuild and start containers
docker-compose -f docker/docker-compose.yml up --build
```

3. To rebuild only a specific service (e.g., just the frontend):

```bash
docker-compose -f docker/docker-compose.yml build frontend
docker-compose -f docker/docker-compose.yml up
```

Note: If you've made changes to dependencies (package.json), clear the node_modules volume before rebuilding:

```bash
docker-compose -f docker/docker-compose.yml down -v
```

## API Endpoints

The API provides endpoints for products, authentication, users, orders, and shopping cart functionality. 

For comprehensive documentation on all available endpoints, request/response formats, and authentication requirements:

- See the OpenAPI specification in [backend/docs/openapi.yaml](backend/docs/openapi.yaml)
- Access the interactive Swagger UI documentation at http://localhost:5000/api-docs when running the server

Key endpoints include:

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (authenticated)

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders for the user (authenticated)
- `GET /api/orders/:id` - Get a specific order (authenticated)
- `GET /api/orders/guest/:id/:email` - Get order by ID for guest

## API Documentation

The API documentation is generated automatically using OpenAPI/Swagger:

- **Manual Generation**: Run `npm run swagger-generate` in the backend directory
- **Automatic Generation**: A pre-commit hook ensures the documentation is updated with each commit
- **CI/CD Integration**: GitHub Actions automatically updates the OpenAPI schema when changes are made to routes, controllers, or models

The documentation includes:
- Complete schema definitions for all data models
- Detailed endpoint descriptions with parameters, request bodies, and responses
- Authentication requirements for each endpoint
- Example requests and responses

To view the documentation locally:
1. Start the backend server
2. Visit http://localhost:5000/api-docs in your browser

## License

This project is licensed under the MIT License