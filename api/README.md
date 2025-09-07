# Product Stock Transaction Management API

A NestJS-based API for managing product stock transactions with MySQL database.

## Features

- **Authentication**: JWT-based login/logout system
- **Admin Management**: CRUD operations for admin users
- **Category Management**: CRUD operations for product categories
- **Product Management**: CRUD operations for products with stock tracking
- **Transaction Management**: Stock in/out transactions with validation
- **Stock Validation**: Prevents stock out transactions that exceed available stock

## Database Schema

### Admin Table

- `id` (Primary Key - UUID)
- `first_name`
- `last_name`
- `email` (Unique)
- `dob` (Date of Birth)
- `gender` (male/female/other)
- `password` (Hashed)

### Category Table

- `id` (Primary Key - UUID)
- `name`
- `description`

### Product Table

- `id` (Primary Key - UUID)
- `name`
- `description`
- `image`
- `category_id` (Foreign Key - UUID)
- `stock` (Current stock quantity)

### Transaction Table

- `id` (Primary Key - UUID)
- `product_id` (Foreign Key - UUID)
- `type` (in/out)
- `quantity`

## Response Format

All API responses follow a standardized format:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

For error responses:

```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MySQL database
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create MySQL database:

```sql
CREATE DATABASE product_stock_db;
```

3. Set up environment variables:
   Create a `.env` file in the root directory with:

```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=product_stock_db
JWT_SECRET=your-super-secret-jwt-key
PORT=3000
NODE_ENV=development
```

4. Run the application:

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## API Endpoints

### Authentication

- `POST /auth/login` - Login admin user
- `POST /auth/logout` - Logout (client-side token removal)

### Admin Management

- `GET /admin` - Get all admins
- `GET /admin/:id` - Get admin by ID
- `POST /admin` - Create new admin
- `PATCH /admin/:id` - Update admin
- `DELETE /admin/:id` - Delete admin

### Category Management

- `GET /category` - Get all categories
- `GET /category/:id` - Get category by ID
- `POST /category` - Create new category
- `PATCH /category/:id` - Update category
- `DELETE /category/:id` - Delete category

### Product Management

- `GET /product` - Get all products
- `GET /product/:id` - Get product by ID
- `POST /product` - Create new product
- `PATCH /product/:id` - Update product
- `DELETE /product/:id` - Delete product

### Transaction Management

- `GET /transaction` - Get all transactions
- `GET /transaction?productId=:id` - Get transactions by product
- `GET /transaction/:id` - Get transaction by ID
- `POST /transaction` - Create new transaction
- `DELETE /transaction/:id` - Delete transaction (reverses stock change)

## Request Examples

### Login

```json
POST /auth/login
{
  "email": "admin@example.com",
  "password": "password123"
}
```

### Create Product

```json
POST /product
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "image": "laptop.jpg",
  "categoryId": "550e8400-e29b-41d4-a716-446655440000",
  "stock": 10
}
```

### Create Transaction (Stock In)

```json
POST /transaction
{
  "productId": "550e8400-e29b-41d4-a716-446655440001",
  "type": "in",
  "quantity": 5
}
```

### Create Transaction (Stock Out)

```json
POST /transaction
{
  "productId": "550e8400-e29b-41d4-a716-446655440001",
  "type": "out",
  "quantity": 3
}
```

## Security Features

- Password hashing using bcrypt
- JWT token authentication
- Input validation using class-validator
- SQL injection protection via TypeORM
- CORS enabled for frontend integration

## Error Handling

The API includes comprehensive error handling:

- 400 Bad Request: Invalid input data
- 401 Unauthorized: Invalid credentials
- 404 Not Found: Resource not found
- 409 Conflict: Duplicate data (e.g., email already exists)
- 500 Internal Server Error: Server-side errors

## Development

### Running Tests

```bash
npm run test
npm run test:e2e
```

### Code Formatting

```bash
npm run format
npm run lint
```
