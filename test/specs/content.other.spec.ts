import EngagementPage from '../pageobjects/engagement.page';
import { ensureLoggedIn, navigateToTab } from '../helpers/appActions';

/**
 * Group E — Content & Other
 *
 * Manual source: MT Gateway Combined Report, section 8.
 * Modules covered: Policies, List Property.
 */
describe('Group E — Content & Other', () => {
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
     * MTG-CNT-001
     * PDF observation: each policy link opens correctly.
     */
    it('MTG-CNT-001 should open Policies from Profile when available', async () => {
        await EngagementPage.openPolicies();

        const hasPolicyContent = await EngagementPage.hasAnyText([
            'Policies',
            'Policy',
            'Privacy',
            'Terms',
            'Refund',
            'Cancellation',
        ]);

        expect(hasPolicyContent).toBe(true);
    });

    /**
     * MTG-CNT-002
     * PDF observation: policy content is formatted correctly.
     * Automation smoke: policy screen should expose readable policy sections.
     */
    it('MTG-CNT-002 should show readable policy content or policy links', async () => {
        await EngagementPage.openPolicies();

        const hasFormattedPolicySurface = await EngagementPage.hasAnyText([
            'Privacy Policy',
            'Terms',
            'Cancellation',
            'Refund',
            'Policy',
            'Last updated',
        ]);

        expect(hasFormattedPolicySurface).toBe(true);
    });

    /**
     * MTG-CNT-003
     * Module 24 appears in the PDF section heading as List Property, but the
     * extracted observation table does not provide detailed expected results.
     */
    it.skip('MTG-CNT-003 List Property automation pending because PDF section 8 has no detailed observation table', async () => {
        await EngagementPage.openListProperty();

        const hasListPropertyContent = await EngagementPage.hasAnyText([
            'List Property',
            'List your property',
            'Add Property',
            'Property',
            'Business',
        ]);

        expect(hasListPropertyContent).toBe(true);
    });
});
