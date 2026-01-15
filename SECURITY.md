# Backend Security Policy

## Authentication
- Never commit `.env` files.
- Ensure `JWT_SECRET` is strong and kept secret.
- Passwords are hashed using `bcrypt` before storage.

## Input Validation
- All inputs are validated using `Zod` schemas before processing.
- Do not trust client-side validation alone.

## Reporting Vulnerabilities
Please refer to the root [SECURITY.md](../SECURITY.md) for reporting procedures.
