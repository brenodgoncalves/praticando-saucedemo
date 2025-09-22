import { expect, Page } from '@playwright/test'

export function getInventoryPage(page: Page) {
    return {

        products: async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
            await expect(page
                .getByText('Products'))
                .toBeVisible()
        }

    }
}
