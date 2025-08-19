import { test, expect } from '@playwright/test';

test.describe('ActionLink Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render action link on homepage', async ({ page }) => {
    // Check that the action link is visible
    const actionLink = page.getByRole('link', { name: 'View component documentation' });
    await expect(actionLink).toBeVisible();
    
    // Check that it has the correct href
    await expect(actionLink).toHaveAttribute('href', '/components');
  });

  test('should have proper visual appearance', async ({ page }) => {
    const actionLink = page.getByRole('link', { name: 'View component documentation' });
    
    // Check that the link contains an icon
    const icon = actionLink.locator('svg');
    await expect(icon).toBeVisible();
    await expect(icon).toHaveAttribute('aria-hidden', 'true');
    
    // Check that the text is present
    await expect(actionLink.getByText('View component documentation')).toBeVisible();
  });

  test('should be keyboard accessible', async ({ page }) => {
    // Tab to the action link
    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Tab'); // Action link
    
    const actionLink = page.getByRole('link', { name: 'View component documentation' });
    await expect(actionLink).toBeFocused();
    
    // Should be able to activate with Enter
    await page.keyboard.press('Enter');
    // Note: Navigation may not work in test environment, but focus should work
  });

  test('should have proper focus styles', async ({ page }) => {
    const actionLink = page.getByRole('link', { name: 'View component documentation' });
    
    // Focus the link
    await actionLink.focus();
    await expect(actionLink).toBeFocused();
    
    // Check that focus styles are applied (this would need visual regression testing for full verification)
    const styles = await actionLink.evaluate((el) => {
      return window.getComputedStyle(el);
    });
    
    // Basic check that it's styled as expected
    expect(styles.textDecoration).toBe('none');
    expect(styles.display).toBe('inline-block');
  });

  test('should have correct color scheme', async ({ page }) => {
    const actionLink = page.getByRole('link', { name: 'View component documentation' });
    
    // Check that the icon has the correct color (green)
    const icon = actionLink.locator('svg');
    const iconStyles = await icon.evaluate((el) => {
      return window.getComputedStyle(el);
    });
    
    // The fill should be green (#007f3b)
    expect(iconStyles.fill).toContain('#007f3b');
  });

  test('should work on different screen sizes', async ({ page }) => {
    // Test desktop
    await page.setViewportSize({ width: 1200, height: 800 });
    const actionLink = page.getByRole('link', { name: 'View component documentation' });
    await expect(actionLink).toBeVisible();
    
    // Test tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(actionLink).toBeVisible();
    
    // Test mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(actionLink).toBeVisible();
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    const actionLink = page.getByRole('link', { name: 'View component documentation' });
    
    // Should have href attribute
    await expect(actionLink).toHaveAttribute('href', '/components');
    
    // Icon should be hidden from screen readers
    const icon = actionLink.locator('svg');
    await expect(icon).toHaveAttribute('aria-hidden', 'true');
    
    // Should have accessible name from text content
    await expect(actionLink).toHaveAccessibleName('View component documentation');
  });

  test('should maintain visual consistency', async ({ page }) => {
    const actionLink = page.getByRole('link', { name: 'View component documentation' });
    
    // Take a screenshot for visual regression testing
    await expect(actionLink).toHaveScreenshot('action-link.png');
  });

  test('should handle hover state', async ({ page }) => {
    const actionLink = page.getByRole('link', { name: 'View component documentation' });
    
    // Hover over the link
    await actionLink.hover();
    
    // Check that it's still visible and functional
    await expect(actionLink).toBeVisible();
    
    // The text should have underline on hover (via CSS)
    const textSpan = actionLink.locator('span');
    await expect(textSpan).toBeVisible();
  });
});