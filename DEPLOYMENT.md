# Deployment Guide

This guide covers how to deploy the WaysBean Backend to various platforms.

## Prerequisites
- A production-ready PostgreSQL Database (e.g., Supabase, Neon, AWS RDS).
- Cloudinary Account.
- Midtrans Account.

## Build Process
The application is written in TypeScript and must be compiled to JavaScript before deployment.

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma Client
npx prisma generate

# 3. Build the project
npm run build
# This creates a 'dist/' folder containing the compiled JS.
```

## Platform Specific Instructions

### 1. Railway / Render / Heroku
Most PaaS providers auto-detect Node.js apps.

1.  Connect your GitHub repository.
2.  Set the **Build Command**: `npm install && npx prisma generate && npm run build`
3.  Set the **Start Command**: `npm start` (or `node dist/src/app.js` depending on your output).
4.  Adding **Environment Variables** in the provider's dashboard is crucial (see [ENVIRONMENT.md](./ENVIRONMENT.md)).

### 2. Vercel
Create a `vercel.json` file configuration for serverless deployment.

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/app.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/app.ts"
    }
  ]
}
```

## Database Migration
On production, **DO NOT** use `prisma migrate dev`. Use `prisma migrate deploy` to apply pending migrations.

```bash
npx prisma migrate deploy
```
