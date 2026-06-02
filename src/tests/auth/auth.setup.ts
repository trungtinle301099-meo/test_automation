import { test as setup, request, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/LoginPage';
import { HomePage } from '../../pages/home-page/HomePage';
import { ENV } from '../../configs/env.config';
import { logger } from '../../helpers/common/logger.helper';


setup('Authenticate: Login with test account from .env', async ({ page }) => {
  // Validate env variables
  if (!ENV.testUsername || !ENV.testPassword) {
    logger.fail('TEST_USERNAME or TEST_PASSWORD missing in .env');
    throw new Error(
      'TEST_USERNAME or TEST_PASSWORD is missing in .env. ' +
      'Copy .env.example to .env and fill in your credentials.',
    );
  }

  logger.info(`Auth setup starting with account: ${ENV.testUsername}`);

  const loginPage = new LoginPage(page);

  // Step 1: Navigate to login page
  logger.step('Navigate to /login');
  await loginPage.navigate();
  await expect(page).toHaveURL(/.*login/);
  
  // Step 2: Login with credentials from .env
  logger.step(`Login with username: ${ENV.testUsername}`);
  await loginPage.login(ENV.testUsername, ENV.testPassword);

  // Step 3: Save session state to file
  await page.context().storageState({ path: ENV.authStatePath });

  logger.setup(`Auth state saved at: ${ENV.authStatePath}`);
});
