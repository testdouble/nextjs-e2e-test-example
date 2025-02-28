import { test } from '@playwright/test';
import { testContext } from '../spec.helpers';

const ctx = testContext();

test('a sample feature test', async ({ page }) => {
    await page.goto('/');
    await page.getByText(`Welcome, ${ctx.email}!`).isVisible();
});