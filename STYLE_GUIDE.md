# Style Guide (Backend)

## Language
- **TypeScript** is strictly enforced.
- **ES6+** syntax usage (Destructuring, Spread, Async/Await).

## Naming Conventions
- **Variables/Functions**: `camelCase` (e.g., `getUserById`, `userData`)
- **Classes/Models**: `PascalCase` (e.g., `UserService`, `ProductController`)
- **Interfaces/Types**: `PascalCase` (e.g., `IUserRequest`, `ProductDTO`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`, `JWT_SECRET`)
- **Files**: `kebab-case.ts` (e.g., `user-service.ts`, `auth-controller.ts`)

## Code Structure
- **Controllers**: Handle HTTP request/response only. Do not put business logic here.
- **Services**: Contain all business logic. Should be reusable.
- **DTOs**: Use Data Transfer Objects (interfaces) for typing request bodies.

## Formatting & Linting
- **Prettier**: Use default config with single-quotes and no semi-colons (if desired).
- **ESLint**: Ensure no unused variables or implicit `any` types.

## Error Handling
- Use `try-catch` blocks in Controllers.
- Return standardized error responses:
  ```json
  {
    "status": "error",
    "message": "Description of the error"
  }
  ```
