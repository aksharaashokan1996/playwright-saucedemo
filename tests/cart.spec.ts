import { test } from '../fixtures';
import { products } from '../data/products';

test.describe('Cart', () => {
  test('user can add an item to the cart', async ({ loggedIn, cartSteps }) => {
    await cartSteps.addProducts(products.backpack);
    await cartSteps.expectBadgeCount(1);
    await cartSteps.openCart();
    await cartSteps.expectCartContains(products.backpack);
  });
});
