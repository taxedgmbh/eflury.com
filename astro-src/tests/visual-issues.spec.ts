import { test, expect } from '@playwright/test';

test.describe('Visual Issues Detection', () => {
  test('Check for overlapping elements - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    // Check for elements that might overlap
    const header = await page.locator('nav.navbar').boundingBox();
    const mainContent = await page.locator('#main-content').boundingBox();
    const bottomNav = await page.locator('.mobile-bottom-nav').boundingBox();

    if (header && mainContent) {
      expect(header.y + header.height).toBeLessThanOrEqual(mainContent.y);
    }

    // Check bottom nav doesn't overlap content
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    const viewportHeight = 812;
    if (scrollHeight > viewportHeight && bottomNav) {
      expect(bottomNav.y).toBeGreaterThanOrEqual(viewportHeight - bottomNav.height - 20);
    }
  });

  test('Check touch target sizes - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    // Check all buttons and links have minimum 44px touch target
    const buttons = await page.locator('button, a, [role="button"]').all();
    for (const button of buttons) {
      const box = await button.boundingBox();
      if (box) {
        const minSize = 44;
        expect(box.width).toBeGreaterThanOrEqual(minSize - 5); // Allow small margin
        expect(box.height).toBeGreaterThanOrEqual(minSize - 5);
      }
    }
  });

  test('Check safe area insets - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    // Check that safe area CSS variables are used
    const styles = await page.evaluate(() => {
      const body = document.body;
      const computed = window.getComputedStyle(body);
      return {
        paddingTop: computed.paddingTop,
        paddingBottom: computed.paddingBottom,
      };
    });

    // Should have safe area padding
    expect(styles.paddingTop).not.toBe('0px');
  });

  test('Check text overflow - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    // Check for text that might overflow
    const textElements = await page.locator('h1, h2, h3, p, span').all();
    for (const element of textElements.slice(0, 20)) { // Check first 20
      const box = await element.boundingBox();
      const overflow = await element.evaluate((el) => {
        return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
      });
      
      if (box && overflow) {
        console.warn(`Potential text overflow in element: ${await element.textContent()?.substring(0, 50)}`);
      }
    }
  });

  test('Check bottom navigation visibility - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    const bottomNav = page.locator('.mobile-bottom-nav');
    await expect(bottomNav).toBeVisible();
    
    const navItems = await bottomNav.locator('.nav-item').count();
    expect(navItems).toBeGreaterThanOrEqual(4); // Should have at least 4 nav items
  });

  test('Check hero section spacing - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    const hero = await page.locator('.hero').boundingBox();
    const header = await page.locator('nav.navbar').boundingBox();

    if (hero && header) {
      // Hero should have proper spacing from header
      expect(hero.y).toBeGreaterThanOrEqual(header.y + header.height);
    }
  });

  test('Check service cards layout - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/#services', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    const serviceCards = await page.locator('.service-card').all();
    expect(serviceCards.length).toBeGreaterThanOrEqual(4);

    // Check cards don't overlap
    for (let i = 0; i < serviceCards.length - 1; i++) {
      const card1 = await serviceCards[i].boundingBox();
      const card2 = await serviceCards[i + 1].boundingBox();
      
      if (card1 && card2) {
        expect(card2.y).toBeGreaterThanOrEqual(card1.y + card1.height);
      }
    }
  });
});

