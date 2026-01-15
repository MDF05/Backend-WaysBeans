# API Documentation

## Overview
The API creates a RESTful interface for the WaysBean application.
- Base URL: `http://localhost:5000/api/v1`
- Content-Type: `application/json`

## Swagger UI
Interactive API documentation is available at `/api-docs` when the server is running.
To generate/update the Swagger file:
```bash
npm run swagger
```

## Authentication
Most routes require a Bearer Token (JWT).
**Header:** `Authorization: Bearer <your_token>`

## Key Endpoints

### Auth
- `POST /auth/register` - Create a new user account.
- `POST /auth/login` - Login and receive a JWT.
- `GET /auth/check` - Verify current session.

### Products
- `GET /products` - List all products.
- `GET /products/:id` - Get product details.
- `POST /products` - Create a product (Admin only).
- `PATCH /products/:id` - Update a product.
- `DELETE /products/:id` - Remove a product.

### Transactions
- `POST /transaction` - Create a new transaction.
- `POST /notification` - Webhook for Midtrans notifications.
- `GET /orders` - Get user's order history.

### Profile
- `GET /profile` - Get current user's profile.
- `PATCH /profile` - Update profile details.
