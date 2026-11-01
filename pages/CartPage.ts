import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly itemNames = this.page.getByTestId('inventory-item-name');
  readonly checkoutButton = this.page.getByTestId('checkout');

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
