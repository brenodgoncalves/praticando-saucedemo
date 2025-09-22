import { test, expect } from '@playwright/test';

test('deve logar com sucesso', async ({ page }) => {

    const user = {
        username: 'standard_user',
        password: 'secret_sauce'
    };

    await page.goto('https://www.saucedemo.com/');
    await page
        .getByPlaceholder('Username')
        .fill(user.username);
    await page
        .getByPlaceholder('Password')
        .fill(user.password);
    await page
        .getByRole('button', { name: 'Login' })
        .click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page
        .getByText('Products'))
        .toBeVisible();

});
