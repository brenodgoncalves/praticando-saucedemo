import { expect, Page } from '@playwright/test'

export function getInventoryPage(page: Page) {
    return {

        products: async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
            await expect(page
                .getByText('Products'))
                .toBeVisible()
            await expect(page
                .locator('.inventory_list'))
                .toBeVisible()
        },

        addProductToCart: async () => {
            const products = page.locator('.inventory_item_name')
            const count = await products.count();
            if (count === 0) throw new Error('Nenhum produto encontrado');
            const randomIndex = Math.floor(Math.random() * count);
            const randomProduct = products.nth(randomIndex);
            await randomProduct.click();
            const productTitle = page.locator('.inventory_details_name')
            await expect(productTitle).toBeVisible()
            const productDetail = page.locator('.inventory_details_desc')
            await expect(productDetail).toBeVisible()
            const productPrice = page.locator('.inventory_details_price')
            await expect(productPrice).toBeVisible()
            const addToCartButton = page.getByRole('button', { name: 'Add to cart' })
            await expect(addToCartButton).toBeVisible()
            await addToCartButton.click()
            const shoppingCartBadge = page.locator('.shopping_cart_link .shopping_cart_badge')
            await expect(shoppingCartBadge).toBeVisible()
        },

    }
}
