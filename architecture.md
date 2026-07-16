# Architecture & App Flow

## Tech Stack
- **Test Runner:** WebdriverIO (v9)
- **Framework:** Mocha (BDD style - `describe` / `it`)
- **Language:** TypeScript
- **Mobile Automation Engine:** Appium 2.x with `UiAutomator2` Driver
- **Assertions:** `expect-webdriverio`
- **Application:** Android (APK via Emulator/Real Device)

## Application Flow
The test suite mirrors the MT Gateway user journey:
1. **Unauthenticated:** Splash -> Welcome -> Login OR Sign-Up (Onboarding).
2. **Authenticated:** Main Navigation (Home, Discovery, Booking).
3. **Account Management:** Wallet (Add Funds, Cash-out), Profile, Preferences.

## Folder & File Structure
```text
mt-gateway-automation/
├── apps/                        # Holds the target .apk file
├── config/
│   └── wdio.conf.ts             # WebdriverIO & Appium configuration
├── docs/                        # Project documentation (PRD, Architecture, etc.)
├── scripts/
│   └── dump-page-source.ts      # Utility to dump UI XML for locator discovery
├── tech-stack/
│   └── rules.md                 # Rules and boundaries for automation development
├── test/
│   ├── data/                    # Typed mock data (testData.ts)
│   ├── helpers/                 # Global actions (login, navigation)
│   ├── pageobjects/             # Page Object Model (POM) classes
│   │   ├── base.page.ts         # Base class with shared UIAutomator wrappers
│   │   ├── home.page.ts         # Homepage interactions
│   │   ├── login.page.ts        # Authentication flows
│   │   └── wallet.page.ts       # Wallet & Financial screens
│   └── specs/                   # Mocha test suites (.spec.ts)
│       └── wallet.addfunds.spec.ts
├── package.json
└── tsconfig.json                # TypeScript configuration
```

## Design Patterns
1. **Page Object Model (POM):** UI interactions are abstracted into page classes (e.g., `WalletPage`) so that test specs only contain assertions and flow logic.
2. **Base Page Inheritance:** Common gestures (scroll, hide keyboard, wait-and-click) are centralized in `BasePage`.
3. **Data-Driven Approach:** Test inputs (credentials, amounts) are imported from `test/data/testData.ts`.
