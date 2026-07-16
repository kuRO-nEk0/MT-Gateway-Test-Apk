/**
 * Test Data for MT Gateway automation.
 *
 * Centralised data store — all test specs import from here.
 * Never hard-code credentials or test values in spec files.
 */

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------

export interface Credentials {
    email: string;
    password: string;
}

export interface GuestDetails {
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
    mobileNumber: string;
}

export interface WalletAmounts {
    valid: string;
    validSmall: string;
    zero: string;
    empty: string;
    negative: string;
    oversized: string;
    decimal: string;
    specialChars: string;
}

// ------------------------------------------------------------------
// Data
// ------------------------------------------------------------------

export const credentials: Credentials = {
    email: 'praneet@mytravaly.in',
    password: 'Praneetmt@10',
};

export const guestDetails: GuestDetails = {
    firstName: 'Test',
    lastName: 'Testsn',
    email: 'test@gmail.com',
    countryCode: '+91',
    mobileNumber: '9663385270',
};

export const searchData = {
    defaultDestination: 'New Property Name23',
};

/**
 * Wallet test amounts — used across Add Funds test cases.
 * Maps to manual test cases MTG-WAL-009 through MTG-WAL-027.
 */
export const walletAmounts: WalletAmounts = {
    valid: '500',           // Happy path — reasonable amount
    validSmall: '1',        // Minimum valid amount
    zero: '0',              // MTG-WAL-009: zero amount → Proceed disabled
    empty: '',              // MTG-WAL-009: empty amount → Proceed disabled
    negative: '-100',       // Negative amount — should be rejected
    oversized: '99999999999999999999', // BUG-WAL-001: overflows to scientific notation
    decimal: '100.50',      // Decimal amount
    specialChars: 'abc!@#', // Non-numeric input
};
