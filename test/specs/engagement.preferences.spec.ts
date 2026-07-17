import EngagementPage from '../pageobjects/engagement.page';
import { ensureLoggedIn, navigateToTab } from '../helpers/appActions';

/**
 * Groups D — Engagement & Preferences
 *
 * Manual source: MT Gateway Combined Report, section 8.
 * Modules covered: Achievements, Referral Program, Language Preference,
 * Help & Support.
 */
describe('Groups D — Engagement & Preferences', () => {
    beforeEach(async () => {
        await ensureLoggedIn();
        await navigateToTab('Profile');
    });

    afterEach(async () => {
        try {
            await navigateToTab('Profile');
        } catch {
            await EngagementPage.goBack();
        }
    });

    /**
     * MTG-ENG-001
     * Profile exposes engagement/preference entry points.
     */
    it('MTG-ENG-001 should show engagement and preference entry points on Profile', async () => {
        const hasEngagementEntry = await EngagementPage.hasAnyText([
            'Achievements',
            'Refer a Friend',
            'Referral',
        ]);
        const hasPreferenceEntry = await EngagementPage.hasAnyText([
            'Language',
            'Get Help',
            'Help',
            'Support',
        ]);

        expect(hasEngagementEntry).toBe(true);
        expect(hasPreferenceEntry).toBe(true);
    });

    /**
     * MTG-ENG-002
     * PDF observation: correct trigger unlocks the correct badge.
     * Automation smoke: Achievements screen opens and shows badge/milestone UI.
     */
    it('MTG-ENG-002 should open Achievements and show badge or milestone content', async function () {
        const hasAchievementsEntry = await EngagementPage.hasEntryByPattern('(?i).*achievements.*');
        if (!hasAchievementsEntry) {
            console.warn('[MTG-ENG-002] Achievements entry is not exposed in this APK build; skipping.');
            this.skip();
        }

        await EngagementPage.openAchievements();

        const hasAchievementContent = await EngagementPage.hasAnyText([
            'Achievements',
            'Unlocking Soon',
            'Unlocked Wins',
            'Upcoming Milestones',
            'Architect',
            'Complete 50 bookings',
        ]);

        expect(hasAchievementContent).toBe(true);
    });

    /**
     * MTG-ENG-003
     * PDF observation: all static text updates on language change.
     */
    it('MTG-ENG-003 should open Language preferences and show selectable languages', async () => {
        await EngagementPage.openLanguage();

        const hasLanguageOptions = await EngagementPage.hasAnyText([
            'Language',
            'English',
            'Hindi',
            'हिन्दी',
            'हिंदी',
        ]);

        expect(hasLanguageOptions).toBe(true);
    });

    /**
     * MTG-ENG-004
     * PDF observation: reverting language restores correctly.
     */
    it('MTG-ENG-004 should apply Hindi static text and allow reverting to English when options are available', async () => {
        await EngagementPage.openLanguage();

        const selectedHindi = await EngagementPage.selectLanguageByName('Hindi');
        if (selectedHindi) {
            expect(await EngagementPage.hasIndicText()).toBe(true);

            await EngagementPage.openLanguage();
            const selectedEnglish = await EngagementPage.selectLanguageByName('English');
            expect(selectedEnglish).toBe(true);
            expect(await EngagementPage.hasAnyText(['Profile', 'Language', 'Home'])).toBe(true);
        } else {
            expect(await EngagementPage.hasAnyText(['Hindi', 'हिन्दी', 'हिंदी'])).toBe(true);
        }
    });

    /**
     * MTG-ENG-005
     * PDF observation: live chat connects correctly.
     */
    it('MTG-ENG-005 should open Help & Support and expose live chat/support content', async () => {
        await EngagementPage.openHelp();

        const hasHelpContent = await EngagementPage.hasAnyText([
            'Help',
            'Support',
            'Live chat',
            'Chat',
            'Phone',
            'Contact',
        ]);

        expect(hasHelpContent).toBe(true);
    });

    /**
     * MTG-ENG-006
     * PDF observation: validates the phone number provided.
     */
    it('MTG-ENG-006 should keep Help & Support reachable for phone validation flow', async () => {
        await EngagementPage.openHelp();

        const hasPhoneValidationSurface = await EngagementPage.hasAnyText([
            'Phone',
            'Mobile',
            'Number',
            'Live chat',
            'Chat',
        ]);

        expect(hasPhoneValidationSurface).toBe(true);
    });

    /**
     * MTG-ENG-007
     * PDF status: Referral feature NOT TESTED in Nazitora's section.
     * Keep this pending until manual source has accepted expected results.
     */
    it.skip('MTG-ENG-007 Referral Program automation pending because PDF marks Referral as NOT TESTED', async () => {
        await EngagementPage.openReferral();
    });
});
