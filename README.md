# WaysBean Backend API

> **Scalable E-commerce Backend Service**

The **WaysBean Backend** is a robust RESTful API built to power the coffee e-commerce platform. It handles user authentication, product management, secure payments, and real-time order updates.

## Backend Overview
- **Architecture**: Monolithic Layered Architecture.
- **Language**: TypeScript (Node.js).
- **Database**: PostgreSQL (Prisma ORM).
- **Authentication**: JWT & Bcrypt.

## Features
- :lock: **Auth System**: Register, Login, and Role-Based Access (Admin/User).
- :coffee: **Product Management**: CRUD operations with image upload support.
- :shopping_cart: **Cart & Orders**: Manage shopping carts and tracking orders.
- :credit_card: **Payment Integration**: Secure transactions via **Midtrans**.
- :bell: **Real-time Notifications**: Socket.io integration for instant status updates.
- :email: **Email Service**: Transactional emails using Nodemailer.

## Tech Stack
- **Runtime**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Validation**: [Zod](https://zod.dev/)
- **Documentation**: [Swagger UI](https://swagger.io/)

## Installation

1.  **Navigate to the backend directory**
    ```bash
    cd Backend-WaysBeans
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Database Cloud Setup**
    Ensure you have a PostgreSQL instance running.

## Environment Variables

You must configure the environment variables before running the server.
See **[ENVIRONMENT.md](./ENVIRONMENT.md)** for the full list of required keys.

```bash
cp .env.example .env
```

## Running the Server

### Development Mode
Runs the server with `nodemon` for hot-reloading.
```bash
npm run dev
```

### Production Build
Compiles TypeScript to JavaScript and runs the optimized build.
```bash
npm run build
npm start
```

### Database Migrations
```bash
npx prisma migrate dev
```

## 📚 Documentation

The backend documentation is split into specialized guides:

### Technical Docs
- **[System Architecture](./ARCHITECTURE.md)**: Layers and Data Flow.
- **[API Documentation](./API_DOCUMENTATION.md)**: Endpoints and Usage.
- **[Database Schema](./DATABASE_SCHEMA.md)**: ERD and Models.
- **[Style Guide](./STYLE_GUIDE.md)**: Coding standards and conventions.

### Operational Docs
- **[Deployment Guide](./DEPLOYMENT.md)**: How to deploy to production.
- **[Environment Variables](./ENVIRONMENT.md)**: Configuration reference.
- **[Testing Strategy](./TESTING.md)**: How to run tests.

### Community & Legal
- **[Contributing](./CONTRIBUTING.md)**: How to contribute code.
- **[Security Policy](./SECURITY.md)**: Vulnerability reporting.
- **[Code of Conduct](./CODE_OF_CONDUCT.md)**: Community standards.
- **[Changelog](./CHANGELOG.md)**: Release history.
- **[Roadmap](./ROADMAP.md)**: Future plans.
- **[Disclaimer](./DISCLAIMER.md)**: Usage terms.
- **[License](./LICENSE)**: MIT License.

## API Access

Once the server is running, the API is available at:
`http://localhost:5000/api/v1`

Interactive Swagger Documentation:
`http://localhost:5000/api-docs`

## Security

Please review our **[Security Policy](./SECURITY.md)** for details on supported versions and vulnerability reporting.

## Maintainer

- **Maintained by**: WaysBean Core Team
- **Contact**: `dev@waysbean.com`

---
*Powered by Node.js & Coffee* ☕
