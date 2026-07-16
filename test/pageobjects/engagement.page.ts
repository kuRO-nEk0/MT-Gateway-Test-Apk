import BasePage from './base.page';

/**
 * EngagementPage — Profile-driven flows for Groups D & E.
 *
 * Source: MT_Gateway_Combined_Report, section 8:
 * Groups D & E — Engagement, Preferences & Content.
 *
 * The installed APK exposes these modules from the Profile area. Selectors use
 * accessibility descriptions where possible because this Flutter app has few
 * stable resource IDs.
 */
class EngagementPage extends BasePage {
    private byDescriptionMatch(pattern: string) {
        return $(`android=new UiSelector().descriptionMatches("${pattern}")`);
    }

    get achievementsEntry() {
        return this.byDescriptionMatch('(?i).*achievements.*');
    }

    get referralEntry() {
        return this.byDescriptionMatch('(?i).*(refer a friend|referral|refer).*');
    }

    get languageEntry() {
        return this.byDescriptionMatch('(?i).*language.*');
    }

    get helpEntry() {
        return this.byDescriptionMatch('(?i).*(get help|help|support|live chat).*');
    }

    get policiesEntry() {
        return this.byDescriptionMatch('(?i).*(policies|policy|privacy|terms).*');
    }

    get listPropertyEntry() {
        return this.byDescriptionMatch('(?i).*(list property|list your property|add property).*');
    }

    get liveChatEntry() {
        return this.byDescriptionMatch('(?i).*(live chat|chat).*');
    }

    get phoneInput() {
        return $('android=new UiSelector().className("android.widget.EditText")');
    }

    async hasText(text: string): Promise<boolean> {
        const source = await driver.getPageSource();
        return source.toLowerCase().includes(text.toLowerCase());
    }

    async hasAnyText(texts: string[]): Promise<boolean> {
        const source = (await driver.getPageSource()).toLowerCase();
        return texts.some((text) => source.includes(text.toLowerCase()));
    }

    async hasEntryByPattern(pattern: string): Promise<boolean> {
        const entry = this.byDescriptionMatch(pattern);
        return this.isDisplayed(entry, 2_000);
    }

    async hasIndicText(): Promise<boolean> {
        const source = await driver.getPageSource();
        return /[\u0900-\u097F]/.test(source);
    }

    async tapEntryByPattern(pattern: string, maxScrolls = 4): Promise<void> {
        for (let attempt = 0; attempt <= maxScrolls; attempt += 1) {
            const entry = this.byDescriptionMatch(pattern);
            if (await this.isDisplayed(entry, 2_000)) {
                await entry.click();
                await this.pause(1_500);
                return;
            }
            await this.scrollDown(0.35);
            await this.pause(500);
        }

        throw new Error(`Profile entry not found for pattern: ${pattern}`);
    }

    async openAchievements(): Promise<void> {
        await this.tapEntryByPattern('(?i).*achievements.*');
    }

    async openReferral(): Promise<void> {
        await this.tapEntryByPattern('(?i).*(refer a friend|referral|refer).*');
    }

    async openLanguage(): Promise<void> {
        await this.tapEntryByPattern('(?i).*language.*');
    }

    async openHelp(): Promise<void> {
        await this.tapEntryByPattern('(?i).*(get help|help|support|live chat).*');
    }

    async openPolicies(): Promise<void> {
        await this.tapEntryByPattern('(?i).*(policies|policy|privacy|terms).*');
    }

    async openListProperty(): Promise<void> {
        await this.tapEntryByPattern('(?i).*(list property|list your property|add property).*');
    }

    async selectLanguageByName(languageName: string): Promise<boolean> {
        const option = this.byDescriptionMatch(`(?i).*${languageName}.*`);
        if (!(await this.isDisplayed(option, 5_000))) {
            return false;
        }

        await option.click();
        await this.pause(2_000);
        return true;
    }

    async goBack(): Promise<void> {
        await this.pressBack();
        await this.pause(1_000);
    }
}

export default new EngagementPage();
