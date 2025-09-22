import { test, expect } from '@playwright/test';

const user = {
        username: 'standard_user',
        password: 'secret_sauce'
    };

test('deve logar com sucesso', async ({ page }) => {

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

test('não deve logar com senha incorreta', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await page
        .getByPlaceholder('Username')
        .fill(user.username);
    await page
        .getByPlaceholder('Password')
        .fill(user.password+'incorreta');
    await page
        .getByRole('button', { name: 'Login' })
        .click();
    await expect(page
        .locator('[data-test="error"]'))
        .toHaveText("Epic sadface: Username and password do not match any user in this service");

});

test('não deve logar com usuário não cadastrado', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await page
        .getByPlaceholder('Username')
        .fill(user.username+'naoexiste');
    await page
        .getByPlaceholder('Password')
        .fill(user.password);
    await page
        .getByRole('button', { name: 'Login' })
        .click();
    await expect(page
        .locator('[data-test="error"]'))
        .toHaveText("Epic sadface: Username and password do not match any user in this service");

});