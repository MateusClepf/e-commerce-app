# Database Schema Documentation

This document provides detailed information about the database schema for the e-commerce application.

## Overview

The application uses PostgreSQL with Sequelize ORM. All tables use UUID as primary keys and include standard timestamp fields (`createdAt` and `updatedAt`).

## Entity Relationship Diagram

```
+-------------+       +-------------+       +-------------+
|   Category  |       |   Product   |       |   Review    |
+-------------+       +-------------+       +-------------+
| id          |<----->| id          |<----->| id          |
| name        |       | name        |       | productId   |
| icon        |       | description |       | userId      |
| bgColor     |       | price       |       | rating      |
| active      |       | imageUrl    |       | title       |
| createdAt   |       | category    |       | comment     |
| updatedAt   |       | categoryId  |       | createdAt   |
+-------------+       | stockQty    |       | updatedAt   |
                      | isAvailable |       +-------------+
                      | isOnSale    |
                      | salePrice   |       +-------------+
                      | newArrival  |       |    Order    |
                      | createdAt   |       +-------------+
                      | updatedAt   |<----->| id          |
                      +-------------+       | userId      |
                                           | items       |
+-------------+                            | status      |
|    Deal     |                            | total       |
+-------------+                            | createdAt   |
| id          |                            | updatedAt   |
| title       |                            +-------------+
| description |
| bannerText  |       +-------------+
| imageUrl    |       |   Coupon    |
| targetUrl   |       +-------------+
| discountPct |       | id          |
| startDate   |       | code        |
| endDate     |       | discount    |
| active      |       | type        |
| position    |       | maxDiscount |
| createdAt   |       | startDate   |
| updatedAt   |       | endDate     |
+-------------+       | active      |
                      | usageLimit  |
                      | minPurchase |
                      | createdAt   |
                      | updatedAt   |
                      +-------------+
```

## Tables

### Categories

Stores product categories.

| Column    | Type      | Constraints       | Description               |
|-----------|-----------|-------------------|---------------------------|
| id        | UUID      | PK, default UUID  | Unique identifier         |
| name      | STRING    | NOT NULL, UNIQUE  | Category name             |
| icon      | STRING    | NULLABLE          | Emoji or icon code        |
| bgColor   | STRING    | NULLABLE          | Background color class    |
| active    | BOOLEAN   | DEFAULT true      | Is category active        |
| createdAt | TIMESTAMP | NOT NULL          | Record creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL          | Record update timestamp   |

#### Indexes
- `category_name_active_idx` on `(name, active)`

### Products

Stores all product information.

| Column        | Type           | Constraints      | Description                 |
|---------------|----------------|------------------|-----------------------------|
| id            | UUID           | PK, default UUID | Unique identifier           |
| name          | STRING         | NOT NULL         | Product name                |
| description   | TEXT           | NOT NULL         | Product description         |
| price         | DECIMAL(10, 2) | NOT NULL         | Regular price               |
| imageUrl      | STRING         | NULLABLE         | Main product image          |
| category      | STRING         | NULLABLE         | Legacy category field       |
| categoryId    | UUID           | FK to categories | Reference to category       |
| stockQuantity | INTEGER        | DEFAULT 0        | Available stock             |
| isAvailable   | BOOLEAN        | DEFAULT true     | Product availability        |
| isOnSale      | BOOLEAN        | DEFAULT false    | Is product on sale          |
| salePrice     | DECIMAL(10, 2) | NULLABLE         | Discounted price            |
| newArrival    | BOOLEAN        | DEFAULT false    | Is product new arrival      |
| createdAt     | TIMESTAMP      | NOT NULL         | Record creation timestamp   |
| updatedAt     | TIMESTAMP      | NOT NULL         | Record update timestamp     |

#### Indexes
- `product_category_sale_idx` on `(categoryId, isOnSale)`
- `product_category_new_idx` on `(categoryId, newArrival)`
- `product_price_available_idx` on `(price, isAvailable)`

