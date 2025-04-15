# Implementation Plan: Database-Driven Products

This implementation plan outlines the steps required to move categories, deals, and coupons from hardcoded frontend values to database-driven entities, as well as ensuring consistent use of database-driven products throughout the frontend.

## Phase 1: Database Schema Updates

- [ ] Create Category model in backend/src/models/category.model.js
  - [ ] Define fields: id, name, icon, bgColor, active, timestamps
  - [ ] Add validation rules

- [ ] Create Deal/Promotion model in backend/src/models/deal.model.js
  - [ ] Define fields: id, title, description, bannerText, imageUrl, targetUrl, discountPercentage, startDate, endDate, active, position, timestamps
  - [ ] Add validation rules

- [ ] Create Coupon model in backend/src/models/coupon.model.js
  - [ ] Define fields: id, code, discount, type, maxDiscount, startDate, endDate, active, usageLimit, minimumPurchase, timestamps
  - [ ] Add validation rules

- [ ] Update Product model in backend/src/models/product.model.js
  - [ ] Add categoryId as foreign key to Category
  - [ ] Add isOnSale, salePrice, and newArrival fields
  - [ ] Modify validation rules as needed

- [ ] Update DB associations in backend/src/models/index.js
  - [ ] Create one-to-many relationship between Category and Product

## Phase 2: API Implementation

- [ ] Create Categories controller in backend/src/controllers/category.controller.js
  - [ ] Implement GET /api/categories endpoint
  - [ ] Implement GET /api/categories/:id endpoint
  - [ ] Implement POST /api/categories endpoint (admin)
  - [ ] Implement PUT /api/categories/:id endpoint (admin)
  - [ ] Implement DELETE /api/categories/:id endpoint (admin)

- [ ] Create Deals controller in backend/src/controllers/deal.controller.js
  - [ ] Implement GET /api/deals endpoint
  - [ ] Implement GET /api/deals/:id endpoint
  - [ ] Implement POST /api/deals endpoint (admin)
  - [ ] Implement PUT /api/deals/:id endpoint (admin)
  - [ ] Implement DELETE /api/deals/:id endpoint (admin)

- [ ] Create Coupons controller in backend/src/controllers/coupon.controller.js
  - [ ] Implement GET /api/coupons endpoint (admin)
  - [ ] Implement GET /api/coupons/validate/:code endpoint
  - [ ] Implement POST /api/coupons endpoint (admin)
  - [ ] Implement PUT /api/coupons/:id endpoint (admin)
  - [ ] Implement DELETE /api/coupons/:id endpoint (admin)

- [ ] Update Products controller in backend/src/controllers/product.controller.js
  - [ ] Add filtering by categoryId
  - [ ] Add filtering by isOnSale
  - [ ] Add filtering by newArrival

- [ ] Create routes in backend/src/routes/
  - [ ] Define category.routes.js
  - [ ] Define deal.routes.js
  - [ ] Define coupon.routes.js
  - [ ] Update product.routes.js as needed
  - [ ] Register all routes in index.js

## Phase 3: Seed Data Migration

- [ ] Update database seeder in backend/src/utils/dbSeeder.js
  - [ ] Create seed data for categories from existing frontend data
  - [ ] Create seed data for deals/promotions from existing frontend data
  - [ ] Create seed data for coupons from existing frontend data
  - [ ] Update product seed data to use category IDs

- [ ] Ensure backwards compatibility
  - [ ] Maintain existing API response format
  - [ ] Add data migration script if needed

## Phase 4: Frontend Integration

- [ ] Replace hardcoded product data in frontend components
  - [ ] Identify all components using mock product data
  - [ ] Update components to fetch from API instead of using hardcoded data
  - [ ] Add loading states and error handling

- [ ] Update HomePage component
  - [ ] Fetch categories from API instead of hardcoded array
  - [ ] Fetch promotional deals from API instead of hardcoded content

- [ ] Update ProductsPage component
  - [ ] Fetch categories from API for filters
  - [ ] Update filtering logic to use API query parameters

- [ ] Update CartContext
  - [ ] Replace hardcoded coupon validation with API call
  - [ ] Update coupon application logic as needed

- [ ] Update CheckoutPage
  - [ ] Modify coupon application to use the API validation

## Phase 5: Testing & Optimization

- [ ] Write unit tests for new models and controllers
  - [ ] Test category CRUD operations
  - [ ] Test deal CRUD operations
  - [ ] Test coupon CRUD operations
  - [ ] Test updated product filtering

- [ ] Perform integration testing
  - [ ] Test frontend and backend integration
  - [ ] Verify data flow from database to UI

- [ ] Optimize performance
  - [ ] Add appropriate indexing to database tables
  - [ ] Implement API response caching where appropriate
  - [ ] Optimize frontend data fetching (pagination, etc.)

- [ ] Security audit
  - [ ] Ensure proper permission checks on admin endpoints
  - [ ] Verify input validation on all endpoints
  - [ ] Check for any SQL injection vulnerabilities

## Final Deliverables

- [ ] Updated database schema with new tables
- [ ] Fully functional API endpoints for all entities
- [ ] Frontend updated to use dynamic data from the API
- [ ] Documentation of new endpoints and models
- [ ] Test coverage for new functionality 