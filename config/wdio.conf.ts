import path from 'path';
import { ReportAggregator, HtmlReporter } from 'wdio-html-nice-reporter';

let reportAggregator: any;

export const config: WebdriverIO.Config = {
    // ==================
    // Runner & Server
    // ==================
    runner: 'local',
    port: 4723,
    // hostname: 'localhost', // default

    // ==================
    // Test Files
    // ==================
    specs: [
        '../test/specs/**/*.spec.ts'
    ],
    exclude: [],

    // ==================
    // Capabilities
    // ==================
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': process.env.DEVICE_NAME || 'Pixel_8',
        'appium:automationName': 'UiAutomator2',

        // MT Gateway APK identity (from: aapt dump badging app-release.apk)
        'appium:appPackage': 'com.mytravaly.mytravaly_ta',
        'appium:appActivity': '.MainActivity',

        // Use `app` for fresh-install runs:
        // 'appium:app': path.resolve(__dirname, '../apps/app-release.apk'),

        // Keep app state between tests (logged-in session persists)
        'appium:noReset': true,
        'appium:fullReset': false,

        // Let Appium install/refresh the UiAutomator2 helper server on fresh emulators.
        'appium:skipServerInstallation': false,
    }],

    // ==================
    // Test Framework
    // ==================
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 180_000, // 3 min — generous for mobile
    },

    // ==================
    // Logging
    // ==================
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10_000,
    connectionRetryTimeout: 120_000,
    connectionRetryCount: 3,

    // ==================
    // Services
    // ==================
    services: [
        ['appium', {
            // Let wdio manage the Appium server lifecycle
            args: {
                relaxedSecurity: true,
            },
        }],
    ],

    // ==================
    // Reporters
    // ==================
    reporters: [
        'spec',
        ['json', {
            outputDir: './reports/json/',
            outputFileFormat: (opts: any) => `results-${opts.cid}.json`,
        }],
        ['html-nice', {
            outputDir: './reports/html/',
            filename: 'master-report.html',
            reportTitle: 'MT Gateway — Test Automation Report',
            linkScreenshots: true,
            showInBrowser: true,
            collapseTests: false,
            useOnAfterCommandForScreenshot: true,
        }],
    ],

    // ==================
    // Hooks
    // ==================
    onPrepare(_config: any, capabilities: any) {
        reportAggregator = new ReportAggregator({
            outputDir: './reports/html/',
            filename: 'master-report.html',
            reportTitle: 'MT Gateway — Test Automation Report',
            browserName: (capabilities as any)[0]?.browserName || 'Android',
            collapseTests: true,
        });
        reportAggregator.clean();
    },

    onComplete() {
        (async () => {
            await reportAggregator.createReport();
        })();
    },

    /**
     * Take a screenshot on test failure — saved alongside the HTML report.
     */
    afterTest(test: any, _context: any, result: { error?: Error; passed: boolean }) {
        if (!result.passed) {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const screenshotName = `FAIL-${test.parent}-${test.title}-${timestamp}`.replace(/\s+/g, '_');
            browser.saveScreenshot(`./reports/screenshots/${screenshotName}.png`);
        }
    },
};
