import { test } from '../fixtures';
import { invalidPassword, users } from '../data/users';
import { errorMessages } from '../data/messages';

test.describe('Login', () => {
  test('standard user can log in with valid credentials', async ({ loginSteps, password }) => {
    await loginSteps.loginAs(users.standard, password);
    await loginSteps.expectLoggedIn();
  });

  test('locked-out user sees an error', async ({ loginSteps, password }) => {
    await loginSteps.loginAs(users.lockedOut, password);
    await loginSteps.expectLoginError(errorMessages.lockedOut);
  });

  test('wrong password shows an error', async ({ loginSteps }) => {
    await loginSteps.loginAs(users.standard, invalidPassword);
    await loginSteps.expectLoginError(errorMessages.invalidCredentials);
  });
});
