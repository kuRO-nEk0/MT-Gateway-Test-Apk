import BasePage from './base.page';

/**
 * LoginPage — Page Object for the MT Gateway login flow.
 *
 * Ported from the exploratory JS page object and typed.
 * Selectors verified against live UI dumps.
 *
 * Flow: Email input → Next → Password input → Log in button.
 */
class LoginPage extends BasePage {
    // ------------------------------------------------------------------
    // Selectors
    // ------------------------------------------------------------------

    /** Email input field on the first login screen. */
    get inputEmail() {
        return $('//android.widget.EditText');
    }

    /** "Next" / arrow button adjacent to email field. */
    get btnNext() {
        return $('//android.widget.EditText/android.widget.Button');
    }

    /** Password input field (second EditText on the password screen). */
    get inputPassword() {
        return $('(//android.widget.EditText)[2]');
    }

    /** "Log in" button on the password screen. */
    get btnLogin() {
        return $('//android.widget.Button[@content-desc="Log in"]');
    }

    // ------------------------------------------------------------------
    // Actions
    // ------------------------------------------------------------------

    /**
     * Perform the full login flow with email + password.
     */
    async login(email: string, password: string): Promise<void> {
        // --- Email screen ---
        await this.waitAndSetValue(await this.inputEmail, email, 15_000);
        await this.pressEnter();
        await this.pause(1_000);
        await this.waitAndClick(await this.btnNext);

        // --- Password screen ---
        await this.waitAndSetValue(await this.inputPassword, password, 15_000);
        await this.pressEnter();
        await this.pause(1_000);
        await this.waitAndClick(await this.btnLogin);
    }
}

export default new LoginPage();
