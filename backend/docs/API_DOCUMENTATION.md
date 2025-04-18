# E-Commerce API Documentation

This document provides detailed information about the API endpoints for the e-commerce application.

## Base URL

```
https://api.example.com/api
```

For local development:

```
http://localhost:3000/api
```

## Authentication

Most endpoints require authentication using JSON Web Tokens (JWT).

Include the token in the request header:

```
Authorization: Bearer <token>
```

## Response Format

All responses follow a standard format:

```json
{
  "status": "success|error",
  "message": "Description of the result",
  "data": {} // Optional data object
}
```

## Error Handling

Errors return appropriate HTTP status codes with a descriptive message:

```json
{
  "status": "error",
  "message": "Error description",
  "errors": [] // Optional array of specific errors
}
```

---

## Categories

### Get All Categories

Retrieves all categories.

```
GET /categories
```

Query Parameters:
- `active` (boolean): Filter by active status
- `name` (string): Search by name (partial match)

Response:

```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "name": "Electronics",
      "icon": "🔌",
      "bgColor": "bg-blue-100",
      "active": true,
      "createdAt": "2023-04-15T12:00:00Z",
      "updatedAt": "2023-04-15T12:00:00Z"
    },
    // More categories...
  ]
}
```

### Get Category by ID

Retrieves a specific category by ID.

```
GET /categories/:id
```

Response:

```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "name": "Electronics",
    "icon": "🔌",
    "bgColor": "bg-blue-100",
    "active": true,
    "createdAt": "2023-04-15T12:00:00Z",
    "updatedAt": "2023-04-15T12:00:00Z"
  }
}
```

### Create Category (Admin only)

Creates a new category.

```
POST /categories
```

Request Body:

```json
{
  "name": "Home Appliances",
  "icon": "🏠",
  "bgColor": "bg-green-100",
  "active": true
}
```

Response:

```json
{
  "status": "success",
  "message": "Category created successfully",
  "data": {
    "id": "uuid",
    "name": "Home Appliances",
    "icon": "🏠",
    "bgColor": "bg-green-100",
    "active": true,
    "createdAt": "2023-04-15T12:00:00Z",
    "updatedAt": "2023-04-15T12:00:00Z"
  }
}
```

### Update Category (Admin only)

Updates an existing category.

```
PUT /categories/:id
```

Request Body:

```json
{
  "name": "Updated Category Name",
  "active": false
}
```

Response:

```json
{
  "status": "success",
  "message": "Category updated successfully",
  "data": {
    "id": "uuid",
    "name": "Updated Category Name",
    "icon": "🔌",
    "bgColor": "bg-blue-100",
    "active": false,
    "createdAt": "2023-04-15T12:00:00Z",
    "updatedAt": "2023-04-15T14:30:00Z"
  }
}
```

### Delete Category (Admin only)

Deletes a category.

```
DELETE /categories/:id
```

Response:

```json
{
  "status": "success",
  "message": "Category deleted successfully"
}
```

---

## Products

### Get All Products

Retrieves all products with optional filtering.

```
GET /products
```

Query Parameters:
- `categoryId` (string): Filter by category
- `isOnSale` (boolean): Filter for products on sale
- `newArrival` (boolean): Filter for new arrivals
- `page` (number): Page number for pagination
- `limit` (number): Items per page
- `sort` (string): Sort field (e.g., "price", "name")
- `order` (string): Sort order ("asc" or "desc")

Response:

```json
{
  "status": "success",
  "data": {
    "products": [
      {
        "id": "uuid",
        "name": "Smartphone XYZ",
        "description": "High-end smartphone with amazing features",
        "price": 599.99,
        "salePrice": 499.99,
        "isOnSale": true,
        "categoryId": "uuid",
        "category": "Electronics",
        "images": ["url1", "url2"],
        "stockQuantity": 50,
        "isAvailable": true,
        "newArrival": true,
        "createdAt": "2023-04-15T12:00:00Z",
        "updatedAt": "2023-04-15T12:00:00Z"
      },
      // More products...
    ],
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "pages": 10
    }
  }
}
```

### Get Product by ID

Retrieves a specific product by ID.

```
GET /products/:id
```

Response:

