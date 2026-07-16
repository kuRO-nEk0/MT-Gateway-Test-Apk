# Project Proposal & Roadmap

## Phase 1: Foundation & Proof of Concept (Completed)
- **Goal:** Set up the WebdriverIO + Appium + TypeScript boilerplate.
- **Deliverables:**
  - `wdio.conf.ts`, `tsconfig.json`, `package.json`.
  - Base Page Object structure.
  - Implement the first test suite: Wallet Add Funds (MTG-WAL-001 to 014).
  - Define Git Fork-based collaboration workflow.
- **Needed at start:** Basic app capabilities, working Appium server, initial UI dump for Wallet.

## Phase 2: Onboarding & Account Setup (Current)
- **Owner:** Anshuman
- **Goal:** Automate Manual Test Group A (Modules 1-7).
- **Deliverables:**
  - Sign-Up flow tests (Basic details, role selection, business details).
  - Validation tests (Empty fields, invalid emails, invalid postal codes - as logged in manual report).
  - Login & Password reset flows.
- **Needed now:** UI locators for the Onboarding flow (via `npm run dump`).

## Phase 3: Discovery, Booking, & Engagement (Next)
- **Owner:** Nazitora
- **Goal:** Automate Manual Test Groups B, D, & E.
- **Deliverables:**
  - Search functionality and filters (incl. verifying API error bug).
  - Property details and Booking checkout flow.
  - Achievements and Language preference toggles.
- **Process:** Nazitora will fork the repo, create a feature branch, and submit a Pull Request. Merge conflicts will be resolved manually to practice team collaboration.

## Phase 4: CI/CD & Reporting (Future)
- **Goal:** Run tests automatically and generate actionable reports.
- **Deliverables:**
  - GitHub Actions workflow to run Appium tests on a headless emulator.
  - Allure HTML Report generation on PR merges.
- **Needed later:** GitHub repo secrets, Ubuntu runner configuration for Android hardware acceleration.
