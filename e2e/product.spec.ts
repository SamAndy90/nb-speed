import { test, expect } from '@playwright/test';

const PRODUCT_PAGE = '/products/ashwagandha-ksm-66';

test('Quick Add bar renders when scrolled past prices', async ({ page }) => {
    await page.goto(PRODUCT_PAGE);
    //Scroll past first page
    await page.mouse.wheel(0, 100000);

    //Expect the quick add bar to be visible
    await expect(page.getByText('Add to Cart')).not.toBeInViewport();
    await expect(page.getByTitle('Quick Add')).toBeVisible();
});
