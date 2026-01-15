# Backend Architecture

## Overview
The **WaysBean Backend** follows a **Monolithic Layered Architecture** using Node.js and Express. It utilizes **Prisma ORM** for database interactions and **TypeScript** for type safety.

## Architectural Layers

1.  **Presentation Layer (Routes & Controllers)**
    - Handles incoming HTTP requests.
    - Validates input using `Zod` or Middleware.
    - Delegates business logic to services.
    - Sends HTTP responses to the client.

2.  **Service Layer (Business Logic)**
    - Contains the core business rules.
    - Orchestrates data operations.
    - Interacts with 3rd party providers (Cloudinary, Midtrans, Nodemailer).

3.  **Data Access Layer (Prisma Client)**
    - Communicates directly with the PostgreSQL database.
    - Uses Prisma Schema Models (`User`, `Product`, `Transaction`, etc.) to perform CRUD operations.

## Data Flow
```mermaid
graph LR
    Client[Frontend Client] -->|HTTP Request| Route[Express Router]
    Route -->|Dispatch| Controller[Controller]
    Controller -->|DTO| Service[Service Layer]
    Service -->|Prisma| DB[(PostgreSQL)]
    Service -->|API Call| External[External Services (Midtrans, Cloudinary)]
```

## External Services
- **Cloudinary**: Stores product images and user avatars.
- **Midtrans**: Handles secure payment processing.
- **Nodemailer**: Sends transactional emails.
- **Socket.io**: Pushes real-time updates to clients (e.g., new orders).
