import {test, expect} from '@playwright/test';

test('deve logar com sucesso', async ({page}) => {

    const username = 'standard_user';
    const password = 'secret_sauce';

    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill(username);
    await page.locator('#password').fill(password);
    await page.locator('#login-button').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');

});
