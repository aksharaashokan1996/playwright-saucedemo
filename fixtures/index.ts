import { test as base } from '@playwright/test';
import { LoginSteps } from '../steps/LoginSteps';
import { CartSteps } from '../steps/CartSteps';
import { CheckoutSteps } from '../steps/CheckoutSteps';
import { getPassword, users } from '../data/users';

type Fixtures = {
  loginSteps: LoginSteps;
  cartSteps: CartSteps;
  checkoutSteps: CheckoutSteps;
  password: string;
  /** Logs in as standard_user before the test body runs. */
  loggedIn: void;
};

export const test = base.extend<Fixtures>({
  password: async ({}, use) => {
    await use(getPassword());
  },
  loginSteps: async ({ page }, use) => {
    await use(new LoginSteps(page));
  },
  cartSteps: async ({ page }, use) => {
    await use(new CartSteps(page));
  },
  checkoutSteps: async ({ page }, use) => {
    await use(new CheckoutSteps(page));
  },
  loggedIn: async ({ loginSteps, password }, use) => {
    await loginSteps.loginAs(users.standard, password);
    await loginSteps.expectLoggedIn();
    await use();
  },
});

export { expect } from '@playwright/test';
