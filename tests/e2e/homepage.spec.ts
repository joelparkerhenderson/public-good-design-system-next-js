import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load and display the homepage correctly', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/Public Good Design System/);

    // Check main heading
    await expect(page.getByRole('heading', { name: 'Public Good Design System' })).toBeVisible();

    // Check description
    await expect(page.getByText('A modern, accessible React component library')).toBeVisible();

    // Check that all feature cards are visible
    await expect(page.getByText('🎨 Design Tokens')).toBeVisible();
    await expect(page.getByText('♿ Accessibility First')).toBeVisible();
    await expect(page.getByText('🌍 Internationalization')).toBeVisible();
    await expect(page.getByText('🧪 Testing')).toBeVisible();
    await expect(page.getByText('📦 35 Components')).toBeVisible();
    await expect(page.getByText('🚀 Next.js Ready')).toBeVisible();

    // Check development status section
    await expect(page.getByRole('heading', { name: 'Development Status' })).toBeVisible();
  });

  test('should have proper skip link for accessibility', async ({ page }) => {
    await page.goto('/');

    // Check skip link exists but is hidden initially
    const skipLink = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skipLink).toBeInViewport();

    // Focus the skip link and check it becomes visible
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
  });

  test('should have proper semantic structure', async ({ page }) => {
    await page.goto('/');

    // Check main landmark exists
    const main = page.getByRole('main');
    await expect(main).toBeVisible();
    await expect(main).toHaveAttribute('id', 'main-content');

    // Check heading hierarchy
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();

    const h2 = page.getByRole('heading', { level: 2, name: 'Development Status' });
    await expect(h2).toBeVisible();

    const h3Headings = page.getByRole('heading', { level: 3 });
    await expect(h3Headings).toHaveCount(6); // Six feature cards
  });

  test('should be responsive', async ({ page }) => {
    await page.goto('/');

    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.getByRole('heading', { name: 'Public Good Design System' })).toBeVisible();

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByRole('heading', { name: 'Public Good Design System' })).toBeVisible();

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading', { name: 'Public Good Design System' })).toBeVisible();
  });

  test('should have proper focus management', async ({ page }) => {
    await page.goto('/');

    // Tab through the page and ensure focus is visible
    await page.keyboard.press('Tab'); // Skip link
    await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();

    // Continue tabbing to check other focusable elements
    await page.keyboard.press('Tab');
    // Add more tab navigation tests as components are added
  });
});