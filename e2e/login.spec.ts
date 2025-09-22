import { test, expect } from '@playwright/test'
import { getLoginPage } from '../support/pages/loginPage'
import { getInventoryPage } from '../support/pages/inventoryPage'
import { user } from '../support/data/userData'

test('deve logar com sucesso', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const inventoryPage = getInventoryPage(page)

    await loginPage.open()
    await loginPage.submit(user.username, user.password)
    await inventoryPage.products()

})

test('não deve logar com senha incorreta', async ({ page }) => {

    const loginPage = getLoginPage(page)

    await loginPage.open()
    await loginPage.submit(user.username, user.password + 'incorreta')
    await expect(loginPage.error()).toContainText("Epic sadface: Username and password do not match any user in this service")

})

test('não deve logar com usuário não cadastrado', async ({ page }) => {

    const loginPage = getLoginPage(page)

    await loginPage.open()
    await loginPage.submit(user.username + 'naoexiste', user.password)
    await expect(loginPage.error()).toContainText("Epic sadface: Username and password do not match any user in this service")

})

test('não deve logar com credenciais em branco', async ({ page }) => {

    const loginPage = getLoginPage(page)

    await loginPage.open()
    await loginPage.submit('', '')
    await expect(loginPage.error()).toContainText("Epic sadface: Username is required")

})

test('não deve logar com usuário sem senha', async ({ page }) => {

    const loginPage = getLoginPage(page)

    await loginPage.open()
    await loginPage.submit(user.username + 'naoexiste', '')
    await expect(loginPage.error()).toContainText("Epic sadface: Password is required")

})

test('não deve logar com usuário em branco', async ({ page }) => {

    const loginPage = getLoginPage(page)

    await loginPage.open()
    await loginPage.submit('', user.password)
    await expect(loginPage.error()).toContainText("Epic sadface: Username is required")

}) 
