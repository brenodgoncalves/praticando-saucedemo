import { Page } from '@playwright/test'

export function getLoginPage(page: Page) {
    return {

        open: async () => {
            await page.goto('https://www.saucedemo.com/')
        },

        submit: async (username: string, password: string) => {
            await page
                .getByPlaceholder('Username')
                .fill(username)
            await page
                .getByPlaceholder('Password')
                .fill(password)
            await page
                .getByRole('button', { name: 'Login' })
                .click()
        },

        error: () => {
            return page.locator('[data-test="error"]')
        }

    }
}
