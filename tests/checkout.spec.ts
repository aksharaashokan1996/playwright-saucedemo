import { test } from '../fixtures';
import { customer, products } from '../data/products';

test.describe('Checkout', () => {
  test('user can complete checkout (happy path)', async ({ loggedIn, cartSteps, checkoutSteps }) => {
    const items = [products.backpack, products.bikeLight];

    await cartSteps.addProducts(...items);
    await cartSteps.expectBadgeCount(items.length);
    await cartSteps.openCart();
    await cartSteps.expectCartContains(...items);

    await checkoutSteps.completeCheckout(customer, items);
    await checkoutSteps.expectOrderComplete();
  });
});
