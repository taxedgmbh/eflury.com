import { test, expect } from '@playwright/test';

test.describe('Visual Screenshots', () => {
  test('Homepage - Desktop', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000); // Wait for animations and content
    await page.screenshot({ 
      path: 'screenshots/homepage-desktop.png',
      fullPage: true 
    });
  });

  test('Homepage - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 }); // iPhone 13 size
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    await page.screenshot({ 
      path: 'screenshots/homepage-mobile.png',
      fullPage: true 
    });
  });

  test('Homepage - Mobile Landscape', async ({ page }) => {
    await page.setViewportSize({ width: 812, height: 375 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    await page.screenshot({ 
      path: 'screenshots/homepage-mobile-landscape.png',
      fullPage: true 
    });
  });

  test('English Page - Desktop', async ({ page }) => {
    await page.goto('/en.html', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    await page.screenshot({ 
      path: 'screenshots/en-desktop.png',
      fullPage: true 
    });
  });

  test('English Page - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/en.html', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    await page.screenshot({ 
      path: 'screenshots/en-mobile.png',
      fullPage: true 
    });
  });

  test('German Page - Desktop', async ({ page }) => {
    await page.goto('/de.html', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    await page.screenshot({ 
      path: 'screenshots/de-desktop.png',
      fullPage: true 
    });
  });

  test('German Page - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/de.html', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    await page.screenshot({ 
      path: 'screenshots/de-mobile.png',
      fullPage: true 
    });
  });

  test('Services Section - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/#services');
    await page.waitForTimeout(3000);
    await page.screenshot({ 
      path: 'screenshots/services-mobile.png',
      fullPage: false 
    });
  });

  test('About Section - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/#about');
    await page.waitForTimeout(3000);
    await page.screenshot({ 
      path: 'screenshots/about-mobile.png',
      fullPage: false 
    });
  });

  test('Contact Section - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/#contact');
    await page.waitForTimeout(3000);
    await page.screenshot({ 
      path: 'screenshots/contact-mobile.png',
      fullPage: false 
    });
  });

  test('Bottom Navigation - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    // Scroll to bottom to see bottom nav
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: 'screenshots/bottom-nav-mobile.png',
      fullPage: false 
    });
  });

  test('Header Navigation - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    await page.screenshot({ 
      path: 'screenshots/header-mobile.png',
      fullPage: false 
    });
  });

  test('Mobile Menu Open', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    // Click mobile menu toggle
    const menuToggle = page.locator('#mobileMenuToggle');
    await menuToggle.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: 'screenshots/mobile-menu-open.png',
      fullPage: true 
    });
  });
});

