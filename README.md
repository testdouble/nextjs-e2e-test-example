# Playwright E2E Testing with Auth0 in Next.js

This repository demonstrates how to set up end-to-end testing with Playwright for Next.js applications that use Auth0 authentication.

[![Playwright E2E Testing with Auth0 in Next.js](https://img.youtube.com/vi/xl3PLnENz8g/0.jpg)](https://www.youtube.com/watch?v=xl3PLnENz8g)

## Overview

This project shows how to:

- Configure Playwright for testing auth flows in Next.js applications
- Create reusable test helpers for common auth operations
- Debug tests effectively using Playwright's UI Explorer and recorder
- Structure tests for both smoke testing and feature verification
- Optimize test performance with session caching

## Features

- **Smoke Tests**: Verify critical auth flows (sign up, sign in, sign out)
- **Feature Tests**: Test specific routes with authenticated sessions
- **Test Helpers**: Reusable functions for auth operations
- **Session Caching**: Improve test performance by reusing authenticated sessions

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm
- A Next.js application
- Auth0 account and configuration

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/testdouble/nextjs-e2e-test-example.git
   cd nextjs-e2e-test-example
   ```

1. Install dependencies:
   ```bash
   npm install
   ```

1. Install Playwright:
   ```bash
   npx playwright install
   ```

1. Follow the [Auth0 NextJS Quickstart Guide](https://auth0.com/docs/quickstart/webapp/nextjs) to set up your Auth0 app and configuration.

1. Configure your Auth0 credentials in `.env.local`:
   ```
   AUTH0_SECRET='your-auth0-secret'
   AUTH0_BASE_URL='http://localhost:3000'
   AUTH0_ISSUER_BASE_URL='https://your-tenant.auth0.com'
   AUTH0_CLIENT_ID='your-client-id'
   AUTH0_CLIENT_SECRET='your-client-secret'
   ```

### Running Tests

The project includes several test scripts in `package.json`:

- **Run headless E2E tests**:
  ```bash
  npm run test:e2e
  ```

- **Run with UI Explorer**:
  ```bash
  npm run test:e2e:ui
  ```

- **Record tests (2 terminal tabs)**:
  ```bash
  npm run dev
  npm run test:e2e:record
  ```

- **Run smoke tests only**:
  ```bash
  npm run test:e2e:smoke
  ```

- **Run feature tests only**:
  ```bash
  npm run test:e2e:features
  ```

- **Debug tests**:
  ```bash
  npm run test:e2e:debug
  ```

## Project Structure

```
├── app/                      # Next.js app directory
├── e2e/                      # End-to-end test directory
│   ├── features              # Feature tests
│   │   └── sample.feature.ts # Sample feature test
│   ├── auth.setup.ts         # Authentication setup, caches sessions
│   └── smoke.spec.ts         # Verifies signUp, signOut, and signIn
├── playwright.config.ts      # Playwright config
```

## Test Helpers

The project includes helper functions for authentication flows you can customize for your specific needs.

```typescript
// Example from e2e/helpers/auth.ts
export const createTestContext = () => {
  const timestamp = Date.now();
  return {
    email: `${timestamp}+testuser@example.com`,
    password: 'S0me-R@ndom-P@ssword!'
  };
};

export const signUp = async (page, testContext) => {
  // Implementation for sign up flow
};

export const signIn = async (page, testContext) => {
  // Implementation for sign in flow
};

export const signOut = async (page) => {
  // Implementation for sign out flow
};
```

## Configuration

The Playwright configuration (`playwright.config.ts`) includes multiple projects:

- **smoke**: For quick verification of auth flows
- **features**: For testing specific routes/features in your application with authenticated sessions

Each project can have different browser configurations, dependencies, and test patterns.

## Recommendations

- Keep E2E tests focused on critical paths
- Use the recorder for complex interactions
- Cache sessions when possible to speed up tests
- Use role-based selectors for better accessibility testing
- Run your set of feature tests for PRs in CI

## License

[MIT](LICENSE)
