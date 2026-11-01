import { type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly items = this.page.getByTestId('inventory-item');

  addToCartButton(productId: string): Locator {
    return this.page.getByTestId(`add-to-cart-${productId}`);
  }

  removeButton(productId: string): Locator {
    return this.page.getByTestId(`remove-${productId}`);
  }

  async addToCart(productId: string): Promise<void> {
    await this.addToCartButton(productId).click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
