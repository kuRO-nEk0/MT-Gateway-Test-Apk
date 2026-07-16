# AGENTS.md — Project Memory for MT Gateway (MyTravaly) QA Automation

> Feed this to the agent as workspace memory/rules. Everything below is verified project context. Do not invent app behavior — only assert what is observed on the device/emulator or documented in our manual test reports.

## 1. Who & What

- **Project:** MT Gateway — MyTravaly's Android mobile app (travel/hotel booking + wallet). APK provided by **Mayank Kumar** (QA lead / internship mentor).
- **Team:** Anshuman Rajkonwar (me) + Nazitora Das. Reference manual report also exists from Sourav Deb.
- **My role:** QA Intern. This workspace exists to build **mobile test automation** against the provided APK.
- **Module ownership (manual testing split):**
  - **Anshuman:** Group A — Onboarding & Account Setup (Modules 1–7), Group C — Wallet & Financial Features (Modules 14–18, incl. Wallet Top-Up / Add Funds).
  - **Nazitora:** Group B — Discovery & Booking, Group D — Engagement & Preferences, Group E — Content & Other.

## 2. APK Identity

| Field | Value |
|---|---|
| Package | `com.mytravaly.mytravaly_ta` |
| Launch Activity | `com.mytravaly.mytravaly_ta.MainActivity` |
| Version | 2.0.1 (versionCode 41) |
| Min SDK | 24 (Android 7.0) |
| Target SDK | 36 |

## 3. Automation Stack & Conventions

- **Stack:** Appium (UiAutomator2 driver) + WebdriverIO v9 (TypeScript), Page Object Model.
- **Locator priority:** content-desc → UiSelector description → accessibility id → XPath (last resort).
- **Test case IDs:** follow the manual-report scheme — `MTG-ONB-xxx` (Onboarding), `MTG-WAL-xxx` (Wallet). Automated specs reference their manual counterpart in a comment.
- **Commit style:** small, frequent, descriptive commits so both members' contributions are visible.

## 4. Known Confirmed Bugs (don't "fix", but good candidates for regression specs)

- BUG-ONB-001 — business website field accepts non-URL text.
- BUG-ONB-002 — business postal code accepts alphabetic chars, no auto-population.
- BUG-WAL-001 — Add Funds amount field overflows to scientific notation on oversized input.
- BUG-DSC-001 — policies filter leaks raw backend API validation error (misspelled enum).

## 5. Ground Rules

- Assert only **observed** behavior; when unsure what a screen does, ask or mark TODO — never assume requirements.
- Keep everything runnable locally: Node LTS, Appium 2.x installed as devDep, UiAutomator2 driver, Android emulator or physical device via `adb`.
- Prefer generating specs from the manual test case tables (ID, steps, expected result) rather than inventing scenarios.
- Do **not** modify/rebuild/resign the APK. This is a test target only.
