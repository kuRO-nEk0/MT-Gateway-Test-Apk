import BasePage from './base.page';

/**
 * HomePage — Page Object for the MT Gateway home / dashboard screen.
 *
 * Ported from the exploratory JS page object and extended with
 * navigation helpers for reaching the Wallet and Profile sections.
 */
class HomePage extends BasePage {
    // ------------------------------------------------------------------
    // Selectors
    // ------------------------------------------------------------------

    /** Search bar trigger on the home screen (content-desc based). */
    get searchBarTrigger() {
        return $('//android.view.View[@content-desc="Search destinations or hotels"]');
    }

    /** Blue "Search" button on the home screen. */
    get btnSearch() {
        return $('//android.widget.Button[@content-desc="Search"]');
    }

    /** Search text input that appears after tapping the search bar. */
    get inputSearch() {
        return $('//android.widget.EditText');
    }

    /**
     * Bottom navigation — Wallet tab.
     * TODO: Capture exact selector from live UI dump. Trying content-desc first.
     */
    get tabWallet() {
        return $('android=new UiSelector().description("Wallet")');
    }

    /**
     * Bottom navigation — Home tab.
     * TODO: Verify selector from live UI dump.
     */
    get tabHome() {
        return $('android=new UiSelector().description("Home")');
    }

    /**
     * Bottom navigation — Profile tab.
     * TODO: Verify selector from live UI dump.
     */
    get tabProfile() {
        return $('android=new UiSelector().description("Profile")');
    }

    // ------------------------------------------------------------------
    // Actions
    // ------------------------------------------------------------------

    /**
     * Search for a property/destination by name.
     */
    async searchForProperty(propertyName: string): Promise<void> {
        await this.waitAndClick(await this.searchBarTrigger, 15_000);

        const input = await this.inputSearch;
        await this.waitAndSetValue(input, propertyName, 5_000);
        await this.pressEnter();
        await this.pause(2_000);

        // Tap the autocomplete suggestion that contains the property name
        const suggestion = await $(
            `//android.widget.Button[contains(@content-desc, "${propertyName}")]`
        );
        await this.waitAndClick(suggestion, 5_000);
        await this.pause(2_000);

        // Tap the blue "Search" button on the home screen
        await this.waitAndClick(await this.btnSearch, 5_000);
    }

    /**
     * Navigate to the Wallet screen via bottom navigation.
     */
    async navigateToWallet(): Promise<void> {
        await this.waitAndClick(await this.tabWallet, 10_000);
        await this.pause(2_000); // wait for wallet screen to load
    }

    /**
     * Navigate to the Profile screen via bottom navigation.
     */
    async navigateToProfile(): Promise<void> {
        await this.waitAndClick(await this.tabProfile, 10_000);
        await this.pause(2_000);
    }

    /**
     * Check whether we're on the home screen by looking for the search bar.
     */
    async isOnHomeScreen(): Promise<boolean> {
        return this.isDisplayed(await this.searchBarTrigger, 5_000);
    }
}

export default new HomePage();
