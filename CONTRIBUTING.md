# Contributing to the Backend

We welcome contributions to the API!

## Development Setup
1.  Ensure PostgreSQL is running.
2.  Install dependencies: `npm install`.
3.  Run migrations: `npx prisma migrate dev`.
4.  Start dev server: `npm run dev`.

## Pull Request Guidelines
- **Branch Naming**: `feat/endpoint-name` or `fix/issue-description`.
- **Code Style**: Please follow the [Style Guide](./STYLE_GUIDE.md).
- **Commit Messages**: Use conventional commits (e.g., `feat: add user profile endpoint`).

## Database Changes
If you modify `prisma/schema.prisma`:
1.  Run `npx prisma migrate dev --name <migration_name>` to create a migration file.
2.  Commit the generated migration folder.
