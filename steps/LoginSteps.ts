import { expect, type Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { pageTitles } from '../data/messages';

export class LoginSteps {
  private readonly loginPage: LoginPage;
  private readonly inventoryPage: InventoryPage;

  constructor(private readonly page: Page) {
    this.loginPage = new LoginPage(page);
    this.inventoryPage = new InventoryPage(page);
  }

  async loginAs(username: string, password: string): Promise<void> {
    await this.loginPage.goto();
    await this.loginPage.login(username, password);
  }

  async expectLoggedIn(): Promise<void> {
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.inventoryPage.title).toHaveText(pageTitles.inventory);
  }

  async expectLoginError(message: string): Promise<void> {
    await expect(this.loginPage.errorMessage).toHaveText(message);
    await expect(this.page).not.toHaveURL(/inventory/);
  }
}
