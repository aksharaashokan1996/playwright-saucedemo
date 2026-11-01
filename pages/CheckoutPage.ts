import { BasePage } from './BasePage';

/** Covers the three checkout screens: information, overview and complete. */
export class CheckoutPage extends BasePage {
  readonly firstNameInput = this.page.getByTestId('firstName');
  readonly lastNameInput = this.page.getByTestId('lastName');
  readonly postalCodeInput = this.page.getByTestId('postalCode');
  readonly continueButton = this.page.getByTestId('continue');
  readonly itemNames = this.page.getByTestId('inventory-item-name');
  readonly finishButton = this.page.getByTestId('finish');
  readonly completeHeader = this.page.getByTestId('complete-header');

  async fillInformation(info: { firstName: string; lastName: string; postalCode: string }): Promise<void> {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.postalCodeInput.fill(info.postalCode);
    await this.continueButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }
}
