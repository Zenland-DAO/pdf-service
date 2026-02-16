/**
 * Browser Pool Manager
 * 
 * Keeps a Puppeteer browser instance running for fast PDF generation.
 * Instead of launching a new browser for each request (~3-5s),
 * we reuse the same browser and just open new pages (~200-500ms).
 */

import puppeteer, { Browser, Page } from 'puppeteer';

class BrowserPool {
  private browser: Browser | null = null;
  private initPromise: Promise<Browser> | null = null;
  private isClosing = false;

  /**
   * Initialize the browser pool
   */
  async init(): Promise<Browser> {
    if (this.browser) {
      return this.browser;
    }

    // Prevent multiple simultaneous initializations
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this.launchBrowser();
    this.browser = await this.initPromise;
    this.initPromise = null;

    return this.browser;
  }

  /**
   * Launch a new browser instance
   */
  private async launchBrowser(): Promise<Browser> {
    console.log('🚀 Launching browser pool...');
    
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        // Performance optimizations
        '--disable-background-networking',
        '--disable-default-apps',
        '--disable-extensions',
        '--disable-sync',
        '--disable-translate',
        '--metrics-recording-only',
        '--mute-audio',
        '--safebrowsing-disable-auto-update',
      ],
    });

    // Handle browser disconnection
    browser.on('disconnected', () => {
      if (!this.isClosing) {
        console.log('⚠️ Browser disconnected, will reconnect on next request');
        this.browser = null;
      }
    });

    console.log('✅ Browser pool ready');
    return browser;
  }

  /**
   * Get a new page from the pool
   * This is the fast operation (~50-100ms)
   */
  async getPage(): Promise<Page> {
    const browser = await this.init();
    const page = await browser.newPage();
    
    // Set default viewport for A4-like dimensions
    await page.setViewport({
      width: 794, // A4 width at 96 DPI
      height: 1123, // A4 height at 96 DPI
      deviceScaleFactor: 2, // High resolution
    });

    return page;
  }

  /**
   * Release a page back to the pool (closes it)
   */
  async releasePage(page: Page): Promise<void> {
    try {
      await page.close();
    } catch (error) {
      // Page might already be closed
    }
  }

  /**
   * Close the browser pool
   */
  async close(): Promise<void> {
    this.isClosing = true;
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
    console.log('👋 Browser pool closed');
  }

  /**
   * Health check
   */
  isHealthy(): boolean {
    return this.browser !== null && this.browser.connected;
  }
}

// Singleton instance
export const browserPool = new BrowserPool();

// Graceful shutdown
process.on('SIGINT', async () => {
  await browserPool.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await browserPool.close();
  process.exit(0);
});
