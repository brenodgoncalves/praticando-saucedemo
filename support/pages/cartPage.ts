import { expect, Page } from '@playwright/test'

export function getCartPage(page: Page) {
    return {

        checkout: async () => {
            const shoppingCart = page.locator('.shopping_cart_link')
            await expect(shoppingCart).toBeVisible()
            await shoppingCart.click()
            await productInformation()
            const cartQuantity = page.locator('.cart_quantity')
            await expect(cartQuantity).toBeVisible()
            const checkoutButton = page.getByRole('button', { name: 'Checkout' })
            await expect(checkoutButton).toBeVisible()
            await checkoutButton.click()
            await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
        },

        clientInformation: async (firstName: string, lastName: string, postalCode: string) => {
            const firstNameInput = page.getByPlaceholder('First Name')
            await expect(firstNameInput).toBeVisible()
            await firstNameInput.fill(firstName)
            const lastNameInput = page.getByPlaceholder('Last Name')
            await expect(lastNameInput).toBeVisible()
            await lastNameInput.fill(lastName)
            const postalCodeInput = page.getByPlaceholder('Zip/Postal Code')
            await expect(postalCodeInput).toBeVisible()
            await postalCodeInput.fill(postalCode)
            const continueButton = page.getByRole('button', { name: 'Continue' })
            await expect(continueButton).toBeVisible()
            await continueButton.click()
            await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        },

        overviewCheckout: async () => {
            await productInformation()
            const finishButton = page.getByRole('button', { name: 'Finish' })
            await expect(finishButton).toBeVisible()
            await finishButton.click()
            await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')
        },

        fullCheckout: async () => {
            const completeHeader = page.locator('.complete-header')
            await expect(completeHeader).toBeVisible()
            const completeText = page.locator('.complete-text')
            await expect(completeText).toBeVisible()
            const backHomeButton = page.getByRole('button', { name: 'Back Home' })
            await expect(backHomeButton).toBeVisible()
            await backHomeButton.click()
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        }

    }

    async function productInformation() {
        const productTitle = page.locator('.inventory_item_name')
        await expect(productTitle).toBeVisible()
        const productDetail = page.locator('.inventory_item_desc')
        await expect(productDetail).toBeVisible()
        const productPrice = page.locator('.inventory_item_price')
        await expect(productPrice).toBeVisible()
    }
}
