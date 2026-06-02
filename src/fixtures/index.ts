import { test as base } from '@playwright/test';

// Register pages
import { HomePage } from '../pages/home-page/HomePage';
import { RegistrationPage } from '../pages/register/RegistrationPage';

// Login pages
import { LoginPage } from '../pages/login/LoginPage';





export type PageFixtures = {
  // Register fixtures
  homePage: HomePage;
  registrationPage: RegistrationPage;

  // Login fixtures
  loginPage: LoginPage;
 
};

export const test = base.extend<PageFixtures>({
  // ── Register ──────────────────────────────────────────────
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },



  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },


  // ── Login ─────────────────────────────────────────────────
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

});

// Re-export expect and request so tests only need one import source
export { expect, request } from '@playwright/test';
