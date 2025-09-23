import { test } from '@playwright/test'
import { getLoginPage } from '../support/pages/loginPage';
import { getInventoryPage } from '../support/pages/inventoryPage';
import { getCartPage } from '../support/pages/cartPage';
import { user } from '../support/fixtures/userData'

test('must complete the purchase successfully', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const inventoryPage = getInventoryPage(page)
    const cartPage = getCartPage(page)

    await loginPage.open()
    await loginPage.submit(user.username, user.password)
    await inventoryPage.products()
    await inventoryPage.addProductToCart()
    await cartPage.checkout()
    await cartPage.clientInformation(user.firstName, user.lastName, user.postalCode)
    await cartPage.overviewCheckout()
    await cartPage.fullCheckout()

})
