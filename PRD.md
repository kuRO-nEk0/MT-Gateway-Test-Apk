# Project Requirements Document (PRD)

## What to Build
An automated end-to-end (E2E) testing framework for the **MT Gateway (MyTravaly)** Android mobile application. The framework will automate the manual test cases defined in the MT Gateway Combined Manual Test Execution Report (59 structured test cases + 19 observations).

## Target Tech/Users
- **Primary Users:** QA Team (Anshuman Rajkonwar, Nazitora Das), QA Lead (Mayank Kumar).
- **Target Application:** MT Gateway Android App (`com.mytravaly.mytravaly_ta`).
- **Environment:** Android Emulators and physical Android devices.

## Features & Scope
The automation suite must cover the following core modules:
1. **Group A: Onboarding & Account Setup** (Sign-Up, Currency, Role, Business Details, Compliance, Login).
2. **Group B: Discovery & Booking** (Homepage, Search, Property Details, Review, Payment).
3. **Group C: Wallet & Financial Features** (Profile, Wallet Top-Up, Transaction History, Markup, Cash-Out).
4. **Group D & E: Engagement & Content** (Achievements, Referral, Language, Policies).

### Key Technical Requirements
- **Page Object Model (POM):** Reusable UI definitions separating test logic from locators.
- **Robust Locators:** Preference for accessibility IDs (`content-desc`) and `UiSelector` over XPath.
- **Reporting:** HTML/Allure reporting with automatic screenshot capture on test failure.
- **Collaboration:** Fork-based Git workflow to allow independent module development and conflict-resolution practice.
