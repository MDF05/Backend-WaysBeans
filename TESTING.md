# Testing Strategy

> **Note**: Currently, there are no automated tests set up for this project.

## Planned Improvements
We are planning to implement testing using **Jest** and **Supertest**.

## Contributing Tests
If you wish to add tests, please follow this structure:

1.  **Unit Tests**: Test individual services in `src/services/__tests__`.
2.  **Integration Tests**: Test API endpoints in `src/routes/__tests__`.

### Recommended Setup
```bash
npm install --save-dev jest supertest @types/jest @types/supertest ts-jest
```

Create a `jest.config.js`:
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```
