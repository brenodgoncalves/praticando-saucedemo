import { test, expect } from '@playwright/test';
import { getLoginPage } from '../support/pages/loginPage';

test('has title', async ({ page }) => {

  const loginPage = getLoginPage(page);

  await loginPage.open();
  await expect(page).toHaveTitle(/Swag Labs/);

});

test('should have login button', async ({ page }) => {

  const loginPage = getLoginPage(page);

  await loginPage.open();
  const labelUsername = page.getByPlaceholder('Username');
  await expect(labelUsername).toBeVisible();
  const labelPassword = page.getByPlaceholder('Password');
  await expect(labelPassword).toBeVisible();
  const loginButton = page.getByRole('button', { name: 'Login' });
  await expect(loginButton).toBeVisible();

});