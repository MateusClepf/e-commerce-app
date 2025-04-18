# Implementation Plan: Database-Driven Products

This implementation plan outlines the steps required to move categories, deals, and coupons from hardcoded frontend values to database-driven entities, as well as ensuring consistent use of database-driven products throughout the frontend.

## Phase 1: Database Schema Updates ✅

- [x] Create Category model in backend/src/models/category.model.js
  - [x] Define fields: id, name, icon, bgColor, active, timestamps
  - [x] Add validation rules

- [x] Create Deal/Promotion model in backend/src/models/deal.model.js
  - [x] Define fields: id, title, description, bannerText, imageUrl, targetUrl, discountPercentage, startDate, endDate, active, position, timestamps
  - [x] Add validation rules

- [x] Create Coupon model in backend/src/models/coupon.model.js
  - [x] Define fields: id, code, discount, type, maxDiscount, startDate, endDate, active, usageLimit, minimumPurchase, timestamps
  - [x] Add validation rules

- [x] Update Product model in backend/src/models/product.model.js
  - [x] Add categoryId as foreign key to Category
  - [x] Add isOnSale, salePrice, and newArrival fields
  - [x] Modify validation rules as needed

- [x] Update DB associations in backend/src/models/index.js
  - [x] Create one-to-many relationship between Category and Product

## Phase 2: API Implementation ✅

- [x] Create Categories controller in backend/src/controllers/category.controller.js
  - [x] Implement GET /api/categories endpoint
  - [x] Implement GET /api/categories/:id endpoint
  - [x] Implement POST /api/categories endpoint (admin)
  - [x] Implement PUT /api/categories/:id endpoint (admin)
  - [x] Implement DELETE /api/categories/:id endpoint (admin)

- [x] Create Deals controller in backend/src/controllers/deal.controller.js
  - [x] Implement GET /api/deals endpoint
  - [x] Implement GET /api/deals/:id endpoint
  - [x] Implement POST /api/deals endpoint (admin)
  - [x] Implement PUT /api/deals/:id endpoint (admin)
  - [x] Implement DELETE /api/deals/:id endpoint (admin)

- [x] Create Coupons controller in backend/src/controllers/coupon.controller.js
  - [x] Implement GET /api/coupons endpoint (admin)
  - [x] Implement GET /api/coupons/validate/:code endpoint
  - [x] Implement POST /api/coupons endpoint (admin)
  - [x] Implement PUT /api/coupons/:id endpoint (admin)
  - [x] Implement DELETE /api/coupons/:id endpoint (admin)

- [x] Update Products controller in backend/src/controllers/product.controller.js
  - [x] Add filtering by categoryId
  - [x] Add filtering by isOnSale
  - [x] Add filtering by newArrival

- [x] Create routes in backend/src/routes/
  - [x] Define category.routes.js
  - [x] Define deal.routes.js
  - [x] Define coupon.routes.js
  - [x] Update product.routes.js as needed
  - [x] Register all routes in index.js

## Phase 3: Seed Data Migration ✅

- [x] Update database seeder in backend/src/utils/dbSeeder.js
  - [x] Create seed data for categories from existing frontend data
  - [x] Create seed data for deals/promotions from existing frontend data
  - [x] Create seed data for coupons from existing frontend data
  - [x] Update product seed data to use category IDs

- [x] Ensure backwards compatibility
  - [x] Maintain existing API response format
  - [x] Add data migration script if needed

## Phase 4: Frontend Integration ✅

- [x] Replace hardcoded product data in frontend components
  - [x] Identify all components using mock product data
  - [x] Update components to fetch from API instead of using hardcoded data
  - [x] Add loading states and error handling

- [x] Update HomePage component
  - [x] Fetch categories from API instead of hardcoded array
  - [x] Fetch promotional deals from API instead of hardcoded content

- [x] Update ProductsPage component
  - [x] Fetch categories from API for filters
  - [x] Update filtering logic to use API query parameters

- [x] Update CartContext
  - [x] Replace hardcoded coupon validation with API call
  - [x] Update coupon application logic as needed

- [x] Update CheckoutPage
  - [x] Modify coupon application to use the API validation

## Phase 5: Testing & Optimization ✅

- [x] Write unit tests for new models and controllers
  - [x] Test category CRUD operations
  - [x] Test deal CRUD operations
  - [x] Test coupon CRUD operations
  - [x] Test updated product filtering

- [x] Perform integration testing
  - [x] Test frontend and backend integration
  - [x] Verify data flow from database to UI

- [x] Optimize performance
  - [x] Add appropriate indexing to database tables
  - [x] Implement API response caching where appropriate
  - [x] Optimize frontend data fetching (pagination, etc.)

- [x] Security audit
  - [x] Ensure proper permission checks on admin endpoints
  - [x] Verify input validation on all endpoints
  - [x] Check for any SQL injection vulnerabilities

## Final Deliverables ✅

- [x] Updated database schema with new tables
- [x] Fully functional API endpoints for all entities
- [x] Frontend updated to use dynamic data from the API
- [x] Documentation of new endpoints and models
- [x] Test coverage for new functionality 