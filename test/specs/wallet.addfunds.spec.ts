import WalletPage from '../pageobjects/wallet.page';
import { walletAmounts } from '../data/testData';
import { ensureLoggedIn, navigateToTab } from '../helpers/appActions';

/**
 * ═══════════════════════════════════════════════════════════════════
 *  MT Gateway — Wallet Add Funds (Top-Up) Test Suite
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Module:       Wallet & Financial Features (Group C)
 *  Owner:        Anshuman Rajkonwar
 *  Manual Ref:   MTG-WAL-009 → MTG-WAL-027
 *
 *  Pre-condition: User is logged in and Wallet screen is accessible
 *                 via bottom navigation.
 *
 *  ⚠️  IMPORTANT: Wallet page selectors are TODO — run `npm run dump`
 *      on the wallet screen to capture actual element locators before
 *      executing these tests.
 * ═══════════════════════════════════════════════════════════════════
 */

describe('Wallet — Add Funds (Top-Up)', () => {
    // ------------------------------------------------------------------
    // Suite setup: ensure logged in and navigate to wallet
    // ------------------------------------------------------------------

    before(async () => {
        await ensureLoggedIn();
        await navigateToTab('Wallet');

        // Verify we arrived at the wallet screen
        const onWallet = await WalletPage.isOnWalletScreen();
        expect(onWallet).toBe(true);
    });

    // ------------------------------------------------------------------
    // Reset: go back to wallet main after each test
    // ------------------------------------------------------------------

    afterEach(async () => {
        // If we're on the Add Funds screen, go back to wallet main
        await WalletPage.goBackToWallet();
        await driver.pause(1_000);
    });

    // ==================================================================
    // SMOKE — Wallet screen loads and Add Funds button is visible
    // ==================================================================

    /**
     * MTG-WAL-001 (Smoke)
     * Verify the Wallet screen loads with balance display and Add Funds button.
     *
     * Steps:
     *   1. Navigate to Wallet (done in before hook)
     *   2. Assert wallet title is visible
     *   3. Assert balance is displayed
     *   4. Assert "Add Funds" button is visible
     *
     * Expected: All wallet UI elements are present.
     */
    it('should display wallet screen with balance and Add Funds button', async () => {
        // Wallet title
        const titleVisible = await WalletPage.isOnWalletScreen();
        expect(titleVisible).toBe(true);

        // Balance display
        const balance = await WalletPage.getWalletBalance();
        expect(balance).toBeTruthy();
        console.log(`[MTG-WAL-001] Current wallet balance: ${balance}`);

        // Add Funds button
        const addFundsVisible = await WalletPage.isDisplayed(
            await WalletPage.btnAddFunds, 5_000
        );
        expect(addFundsVisible).toBe(true);
    });

    // ==================================================================
    // MTG-WAL-009 — Zero / empty amount → Proceed button disabled
    // ==================================================================

    /**
     * MTG-WAL-009 (Negative)
     * Add Funds: entering zero amount should keep the Proceed button disabled.
     *
     * Steps:
     *   1. Tap "Add Funds"
     *   2. Enter "0" in the amount field
     *   3. Assert Proceed button is disabled or not clickable
     *
     * Expected: Proceed button is disabled. PASS in manual report.
     */
    it('should disable Proceed button when amount is zero — MTG-WAL-009', async () => {
        await WalletPage.tapAddFunds();
        await WalletPage.enterAmount(walletAmounts.zero);

        const isEnabled = await WalletPage.isProceedButtonEnabled();
        expect(isEnabled).toBe(false);
    });

    /**
     * MTG-WAL-009 variant (Negative)
     * Add Funds: leaving the amount field empty should keep Proceed disabled.
     *
     * Steps:
     *   1. Tap "Add Funds"
     *   2. Leave amount field empty (clear any default value)
     *   3. Assert Proceed button is disabled
     *
     * Expected: Proceed button is disabled.
     */
    it('should disable Proceed button when amount is empty — MTG-WAL-009 (empty)', async () => {
        await WalletPage.tapAddFunds();
        await WalletPage.enterAmount(walletAmounts.empty);

        const isEnabled = await WalletPage.isProceedButtonEnabled();
        expect(isEnabled).toBe(false);
    });

    // ==================================================================
    // MTG-WAL-010 — Valid amount → Proceed button enabled (happy path)
    // ==================================================================

    /**
     * MTG-WAL-010 (Positive — Happy Path)
     * Add Funds: entering a valid amount should enable the Proceed button.
     *
     * Steps:
     *   1. Tap "Add Funds"
     *   2. Enter "500" in the amount field
     *   3. Assert Proceed button is enabled / clickable
     *
     * Expected: Proceed button becomes enabled. User can proceed to payment.
     */
    it('should enable Proceed button when a valid amount is entered — MTG-WAL-010', async () => {
        await WalletPage.tapAddFunds();
        await WalletPage.enterAmount(walletAmounts.valid);

        const isEnabled = await WalletPage.isProceedButtonEnabled();
        expect(isEnabled).toBe(true);
    });

    /**
     * MTG-WAL-010 variant (Positive — minimum amount)
     * Add Funds: entering the smallest valid amount (₹1) should still enable Proceed.
     */
    it('should enable Proceed button for minimum valid amount (₹1) — MTG-WAL-010 (min)', async () => {
        await WalletPage.tapAddFunds();
        await WalletPage.enterAmount(walletAmounts.validSmall);

        const isEnabled = await WalletPage.isProceedButtonEnabled();
        expect(isEnabled).toBe(true);
    });

    // ==================================================================
    // MTG-WAL-011 — Oversized amount → Scientific notation bug
    // ==================================================================

    /**
     * MTG-WAL-011 / BUG-WAL-001 (Regression — Known Bug)
     * Add Funds: entering an extremely large number causes the amount field
     * to overflow and display in scientific notation (e.g., "1e+20").
     *
     * Steps:
     *   1. Tap "Add Funds"
     *   2. Enter "99999999999999999999" (20 digits)
     *   3. Read back the amount field value
     *   4. Assert the value does NOT contain "e+" (scientific notation)
     *
     * Expected (ideal): Amount is rejected or capped.
     * Actual (known bug): Amount overflows to scientific notation.
     *
     * This test documents the known bug BUG-WAL-001 — it is expected to FAIL
     * until the bug is fixed. Marked with a comment so CI doesn't block on it.
     */
    it('should NOT display scientific notation for oversized amount — BUG-WAL-001', async () => {
        await WalletPage.tapAddFunds();
        await WalletPage.enterAmount(walletAmounts.oversized);

        const displayedValue = await WalletPage.getAmountFieldValue();
        console.log(`[BUG-WAL-001] Displayed amount value: "${displayedValue}"`);

        // The field should NOT show scientific notation like "1e+20"
        // This assertion documents the bug — expected to fail until fix is deployed
        expect(displayedValue).not.toMatch(/e\+/i);
    });

    // ==================================================================
    // Additional negative tests
    // ==================================================================

    /**
     * MTG-WAL-012 (Negative)
     * Add Funds: entering a negative amount should keep Proceed disabled.
     *
     * Steps:
     *   1. Tap "Add Funds"
     *   2. Enter "-100"
     *   3. Assert Proceed button is disabled
     *
     * Expected: Negative amounts are not accepted.
     */
    it('should not accept negative amount — MTG-WAL-012', async () => {
        await WalletPage.tapAddFunds();
        await WalletPage.enterAmount(walletAmounts.negative);

        const isEnabled = await WalletPage.isProceedButtonEnabled();
        expect(isEnabled).toBe(false);
    });

    /**
     * MTG-WAL-013 (Negative)
     * Add Funds: entering non-numeric characters should not be accepted.
     *
     * Steps:
     *   1. Tap "Add Funds"
     *   2. Enter "abc!@#"
     *   3. Assert Proceed button is disabled or field rejects input
     *
     * Expected: Non-numeric input is rejected.
     */
    it('should not accept non-numeric characters — MTG-WAL-013', async () => {
        await WalletPage.tapAddFunds();
        await WalletPage.enterAmount(walletAmounts.specialChars);

        const isEnabled = await WalletPage.isProceedButtonEnabled();
        expect(isEnabled).toBe(false);
    });

    /**
     * MTG-WAL-014 (Positive)
     * Add Funds: decimal amount should be handled gracefully.
     *
     * Steps:
     *   1. Tap "Add Funds"
     *   2. Enter "100.50"
     *   3. Assert Proceed button is enabled (if decimals are supported)
     *      OR disabled (if only whole numbers are accepted)
     *
     * Expected: TODO — verify actual app behavior and update assertion.
     */
    it('should handle decimal amount gracefully — MTG-WAL-014', async () => {
        await WalletPage.tapAddFunds();
        await WalletPage.enterAmount(walletAmounts.decimal);

        // TODO: Verify actual behavior — does the app support decimal amounts?
        // For now, just verify the field accepted the input without crashing
        const displayedValue = await WalletPage.getAmountFieldValue();
        console.log(`[MTG-WAL-014] Displayed decimal value: "${displayedValue}"`);
        expect(displayedValue).toBeTruthy();
    });
});
