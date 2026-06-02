/**
 * Central config reader for environment variables.
 * Import this anywhere instead of using process.env directly.
 *
 * Variables are defined in `.env` (gitignored).
 * See `.env.example` for required keys.
 */
export const ENV = {
  /** Project base URL. */
  baseUrl: process.env.BASE_URL ?? 'https://demo2.cybersoft.edu.vn',
  /** Test account email for checkout tests. */
  testEmail: process.env.TEST_EMAIL ?? '',
  /** Test account password. */
  testPassword: process.env.TEST_PASSWORD ?? '',
  /** Username displayed on navbar after login. */
  testUsername: process.env.TEST_USERNAME ?? 'Test User',
  /** Path to save auth state after login. */
  authStatePath: 'playwright/.auth/user.json',
};
