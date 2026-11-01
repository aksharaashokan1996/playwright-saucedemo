import { expect, type Page } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { orderCompleteHeader, pageTitles } from '../data/messages';
import type { Product } from '../data/products';

export class CheckoutSteps {
  private readonly cartPage: CartPage;
  private readonly checkoutPage: CheckoutPage;

  constructor(page: Page) {
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
  }

  async completeCheckout(
    customer: { firstName: string; lastName: string; postalCode: string },
    expectedItems: Product[],
  ): Promise<void> {
    await this.cartPage.checkout();
    await expect(this.checkoutPage.title).toHaveText(pageTitles.checkoutInfo);

    await this.checkoutPage.fillInformation(customer);
    await expect(this.checkoutPage.title).toHaveText(pageTitles.checkoutOverview);
    await expect(this.checkoutPage.itemNames).toHaveText(expectedItems.map((i) => i.name));

    await this.checkoutPage.finish();
  }

  async expectOrderComplete(): Promise<void> {
    await expect(this.checkoutPage.title).toHaveText(pageTitles.checkoutComplete);
    await expect(this.checkoutPage.completeHeader).toHaveText(orderCompleteHeader);
    await expect(this.checkoutPage.cartBadge).toHaveCount(0);
  }
}
