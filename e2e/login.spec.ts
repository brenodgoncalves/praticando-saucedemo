import { test, expect } from '@playwright/test'
import { getLoginPage } from '../support/pages/loginPage';
import { getInventoryPage } from '../support/pages/inventoryPage';
import { user } from '../support/fixtures/userData'

test('should log in successfully', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const inventoryPage = getInventoryPage(page)

    await loginPage.open()
    await loginPage.submit(user.username, user.password)
    await inventoryPage.products()

})

test('must not log in with an incorrect password', async ({ page }) => {

    const loginPage = getLoginPage(page)

    await loginPage.open()
    await loginPage.submit(user.username, user.password + 'INVALID')
    await expect(loginPage.error()).toContainText("Epic sadface: Username and password do not match any user in this service")

})

test('must not log in with a non-existent user', async ({ page }) => {

    const loginPage = getLoginPage(page)

    await loginPage.open()
    await loginPage.submit(user.username + 'out', user.password)
    await expect(loginPage.error()).toContainText("Epic sadface: Username and password do not match any user in this service")

})

test('must not log in with blank credentials', async ({ page }) => {

    const loginPage = getLoginPage(page)

    await loginPage.open()
    await loginPage.submit('', '')
    await expect(loginPage.error()).toContainText("Epic sadface: Username is required")

})

test('must not log in with a user without a password', async ({ page }) => {

    const loginPage = getLoginPage(page)

    await loginPage.open()
    await loginPage.submit(user.username, '')
    await expect(loginPage.error()).toContainText("Epic sadface: Password is required")

})

test('must not log in with a blank username', async ({ page }) => {

    const loginPage = getLoginPage(page)

    await loginPage.open()
    await loginPage.submit('', user.password)
    await expect(loginPage.error()).toContainText("Epic sadface: Username is required")

}) 