#### Foreign Keys
- `categoryId` references `categories(id)`

### Deals

Stores promotional deals and banners.

| Column            | Type           | Constraints      | Description                |
|-------------------|----------------|------------------|----------------------------|
| id                | UUID           | PK, default UUID | Unique identifier          |
| title             | STRING         | NOT NULL         | Deal title                 |
| description       | TEXT           | NULLABLE         | Deal description           |
| bannerText        | STRING         | NULLABLE         | Text displayed on banner   |
| imageUrl          | STRING         | NULLABLE         | Banner image URL           |
| targetUrl         | STRING         | NULLABLE         | Link destination           |
| discountPercentage| INTEGER        | NULLABLE         | Discount percentage        |
| startDate         | DATE           | NULLABLE         | Deal start date            |
| endDate           | DATE           | NULLABLE         | Deal end date              |
| active            | BOOLEAN        | DEFAULT true     | Is deal active             |
| position          | INTEGER        | DEFAULT 0        | Display order position     |
| createdAt         | TIMESTAMP      | NOT NULL         | Record creation timestamp  |
| updatedAt         | TIMESTAMP      | NOT NULL         | Record update timestamp    |

#### Indexes
- `deal_active_dates_idx` on `(active, startDate, endDate)`

### Coupons

Stores promotional coupon codes.

| Column          | Type           | Constraints       | Description                |
|-----------------|----------------|-------------------|----------------------------|
| id              | UUID           | PK, default UUID  | Unique identifier          |
| code            | STRING         | NOT NULL, UNIQUE  | Coupon code                |
| discount        | DECIMAL(10, 2) | NOT NULL          | Discount amount            |
| type            | ENUM           | NOT NULL          | 'percentage' or 'fixed'    |
| maxDiscount     | DECIMAL(10, 2) | NULLABLE          | Maximum discount amount    |
| startDate       | DATE           | NULLABLE          | Coupon validity start      |
| endDate         | DATE           | NULLABLE          | Coupon validity end        |
| active          | BOOLEAN        | DEFAULT true      | Is coupon active           |
| usageLimit      | INTEGER        | NULLABLE          | Max number of uses         |
| minimumPurchase | DECIMAL(10, 2) | DEFAULT 0         | Min purchase for validity  |
| createdAt       | TIMESTAMP      | NOT NULL          | Record creation timestamp  |
| updatedAt       | TIMESTAMP      | NOT NULL          | Record update timestamp    |

#### Indexes
- `coupon_code_active_dates_idx` on `(code, active, startDate, endDate)`

## Relationships

### One-to-Many Relationships

1. **Category to Products**
   - A category can have many products
   - A product belongs to one category

## Data Validation

All models include validation rules at the database level:

### Category Model
- `name`: Required, min length 2 chars
- `active`: Boolean value

### Product Model
- `name`: Required, min length 3 chars
- `description`: Required, min length 10 chars
- `price`: Required, numeric, positive
- `categoryId`: Valid UUID, must exist in categories table

### Coupon Model
- `code`: Required, unique, uppercase alpha-numeric
- `discount`: Required, numeric, positive
- `type`: Required, enum value
- `startDate`, `endDate`: Valid dates, endDate must be after startDate

### Deal Model
- `title`: Required, min length 3 chars
- `startDate`, `endDate`: Valid dates, endDate must be after startDate

## Indexing Strategy

The database uses strategic indexing to optimize common query patterns:

1. **Category lookups**: Indexed by name and active status to speed up filtering
2. **Product filtering**: Indexed by category, sale status, and new arrival status
3. **Coupon validation**: Indexed by code, active status, and validity dates

## Database Migrations

Migrations are managed through Sequelize and are version-controlled. To run migrations:

```bash
npx sequelize-cli db:migrate
```

To revert the most recent migration:

```bash
npx sequelize-cli db:migrate:undo
``` 