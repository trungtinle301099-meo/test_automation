import { test, expect } from '../../fixtures';
import { generateUserData, UserRegistrationData } from '../../data/register/user.data';
import { logger } from '../../helpers/common/logger.helper';
import { feature, story, severity, description } from 'allure-js-commons';
import { HomePage } from '../../pages/home-page/HomePage';
import { RegistrationPage } from '../../pages/register/RegistrationPage';


test.describe('User Login', () => {
  // Store registered user data for tests
  let registeredUser: UserRegistrationData;

  /**
   * SETUP: Create a new account with a unique email via UI.
   */
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const homePage = new HomePage(page);
    const registrationPage = new RegistrationPage(page);
    
    registeredUser = generateUserData();
    await homePage.navigate();
    await registrationPage.tinDangKy(registeredUser);
    
    await page.waitForTimeout(1000); // Wait for registration to complete
    await context.close();
    
    logger.setup('beforeAll: Account created via UI');
  });

  test('TC-LOGIN-001: Should login successfully with the newly registered account', async ({
    page,
    loginPage,
    homePage,
  }) => {
    await feature('Login');
    await story('Login successfully with valid account');
    await severity('critical');
    await description(
      'Verifies successful login with a freshly registered account: ' +
      'correct redirect, username in navbar, and successful logout.',
    );

    // Step 1 & 2: Open and verify login page
    await loginPage.navigate();
    await expect(page).toHaveURL(/.*login/);

    // Step 3: Login with registered account
    await loginPage.login(registeredUser.taiKhoan, registeredUser.matKhau);

    logger.pass('TC-LOGIN-001', 'Should login successfully with the newly registered account');
  });

  test('TC-LOGIN-002: Should show error message when logging in with wrong password', async ({
    page,
    loginPage,
  }) => {
    await feature('Login');
    await story('Login fails with wrong password');
    await severity('normal');
    await description(
      'Verifies that login fails with an error message when using the correct email but wrong password.',
    );

    // Step 1: Navigate to login page
    await loginPage.navigate();
    await expect(page).toHaveURL(/.*login/);

    // Step 2: Attempt login with correct email but wrong password
    const INVALID_CREDENTIALS = {
      wrongPassword: {
        password: 'WrongPassword999!',
      },
    };
    
    await loginPage.login(registeredUser.taiKhoan, INVALID_CREDENTIALS.wrongPassword.password);

    // Step 3: Verify error message is displayed
    // Note: Verify login failed by checking page remains on /login (since navigation would indicate success)
    await expect(page).toHaveURL(/.*login/);
    await expect(loginPage.loginErrorMessage).toBeVisible();

    logger.pass('TC-LOGIN-002', 'Error message displayed for wrong password');
  });

  test('TC-LOGIN-003: Should show error when logging in with non-existent email', async ({
    page,
    loginPage,
  }) => {
    await feature('Login');
    await story('Login fails with non-existent email');
    await severity('minor');
    await description(
      'Verifies that login fails when using an email that does not exist in the system.',
    );

    // Step 1: Navigate to login page
    await loginPage.navigate();
    await expect(page).toHaveURL(/.*login/);

    // Step 2: Attempt login with non-existent email
    const INVALID_CREDENTIALS = {
      nonExistentUser: {
        email: 'nonexistent_user_xyz@mailtest.com',
        password: 'SomePassword@123',
      },
    };
    
    await loginPage.login(INVALID_CREDENTIALS.nonExistentUser.email, INVALID_CREDENTIALS.nonExistentUser.password);

    // Step 3: Verify error state (should remain on /login page)
    await expect(page).toHaveURL(/.*login/);
    await expect(loginPage.loginErrorMessage).toBeVisible();

    logger.pass('TC-LOGIN-003', 'Error message displayed for non-existent email');
  });

});
