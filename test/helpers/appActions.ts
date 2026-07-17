import LoginPage from '../pageobjects/login.page';
import HomePage from '../pageobjects/home.page';
import { credentials } from '../data/testData';

/**
 * Shared app-level actions used across multiple spec files.
 *
 * These helpers manage app lifecycle and pre-condition setup
 * so that individual test specs stay focused on their own module.
 */

const APP_PACKAGE = 'com.mytravaly.mytravaly_ta';

/**
 * Restart the MT Gateway app (terminate → activate).
 * Useful for resetting to a known screen state between test suites.
 */
export async function restartApp(): Promise<void> {
    await driver.terminateApp(APP_PACKAGE);
    await driver.activateApp(APP_PACKAGE);
    await driver.pause(3_000);
}

/**
 * Ensure the user is logged in.
 *
 * Checks for the home screen search bar — if not found, performs
 * a full login with the default test credentials.
 *
 * Pre-condition for any test that requires an authenticated session.
 */
export async function ensureLoggedIn(): Promise<void> {
    const isLoggedIn = await HomePage.isOnHomeScreen() || await isMainAppShellVisible();

    if (!isLoggedIn) {
        console.log('[appActions] Not on home screen — performing login...');
        await LoginPage.login(credentials.email, credentials.password);
        await driver.pause(3_000);

        // Verify login succeeded
        const onHome = await HomePage.isOnHomeScreen();
        if (!onHome) {
            throw new Error(
                '[appActions] Login failed — home screen not displayed after login attempt.'
            );
        }
        console.log('[appActions] Login successful.');
    } else {
        console.log('[appActions] Already logged in — skipping login.');
    }
}

/**
 * Some specs navigate away from Home into authenticated sub-screens. In that
 * state the Home search bar is absent, but bottom navigation still proves the
 * user is logged in and the app shell is available.
 */
async function isMainAppShellVisible(): Promise<boolean> {
    const mainShellElements = [
        $('android=new UiSelector().description("Home")'),
        $('android=new UiSelector().description("Clients")'),
        $('android=new UiSelector().description("Profile")'),
    ];

    for (const element of mainShellElements) {
        try {
            if (await element.isDisplayed()) {
                return true;
            }
        } catch {
            // Element is not present on the current screen.
        }
    }

    return false;
}

/**
 * Navigate to a bottom-navigation tab by name.
 *
 * @param tabName - One of: 'Home', 'Wallet', 'Profile'
 */
export async function navigateToTab(
    tabName: 'Home' | 'Wallet' | 'Profile'
): Promise<void> {
    switch (tabName) {
        case 'Wallet':
            await HomePage.navigateToWallet();
            break;
        case 'Profile':
            await HomePage.navigateToProfile();
            break;
        case 'Home':
        default:
            // Tap home tab or just restart to get back to home
            const homeTab = await $('android=new UiSelector().description("Home")');
            try {
                await homeTab.waitForDisplayed({ timeout: 5_000 });
                await homeTab.click();
            } catch {
                // Fallback: restart the app to land on home
                await restartApp();
            }
            await driver.pause(2_000);
            break;
    }
}
