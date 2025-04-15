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
├── PRD&Implementation/    # Documentation
│   ├── UX-Redesign-PRD.md # Product Requirements Document
│   └── UX-Redesign-Implementation-Plan.md # Implementation Plan
```

## UX Redesign Project

The application has undergone a complete frontend redesign to provide a more modern and intuitive user experience.

### Implementation Progress

The UX redesign implementation is based on the PRD (Product Requirements Document) and Implementation Plan located in the `PRD&Implementation` directory.

Completed phases:
- ✅ Phase 1: Setup & Foundation - Tailwind CSS, React Icons, Framer Motion integration
- ✅ Phase 2: Core Design System Components - Buttons, forms, cards, modals, etc.
- ✅ Phase 3: Layout Components - Header/navigation, footer redesign
- ✅ Phase 4: Page Redesigns - Home, Product Listings, Product Detail, Cart, Checkout
- ✅ Phase 5: Animations & Interactions - Page transitions, micro-interactions, animations

Next phases:
- Phase 6: Testing & Optimization
- Phase 7: Finalization

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

## License

This project is licensed under the MIT License