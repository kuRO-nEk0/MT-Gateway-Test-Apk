/**
 * BasePage — Abstract base class for all Page Objects.
 *
 * Provides reusable helpers for common Appium interactions so that
 * individual page objects stay lean and focused on selectors + flows.
 *
 * Note: WebdriverIO v9 `$()` returns `ChainablePromiseElement` which auto-
 * resolves to `Element`. All helpers accept either type via a union.
 */

/** Accepts both ChainablePromiseElement (from $()) and resolved Element */
type AnyElement = WebdriverIO.Element | ChainablePromiseElement;

export default class BasePage {
    // ------------------------------------------------------------------
    // Element interaction helpers
    // ------------------------------------------------------------------

    /**
     * Wait for an element to be displayed, then click it.
     */
    protected async waitAndClick(
        element: AnyElement,
        timeout = 10_000
    ): Promise<void> {
        await (element as WebdriverIO.Element).waitForDisplayed({ timeout });
        await (element as WebdriverIO.Element).click();
    }

    /**
     * Wait for an element, click it, then set its value.
     * Useful for text inputs in Flutter / React Native apps where
     * you often need to explicitly focus before typing.
     */
    protected async waitAndSetValue(
        element: AnyElement,
        value: string,
        timeout = 10_000
    ): Promise<void> {
        await (element as WebdriverIO.Element).waitForDisplayed({ timeout });
        await (element as WebdriverIO.Element).click();
        await (element as WebdriverIO.Element).setValue(value);
    }

    /**
     * Check if an element is currently displayed on screen.
     * Returns false instead of throwing if the element doesn't exist.
     */
    public async isDisplayed(
        element: AnyElement,
        timeout = 5_000
    ): Promise<boolean> {
        try {
            await (element as WebdriverIO.Element).waitForDisplayed({ timeout });
            return true;
        } catch {
            return false;
        }
    }

    // ------------------------------------------------------------------
    // Scroll helpers (W3C Actions API)
    // ------------------------------------------------------------------

    /**
     * Scroll down by performing a swipe gesture from bottom → top.
     * @param distance - Fraction of screen height to scroll (0–1). Default 0.5.
     */
    protected async scrollDown(distance = 0.5): Promise<void> {
        const { width, height } = await driver.getWindowRect();
        const startX = Math.floor(width / 2);
        const startY = Math.floor(height * 0.8);
        const endY = Math.floor(height * (0.8 - distance));

        await driver.action('pointer', { parameters: { pointerType: 'touch' } })
            .move({ x: startX, y: startY })
            .down()
            .move({ x: startX, y: endY, duration: 800 })
            .up()
            .perform();
    }

    /**
     * Scroll up by performing a swipe gesture from top → bottom.
     * @param distance - Fraction of screen height to scroll (0–1). Default 0.5.
     */
    protected async scrollUp(distance = 0.5): Promise<void> {
        const { width, height } = await driver.getWindowRect();
        const startX = Math.floor(width / 2);
        const startY = Math.floor(height * 0.2);
        const endY = Math.floor(height * (0.2 + distance));

        await driver.action('pointer', { parameters: { pointerType: 'touch' } })
            .move({ x: startX, y: startY })
            .down()
            .move({ x: startX, y: endY, duration: 800 })
            .up()
            .perform();
    }

    // ------------------------------------------------------------------
    // Keyboard helpers
    // ------------------------------------------------------------------

    /**
     * Press the Android Enter / Done key (keycode 66).
     */
    protected async pressEnter(): Promise<void> {
        await driver.pressKeyCode(66);
    }

    /**
     * Press the Android Back button (keycode 4).
     */
    protected async pressBack(): Promise<void> {
        await driver.pressKeyCode(4);
    }

    /**
     * Hide the soft keyboard if it's visible.
     */
    protected async hideKeyboard(): Promise<void> {
        try {
            await driver.hideKeyboard();
        } catch {
            // Keyboard wasn't visible — safe to ignore
        }
    }

    // ------------------------------------------------------------------
    // App lifecycle helpers
    // ------------------------------------------------------------------

    /**
     * Restart the MT Gateway app (terminate + activate).
     */
    protected async restartApp(): Promise<void> {
        await driver.terminateApp('com.mytravaly.mytravaly_ta');
        await driver.activateApp('com.mytravaly.mytravaly_ta');
        await driver.pause(3_000); // wait for splash / home to load
    }

    /**
     * Pause for a fixed duration. Use sparingly — prefer explicit waits.
     */
    protected async pause(ms: number): Promise<void> {
        await driver.pause(ms);
    }
}