```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "name": "Smartphone XYZ",
    "description": "High-end smartphone with amazing features",
    "price": 599.99,
    "salePrice": 499.99,
    "isOnSale": true,
    "categoryId": "uuid",
    "category": "Electronics",
    "images": ["url1", "url2"],
    "stockQuantity": 50,
    "isAvailable": true,
    "newArrival": true,
    "createdAt": "2023-04-15T12:00:00Z",
    "updatedAt": "2023-04-15T12:00:00Z"
  }
}
```

### Create Product (Admin only)

Creates a new product.

```
POST /products
```

Request Body:

```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "categoryId": "uuid",
  "images": ["url1", "url2"],
  "stockQuantity": 25,
  "isAvailable": true,
  "isOnSale": false,
  "newArrival": true
}
```

Response:

```json
{
  "status": "success",
  "message": "Product created successfully",
  "data": {
    "id": "uuid",
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "salePrice": null,
    "isOnSale": false,
    "categoryId": "uuid",
    "images": ["url1", "url2"],
    "stockQuantity": 25,
    "isAvailable": true,
    "newArrival": true,
    "createdAt": "2023-04-15T12:00:00Z",
    "updatedAt": "2023-04-15T12:00:00Z"
  }
}
```

### Update Product (Admin only)

Updates an existing product.

```
PUT /products/:id
```

Request Body:

```json
{
  "price": 89.99,
  "isOnSale": true,
  "salePrice": 79.99
}
```

Response:

```json
{
  "status": "success",
  "message": "Product updated successfully",
  "data": {
    "id": "uuid",
    "name": "New Product",
    "description": "Product description",
    "price": 89.99,
    "salePrice": 79.99,
    "isOnSale": true,
    "categoryId": "uuid",
    "images": ["url1", "url2"],
    "stockQuantity": 25,
    "isAvailable": true,
    "newArrival": true,
    "createdAt": "2023-04-15T12:00:00Z",
    "updatedAt": "2023-04-15T14:30:00Z"
  }
}
```

### Delete Product (Admin only)

Deletes a product.

```
DELETE /products/:id
```

Response:

```json
{
  "status": "success",
  "message": "Product deleted successfully"
}
```

---

## Deals/Promotions

### Get All Deals

Retrieves all promotional deals.

```
GET /deals
```

Query Parameters:
- `active` (boolean): Filter by active status

Response:

```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "title": "Summer Sale",
      "description": "Get up to 50% off on summer items",
      "bannerText": "SUMMER50",
      "imageUrl": "url",
      "targetUrl": "/summer-sale",
      "discountPercentage": 50,
      "startDate": "2023-06-01T00:00:00Z",
      "endDate": "2023-08-31T23:59:59Z",
      "active": true,
      "position": 1,
      "createdAt": "2023-05-15T12:00:00Z",
      "updatedAt": "2023-05-15T12:00:00Z"
    },
    // More deals...
  ]
}
```

### Get Deal by ID

Retrieves a specific deal by ID.

```
GET /deals/:id
```

Response:

```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "title": "Summer Sale",
    "description": "Get up to 50% off on summer items",
    "bannerText": "SUMMER50",
    "imageUrl": "url",
    "targetUrl": "/summer-sale",
    "discountPercentage": 50,
    "startDate": "2023-06-01T00:00:00Z",
    "endDate": "2023-08-31T23:59:59Z",
    "active": true,
    "position": 1,
    "createdAt": "2023-05-15T12:00:00Z",
    "updatedAt": "2023-05-15T12:00:00Z"
  }
}
```

### Create Deal (Admin only)

Creates a new promotional deal.

```
POST /deals
```

Request Body:

```json
{
  "title": "Flash Sale",
  "description": "24-hour flash sale on electronics",
  "bannerText": "FLASH24",
  "imageUrl": "url",
  "targetUrl": "/flash-sale",
  "discountPercentage": 30,
  "startDate": "2023-07-15T00:00:00Z",
  "endDate": "2023-07-16T00:00:00Z",
  "active": true,
  "position": 2
}
```

Response:

```json
{
  "status": "success",
  "message": "Deal created successfully",
  "data": {
    "id": "uuid",
    "title": "Flash Sale",
    "description": "24-hour flash sale on electronics",
    "bannerText": "FLASH24",
    "imageUrl": "url",
    "targetUrl": "/flash-sale",
    "discountPercentage": 30,
    "startDate": "2023-07-15T00:00:00Z",
    "endDate": "2023-07-16T00:00:00Z",
    "active": true,
    "position": 2,
    "createdAt": "2023-07-01T12:00:00Z",
    "updatedAt": "2023-07-01T12:00:00Z"
  }
}
```

