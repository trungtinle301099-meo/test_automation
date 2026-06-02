/**
 * Invalid credentials for negative test cases.
 * A valid email is fetched from the account registered in the beforeAll of login.spec.ts.
 */
export const INVALID_CREDENTIALS = {
  wrongPassword: {
    password: 'WrongPassword999!',
  },
  nonExistentUser: {
    email: 'nonexistent_user_xyz@mailtest.com',
    password: 'SomePassword@123',
  },
};

