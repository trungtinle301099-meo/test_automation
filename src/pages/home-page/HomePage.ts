import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  // Locators
  readonly signupLoginLink: Locator;
  readonly logoutLink: Locator;
  readonly loggedInAsLabel: Locator;
  readonly deleteAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLoginLink = page.getByRole('link', { name: ' Signup / Login' });
    this.logoutLink = page.getByRole('link', { name: ' Logout' });
    this.loggedInAsLabel = page.locator('a:has-text("Logged in as")');
    this.deleteAccountLink = page.getByRole('link', { name: ' Delete Account' });
  }

  /**
   * Navigates to the homepage.
   */
  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Clicks the Signup / Login link in the navbar.
   */
  async clickSignupLogin(): Promise<void> {
    await this.signupLoginLink.click();
  }

  /**
   * Logs out the current user.
   */
  async logout(): Promise<void> {
    await this.logoutLink.click();
  }
}
