# Rules & Boundaries

## What to Use
- **TypeScript:** Use strict typing. Export classes as default, use interfaces for data models.
- **WebdriverIO APIs:** Use modern `await $()` and `await $$()` syntax.
- **Explicit Waits:** Always use `waitForDisplayed()`, `waitForClickable()`, or `waitUntil()`.
- **Accessibility Selectors:** Prefer `~content-desc` or `new UiSelector().text("...")` for Flutter/Android apps.
- **Base Page Methods:** Call inherited methods (e.g., `this.waitAndClick(element)`) instead of duplicating logic.

## What to Avoid
- **Avoid Hardcoded Sleeps:** Never use `await browser.pause(5000)` to fix flakiness. Wait on specific element states instead.
- **Avoid Absolute XPaths:** Do not use deeply nested XPaths (`//android.widget.FrameLayout[1]/.../android.widget.TextView`). They will break on UI updates.
- **Avoid UI Logic in Specs:** Do not put element selectors directly inside `.spec.ts` files. They belong in `pageobjects`.
- **Do not modify the APK:** Work with the provided `com.mytravaly.mytravaly_ta` app as a black-box.

## Libraries & Error Handling
- **Assertions:** Use `expect(element).toBeDisplayed()`, `expect(element).toHaveText()`.
- **Failure Handling:** The framework is configured in `wdio.conf.ts` to automatically take a screenshot on test failure (`afterTest` hook). Do not implement manual screenshot logic in individual tests.

## Boundaries for AI / Automation
1. **Do not invent app behavior:** Only assert what is documented in the manual test reports or observed dynamically on the emulator.
2. **Locator Discovery:** If a locator is unknown, rely on the `npm run dump` utility to extract the XML UI tree from the running emulator rather than guessing IDs.
3. **No Direct Backend/DB Access:** This is a pure Black-Box E2E UI automation suite. Validations must happen through the Mobile UI.
