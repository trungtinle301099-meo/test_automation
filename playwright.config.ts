import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });

import { ENV } from './src/configs/env.config';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: ENV.baseUrl,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Capture screenshot on test failure */
    screenshot: 'only-on-failure',

    /* Record video on test failure */
    video: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    // ─────────────────────────────────────────────────────────
    // SETUP: Login once and save auth state before authenticated tests run
    // ─────────────────────────────────────────────────────────
    {
      name: 'setup',
      testMatch: '**/auth.setup.ts',
    },

    // ─────────────────────────────────────────────────────────
    // Unauthenticated projects (register, login, cart tests)
    // ─────────────────────────────────────────────────────────
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: ['**/checkout/**'],
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: ['**/checkout/**'],
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testIgnore: ['**/checkout/**'],
    },

    // ─────────────────────────────────────────────────────────
    // Authenticated projects: checkout tests use saved session state
    // Depends on 'setup' to ensure auth.json is created first
    // ─────────────────────────────────────────────────────────
    {
      name: 'chromium:auth',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
      testMatch: ['**/checkout/**'],
    },

    {
      name: 'firefox:auth',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
      testMatch: ['**/checkout/**'],
    },

    {
      name: 'webkit:auth',
      use: {
        ...devices['Desktop Safari'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
      testMatch: ['**/checkout/**'],
    },
  ],


  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
