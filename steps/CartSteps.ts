import { expect, type Page } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { pageTitles } from '../data/messages';
import type { Product } from '../data/products';

export class CartSteps {
  private readonly inventoryPage: InventoryPage;
  private readonly cartPage: CartPage;

  constructor(page: Page) {
    this.inventoryPage = new InventoryPage(page);
    this.cartPage = new CartPage(page);
  }

  async addProducts(...items: Product[]): Promise<void> {
    for (const item of items) {
      await this.inventoryPage.addToCart(item.id);
      await expect(this.inventoryPage.removeButton(item.id)).toBeVisible();
    }
  }

  async expectBadgeCount(count: number): Promise<void> {
    await expect(this.inventoryPage.cartBadge).toHaveText(String(count));
  }

  async openCart(): Promise<void> {
    await this.inventoryPage.openCart();
    await expect(this.cartPage.title).toHaveText(pageTitles.cart);
  }

  async expectCartContains(...items: Product[]): Promise<void> {
    await expect(this.cartPage.itemNames).toHaveText(items.map((i) => i.name));
  }
}
