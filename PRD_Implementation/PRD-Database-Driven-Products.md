# Product Requirement Document (PRD)
## Database-Driven Products, Categories, Deals & Coupons

### Overview
Currently, the e-commerce application has a mixed approach to data management:

- **Products**: While there is a database model for products, many frontend components still use hardcoded product data for development and testing.
- **Categories**: Entirely hardcoded in the frontend with no database representation.
- **Deals/Promotions**: Hardcoded promotional content in the frontend.
- **Coupons**: Hardcoded coupon codes and validation logic in the CartContext.

This PRD outlines the implementation plan to move all of these data elements to the database for better maintenance, scalability, and administrative control.

### Objective
Create a more maintainable and dynamic e-commerce platform by storing all product-related data (products, categories, deals, and coupons) in the database, accessible through dedicated API endpoints.

### Requirements

#### 1. Database Schema Updates

**Categories Table**
```
- id: Primary key
- name: String, required
- icon: String (emoji or icon class)
- bgColor: String (CSS class or color code)
- active: Boolean (default: true)
- createdAt: Date
- updatedAt: Date
```

**Deals/Promotions Table**
```
- id: Primary key
- title: String, required
- description: String
- bannerText: String
- imageUrl: String
- targetUrl: String (e.g., '/products?sale=true')
- discountPercentage: Number (optional)
- startDate: Date
- endDate: Date
- active: Boolean (default: true)
- position: Number (for ordering on homepage)
- createdAt: Date
- updatedAt: Date
```

**Coupons Table**
```
- id: Primary key
- code: String, required, unique
- discount: Number, required
- type: String (enum: 'percentage', 'fixed')
- maxDiscount: Number (optional, for percentage discounts)
- startDate: Date
- endDate: Date
- active: Boolean (default: true)
- usageLimit: Number (optional, max uses per coupon)
- minimumPurchase: Number (optional, minimum order value)
- createdAt: Date
- updatedAt: Date
```

**Products Table Updates**
```
- Add categoryId: Foreign key referencing Categories
- Add isOnSale: Boolean
- Add salePrice: Number (optional)
- Add newArrival: Boolean
```

#### 2. Backend API Endpoints

**Categories Endpoints**
- GET /api/categories - List all active categories
- GET /api/categories/:id - Get category details
- POST /api/categories - Create new category (admin)
- PUT /api/categories/:id - Update category (admin)
- DELETE /api/categories/:id - Delete/deactivate category (admin)

**Deals Endpoints**
- GET /api/deals - List all active deals
- GET /api/deals/:id - Get deal details
- POST /api/deals - Create new deal (admin)
- PUT /api/deals/:id - Update deal (admin)
- DELETE /api/deals/:id - Delete/deactivate deal (admin)

**Coupons Endpoints**
- GET /api/coupons - List all active coupons (admin)
- GET /api/coupons/validate/:code - Validate a coupon code (public)
- POST /api/coupons - Create new coupon (admin)
- PUT /api/coupons/:id - Update coupon (admin)
- DELETE /api/coupons/:id - Delete/deactivate coupon (admin)

**Products Endpoints Updates**
- Update GET /api/products to include filter by categoryId
- Update GET /api/products to include filter by isOnSale
- Update GET /api/products to include filter by newArrival

#### 3. Frontend Updates

**Home Page**
- Update to fetch categories from API
- Update to fetch promotional deals from API

**Products Page**
- Update category filters to use database categories
- Add filtering by deals (on sale, new arrivals)

**Cart Context**
- Update coupon validation to use the API endpoint

**Checkout Process**
- Update to handle coupon validation via API

### Technical Considerations
1. Implement proper error handling on API endpoints
2. Add appropriate validation for all data models
3. Consider performance implications of additional database queries
4. Ensure proper indexing on database tables

### Success Criteria
1. All product-related data is stored in the database
2. Frontend displays dynamic data from the database
3. Admin can manage categories, deals, and coupons
4. System maintains backward compatibility with existing features 