### Update Deal (Admin only)

Updates an existing deal.

```
PUT /deals/:id
```

Request Body:

```json
{
  "active": false
}
```

Response:

```json
{
  "status": "success",
  "message": "Deal updated successfully",
  "data": {
    "id": "uuid",
    "title": "Flash Sale",
    "description": "24-hour flash sale on electronics",
    "bannerText": "FLASH24",
    "imageUrl": "url",
    "targetUrl": "/flash-sale",
    "discountPercentage": 30,
    "startDate": "2023-07-15T00:00:00Z",
    "endDate": "2023-07-16T00:00:00Z",
    "active": false,
    "position": 2,
    "createdAt": "2023-07-01T12:00:00Z",
    "updatedAt": "2023-07-02T14:30:00Z"
  }
}
```

### Delete Deal (Admin only)

Deletes a deal.

```
DELETE /deals/:id
```

Response:

```json
{
  "status": "success",
  "message": "Deal deleted successfully"
}
```

---

## Coupons

### Validate Coupon

Validates a coupon code.

```
GET /coupons/validate/:code
```

Response (Valid Coupon):

```json
{
  "status": "success",
  "data": {
    "valid": true,
    "coupon": {
      "id": "uuid",
      "code": "SUMMER10",
      "discount": 10.00,
      "type": "percentage",
      "maxDiscount": 50.00,
      "minimumPurchase": 100.00,
      "active": true
    }
  }
}
```

Response (Invalid Coupon):

```json
{
  "status": "error",
  "message": "Coupon not found or expired",
  "data": {
    "valid": false
  }
}
```

### Get All Coupons (Admin only)

Retrieves all coupons.

```
GET /coupons
```

Response:

```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "code": "SUMMER10",
      "discount": 10.00,
      "type": "percentage",
      "maxDiscount": 50.00,
      "startDate": "2023-06-01T00:00:00Z",
      "endDate": "2023-08-31T23:59:59Z",
      "active": true,
      "usageLimit": 1000,
      "minimumPurchase": 100.00,
      "createdAt": "2023-05-15T12:00:00Z",
      "updatedAt": "2023-05-15T12:00:00Z"
    },
    // More coupons...
  ]
}
```

### Create Coupon (Admin only)

Creates a new coupon.

```
POST /coupons
```

Request Body:

```json
{
  "code": "WELCOME20",
  "discount": 20.00,
  "type": "percentage",
  "maxDiscount": 30.00,
  "startDate": "2023-07-01T00:00:00Z",
  "endDate": "2023-12-31T23:59:59Z",
  "active": true,
  "usageLimit": 500,
  "minimumPurchase": 50.00
}
```

Response:

```json
{
  "status": "success",
  "message": "Coupon created successfully",
  "data": {
    "id": "uuid",
    "code": "WELCOME20",
    "discount": 20.00,
    "type": "percentage",
    "maxDiscount": 30.00,
    "startDate": "2023-07-01T00:00:00Z",
    "endDate": "2023-12-31T23:59:59Z",
    "active": true,
    "usageLimit": 500,
    "minimumPurchase": 50.00,
    "createdAt": "2023-06-15T12:00:00Z",
    "updatedAt": "2023-06-15T12:00:00Z"
  }
}
```

### Update Coupon (Admin only)

Updates an existing coupon.

```
PUT /coupons/:id
```

Request Body:

```json
{
  "active": false
}
```

Response:

```json
{
  "status": "success",
  "message": "Coupon updated successfully",
  "data": {
    "id": "uuid",
    "code": "WELCOME20",
    "discount": 20.00,
    "type": "percentage",
    "maxDiscount": 30.00,
    "startDate": "2023-07-01T00:00:00Z",
    "endDate": "2023-12-31T23:59:59Z",
    "active": false,
    "usageLimit": 500,
    "minimumPurchase": 50.00,
    "createdAt": "2023-06-15T12:00:00Z",
    "updatedAt": "2023-06-16T14:30:00Z"
  }
}
```

### Delete Coupon (Admin only)

Deletes a coupon.

```
DELETE /coupons/:id
```

Response:

```json
{
  "status": "success",
  "message": "Coupon deleted successfully"
}
``` 