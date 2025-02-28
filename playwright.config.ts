import { defineConfig, devices } from '@playwright/test';
import path from 'path';

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const PORT = 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: path.join(__dirname, 'e2e'),

  /* Maximum time one test can run for. */
  timeout: 70 * 1000, // 70 seconds

  /* Run tests in files in parallel */
  fullyParallel: false,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  // process.env.CI ? 2 : 0
  // setting to 0 for now to avoid flakiness due to stripe payment api errors
  retries: 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['list']],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-first-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', testMatch: 'auth.setup.ts' },
    {
      name: 'Features',
      testMatch: /.*\.feature\.ts/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
    },
    {
      name: 'Smoke',
      testMatch: 'smoke.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  /* will attempt to re-use an existing webserver on localhost:3000, otherwise starts it up for you */
  webServer: {
    command: 'npm run dev',
    port: 3000,
    timeout: 60 * 1000,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
  },
});
