import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  // --- Login section locators ---
  readonly loginHeading: Locator;
  readonly loginUserInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginHeading = page.getByRole('heading', { name: 'Đăng nhập' });
    this.loginUserInput = page.locator('form').filter({ hasText: 'Đăng nhậphoặc sử dụng tài kho' }).getByPlaceholder('Tài khoản');
    this.loginPasswordInput = page.locator('form').filter({ hasText: 'Đăng nhậphoặc sử dụng tài kho' }).getByPlaceholder('Mật khẩu');
    this.loginButton = page.locator('form.formLoginUser').getByRole('button', { name: 'Đăng nhập' });
    this.loginErrorMessage = page.getByText('Tài khoản hoặc mật khẩu không đúng!Đã xảy ra lỗi vui lòng quay lại trang chủ ho');
  }

  /**
   * Navigates directly to the login page.
   */
  async navigate(): Promise<void> {
    await this.page.goto('/login');
  }

  /**
   * Fills in the login form with the given credentials and submits.
   * @param username - User's username
   * @param password - User's password
   */
  async login(username: string, password: string): Promise<void> {
    await this.loginUserInput.fill(username);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

}