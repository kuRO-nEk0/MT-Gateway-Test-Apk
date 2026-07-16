import { remote } from 'webdriverio';
import fs from 'fs';
import path from 'path';

/**
 * dump-page-source.ts — Quick utility to dump the current screen's XML source.
 *
 * Usage:
 *   1. Start Appium server:    npx appium
 *   2. Navigate to the desired screen on the emulator manually
 *   3. Run this script:        npm run dump
 *
 * The XML output is saved to ./dumps/ with a timestamp.
 * Use the XML to identify element selectors (content-desc, resource-id, text).
 *
 * Pre-requisite: Appium server must be running on port 4723.
 */

(async () => {
    console.log('🔌 Connecting to Appium server on port 4723...');

    const browser = await remote({
        port: 4723,
        capabilities: {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:noReset': true, // Don't restart the app — dump current screen
        },
    });

    console.log('✅ Connected! Dumping page source...');

    const source = await browser.getPageSource();

    // Create dumps directory if it doesn't exist
    const dumpsDir = path.resolve(__dirname, '../dumps');
    if (!fs.existsSync(dumpsDir)) {
        fs.mkdirSync(dumpsDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `page-dump-${timestamp}.xml`;
    const filepath = path.join(dumpsDir, filename);

    fs.writeFileSync(filepath, source);
    console.log(`📄 Page source saved to: ${filepath}`);
    console.log(`   File size: ${(source.length / 1024).toFixed(1)} KB`);

    await browser.deleteSession();
    console.log('🔌 Session closed.');
})().catch((e) => {
    console.error('❌ Failed to dump page source:', e.message);
    process.exit(1);
});
