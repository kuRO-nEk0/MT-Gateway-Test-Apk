import BasePage from './base.page';

/**
 * WalletPage — Page Object for the Wallet & Add Funds screens.
 *
 * ⚠️  IMPORTANT: Selectors below are best-guess based on common Flutter/RN
 *    patterns and the app's naming conventions. They MUST be verified against
 *    a live Appium UI dump of the wallet screen.
 *
 *    To capture a dump:
 *      1. Navigate to the Wallet screen on the emulator
 *      2. Run: npm run dump
 *      3. Update selectors below with actual content-desc / resource-id values
 *
 * Module: Wallet & Financial Features (Anshuman — Group C, Modules 14–18)
 */
class WalletPage extends BasePage {
    // ==================================================================
    // WALLET MAIN SCREEN — Selectors
    // ==================================================================

    /**
     * Wallet screen title / header.
     * TODO: Capture from live dump — try content-desc="Wallet" or similar.
     */
    get walletTitle() {
        return $('//android.view.View[@content-desc="Wallet"]');
    }

    /**
     * Current wallet balance display.
     * TODO: Capture from live dump — look for content-desc containing "INR" or balance amount.
     */
    get walletBalance() {
        // Fallback: match any View whose content-desc starts with "INR" or "₹"
        return $('//android.view.View[contains(@content-desc, "INR") or contains(@content-desc, "₹")]');
    }

    /**
     * "Add Funds" / "Top Up" button on the wallet main screen.
     * TODO: Capture from live dump.
     */
    get btnAddFunds() {
        return $(
            `android=new UiSelector().descriptionMatches("(?i).*(add funds|top.?up|add money).*")`
        );
    }

    /**
     * Transaction history list / container.
     * TODO: Capture from live dump.
     */
    get transactionList() {
        return $('//android.widget.ScrollView');
    }

    // ==================================================================
    // ADD FUNDS SCREEN — Selectors
    // ==================================================================

    /**
     * Amount input field on the Add Funds screen.
     * TODO: Capture from live dump.
     */
    get inputAmount() {
        return $('//android.widget.EditText');
    }

    /**
     * "Proceed" / "Add" / "Continue" button on the Add Funds screen.
     * TODO: Capture from live dump — might be "Proceed" or "Add Money".
     */
    get btnProceed() {
        return $(
            `android=new UiSelector().descriptionMatches("(?i).*(proceed|continue|add money|add funds|pay).*")`
        );
    }

    /**
     * Back / close button on the Add Funds screen.
     * TODO: Capture from live dump.
     */
    get btnBack() {
        // Most Flutter apps use a plain Button at top-left with no content-desc
        return $('//android.view.View/android.widget.Button[1]');
    }

    /**
     * Error message or validation text displayed on the Add Funds screen.
     * TODO: Capture from live dump — look for red text or error-related content-desc.
     */
    get errorMessage() {
        return $(
            `android=new UiSelector().descriptionMatches("(?i).*(error|invalid|please enter|minimum).*")`
        );
    }

    /**
     * Preset amount buttons (e.g., ₹100, ₹500, ₹1000).
     * TODO: Verify if preset amounts exist on this screen.
     */
    get presetAmountButtons() {
        return $$('//android.widget.Button[contains(@content-desc, "₹") or contains(@content-desc, "INR")]');
    }

    // ==================================================================
    // ACTIONS
    // ==================================================================

    /**
     * Tap the "Add Funds" button from the wallet main screen.
     */
    async tapAddFunds(): Promise<void> {
        await this.waitAndClick(await this.btnAddFunds, 10_000);
        await this.pause(2_000); // wait for Add Funds screen
    }

    /**
     * Enter an amount into the Add Funds amount field.
     */
    async enterAmount(amount: string): Promise<void> {
        const input = await this.inputAmount;
        await input.waitForDisplayed({ timeout: 10_000 });
        await input.click();
        // Clear any existing value first
        await input.clearValue();
        if (amount.length > 0) {
            await input.setValue(amount);
        }
        await this.hideKeyboard();
    }

    /**
     * Tap the Proceed / submit button on the Add Funds screen.
     */
    async tapProceed(): Promise<void> {
        await this.waitAndClick(await this.btnProceed, 10_000);
    }

    /**
     * Get the current text value of the amount input field.
     */
    async getAmountFieldValue(): Promise<string> {
        const input = await this.inputAmount;
        await input.waitForDisplayed({ timeout: 10_000 });
        // Try getAttribute('text') first, fallback to getValue()
        const text = await input.getAttribute('text');
        return text || '';
    }

    /**
     * Check whether the Proceed button is enabled (clickable).
     */
    async isProceedButtonEnabled(): Promise<boolean> {
        const btn = await this.btnProceed;
        try {
            await btn.waitForDisplayed({ timeout: 5_000 });
            return await btn.isEnabled();
        } catch {
            return false;
        }
    }

    /**
     * Check whether the Proceed button is currently displayed.
     */
    async isProceedButtonDisplayed(): Promise<boolean> {
        return this.isDisplayed(await this.btnProceed, 5_000);
    }

    /**
     * Get the error/validation message text if visible.
     * Returns empty string if no error is displayed.
     */
    async getErrorMessage(): Promise<string> {
        try {
            const el = await this.errorMessage;
            await el.waitForDisplayed({ timeout: 3_000 });
            return (await el.getAttribute('content-desc')) || (await el.getText()) || '';
        } catch {
            return '';
        }
    }

    /**
     * Check if the wallet screen title is displayed (useful to confirm navigation).
     */
    async isOnWalletScreen(): Promise<boolean> {
        return this.isDisplayed(await this.walletTitle, 5_000);
    }

    /**
     * Get the wallet balance text.
     */
    async getWalletBalance(): Promise<string> {
        const el = await this.walletBalance;
        await el.waitForDisplayed({ timeout: 10_000 });
        return (await el.getAttribute('content-desc')) || '';
    }

    /**
     * Navigate back from Add Funds screen to wallet main screen.
     */
    async goBackToWallet(): Promise<void> {
        await this.pressBack();
        await this.pause(1_500);
    }
}

export default new WalletPage();
