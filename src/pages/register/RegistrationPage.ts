import { Page, Locator, expect } from '@playwright/test';
import { UserRegistrationData } from '../../data/register/user.data';

export class RegistrationPage {
  readonly page: Page;

  //Tín
  readonly dangKyButton: Locator;
  readonly dangNhapButton: Locator;
  readonly taiKhoanInput: Locator;
  readonly matKhauInput: Locator;
  readonly hoTenInput: Locator;
  readonly emailDangKyInput: Locator;
  readonly soDTInput: Locator;
  readonly maNhomInput: Locator;
  readonly dangKySubmitButton: Locator;
  readonly toastify: Locator;
  readonly wrongToastify: Locator;


  constructor(page: Page) {
    this.page = page;
    //tín
    this.dangKyButton = page.locator('#signUp');
    this.dangNhapButton = page.getByRole('button', { name: 'Đăng nhập' });
    this.taiKhoanInput = page.locator('form').filter({ hasText: 'ĐĂNG KÝGP01GP02GP03GP04GP05GP06GP07GP08GP09GP010Đăng ký' }).getByPlaceholder('Tài khoản');
    this.matKhauInput = page.locator('form').filter({ hasText: 'ĐĂNG KÝGP01GP02GP03GP04GP05GP06GP07GP08GP09GP010Đăng ký' }).getByPlaceholder('Mật khẩu');
    this.hoTenInput = page.getByRole('textbox', { name: 'Họ tên' });
    this.emailDangKyInput = page.getByRole('textbox', { name: 'Email' });
    this.soDTInput = page.getByRole('textbox', { name: 'Số điện thoại' });
    this.maNhomInput = page.getByRole('combobox');
    this.dangKySubmitButton = page.locator('form').filter({ hasText: 'ĐĂNG KÝGP01GP02GP03GP04GP05GP06GP07GP08GP09GP010Đăng ký' }).getByRole('button');
    this.toastify = page.getByRole('dialog').getByText('Đăng kí thành công');
    this.wrongToastify = page.getByText('Email đã tồn tại!Đã xảy ra lỗ');
  }

  async tinDangKy(data: UserRegistrationData): Promise<void> {
    await this.dangNhapButton.click();
    await this.dangKyButton.click();
    await this.taiKhoanInput.fill(data.taiKhoan);
    await this.matKhauInput.fill(data.matKhau);
    await this.hoTenInput.fill(data.hoTen);
    await this.emailDangKyInput.fill(data.email);
    await this.soDTInput.fill(data.soDT);
    await this.maNhomInput.selectOption(data.maNhom);
    await this.dangKySubmitButton.click();
  }
  
  async getToastifyMessage(): Promise<void> {
    await expect(this.toastify).toBeVisible();
  }

  async getWrongToastifyMessage(): Promise<void> {
    await expect(this.wrongToastify).toBeVisible();
  }
}
