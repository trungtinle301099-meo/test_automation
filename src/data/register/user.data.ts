import { generateUniqueEmail, generateUniqueUserName } from '../../helpers/common/random.helper';

export interface  UserRegistrationData {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  email: string;
  soDT: string;
  maNhom: string;
}

/**
 * Generates a complete UserRegistrationData object with a unique email
 * to avoid conflicts between test runs.
 */
export function generateUserData(): UserRegistrationData {
  return {
    taiKhoan: generateUniqueUserName('testuser'),
    matKhau:"@Test1234",
    hoTen:"test",
    email: generateUniqueEmail('testuser'),
    soDT:"0987654321",
    maNhom:"GP01",
  };
}
