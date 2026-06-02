import { test, expect } from '../../fixtures';
import { generateUserData, UserRegistrationData } from '../../data/register/user.data';
import { logger } from '../../helpers/common/logger.helper';
import { feature, story, severity, description } from 'allure-js-commons';
import { HomePage } from '../../pages/home-page/HomePage';
import { RegistrationPage } from '../../pages/register/RegistrationPage';



/**
 * Test Suite: User Registration
 * Feature: Register a new user account on demo2.cybersoft.edu.vn
 * Tech Stack: Playwright + TypeScript + Page Object Model + Fixtures
 */
test.describe('User Registration', () => {

  let existingUser: UserRegistrationData;
  
  test.beforeAll(async ({ browser }) => {
    // Create an existing account via UI for the second test
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const homePage = new HomePage(page);
    const registrationPage = new RegistrationPage(page);
    
    existingUser = generateUserData();
    await homePage.navigate();
    await registrationPage.tinDangKy(existingUser);
    
    await page.waitForTimeout(1000); // Wait for registration to complete
    await context.close();
    
    logger.setup('beforeAll: Account created via UI for duplicate email test');
  });

  
  test('đăng ký thành công', async ({
    page,
    homePage,
    registrationPage,
  }) => {
    await feature('Registration');
    await story('Registration successfully with valid data');
    await severity('normal');
    await description(
      'Verifies that a new user can successfully register with valid data.',
    );

    const user = generateUserData();

    // Navigate đến home page
    await homePage.navigate();
    
    // Đăng ký thành công
    await registrationPage.tinDangKy(user);
    
    // Verify hiển thị thông báo đăng ký thành công
    await registrationPage.getToastifyMessage();
  });

  test('đăng ký thất bại với email đã tồn tại', async ({
    page,
    homePage,
    registrationPage,
  }) => {
    await feature('Registration');
    await story('Registration fails with existing email');
    await severity('critical');
    await description(
      'Verifies that registration fails when using an email that already exists.',
    );

    // Navigate đến home page
    await homePage.navigate();
    
    // Thử đăng ký với email đã tồn tại
    await registrationPage.tinDangKy(existingUser);
    
    // Verify hiển thị thông báo lỗi email đã tồn tại
    await registrationPage.getWrongToastifyMessage();
    });

});