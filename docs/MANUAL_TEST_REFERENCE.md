# Manual Test Case Reference — Automation Mapping

> Maps manual test case IDs to their automated spec counterparts.
> Updated as automation coverage grows.

## Legend

| Status | Meaning |
|---|---|
| ✅ Automated | Spec written and verified |
| 🔧 Pending Locators | Spec written, selectors need live dump verification |
| ⬜ Not Started | No automated spec yet |

---

## Wallet & Financial Features (Anshuman — Group C)

### Module: Wallet Top-Up / Add Funds

| Manual ID | Description | Automation Status | Spec File |
|---|---|---|---|
| MTG-WAL-001 | Wallet screen loads with balance & Add Funds button | 🔧 Pending Locators | `wallet.addfunds.spec.ts` |
| MTG-WAL-009 | Zero amount → Proceed disabled | 🔧 Pending Locators | `wallet.addfunds.spec.ts` |
| MTG-WAL-009 (empty) | Empty amount → Proceed disabled | 🔧 Pending Locators | `wallet.addfunds.spec.ts` |
| MTG-WAL-010 | Valid amount → Proceed enabled (happy path) | 🔧 Pending Locators | `wallet.addfunds.spec.ts` |
| MTG-WAL-010 (min) | Minimum valid amount (₹1) → Proceed enabled | 🔧 Pending Locators | `wallet.addfunds.spec.ts` |
| MTG-WAL-011 | Oversized amount → scientific notation (BUG-WAL-001) | 🔧 Pending Locators | `wallet.addfunds.spec.ts` |
| MTG-WAL-012 | Negative amount → Proceed disabled | 🔧 Pending Locators | `wallet.addfunds.spec.ts` |
| MTG-WAL-013 | Non-numeric input → Proceed disabled | 🔧 Pending Locators | `wallet.addfunds.spec.ts` |
| MTG-WAL-014 | Decimal amount handled gracefully | 🔧 Pending Locators | `wallet.addfunds.spec.ts` |
| MTG-WAL-002–008 | Other wallet features | ⬜ Not Started | — |
| MTG-WAL-015–027 | Transaction history, statements, etc. | ⬜ Not Started | — |

---

## Onboarding & Account Setup (Anshuman — Group A)

| Manual ID | Description | Automation Status | Spec File |
|---|---|---|---|
| MTG-ONB-001–032 | Full onboarding flow (32 cases) | ⬜ Not Started | — |

---

## Discovery & Booking (Nazitora — Group B)

### Module: Discovery Search & Booking Flow

| Manual ID | Description | Automation Status | Spec File |
|---|---|---|---|
| MTG-DSC-001 | Home discovery screen loads with search destination field, date selector, guest selector, and Search button | 🔧 Pending Locators | `discovery.search.spec.ts` |
| MTG-DSC-002 | Search button remains disabled when destination is empty | 🔧 Pending Locators | `discovery.search.spec.ts` |
| MTG-DSC-003 | Tapping destination field opens destination/property search input | 🔧 Pending Locators | `discovery.search.spec.ts` |
| MTG-DSC-004 | Entering a valid destination/property shows selectable suggestions | 🔧 Pending Locators | `discovery.search.spec.ts` |
| MTG-DSC-005 | Selecting a destination/property enables the Search button | 🔧 Pending Locators | `discovery.search.spec.ts` |
| MTG-DSC-006 | Search with valid destination, date, and guest count opens search results | ⬜ Not Started | — |
| MTG-DSC-007 | Date selector allows changing check-in/check-out dates | ⬜ Not Started | — |
| MTG-DSC-008 | Guest selector allows changing rooms/adults count | ⬜ Not Started | — |
| MTG-DSC-009 | Search results show available properties or a clear empty-state message | ⬜ Not Started | — |
| MTG-DSC-010 | Search results Retry action refreshes failed/empty property list | 🔧 Pending Locators | `discovery.search.spec.ts` |
| MTG-DSC-011 | Opening a property result displays property detail information | ⬜ Not Started | — |
| MTG-DSC-012 | Property detail screen exposes booking/continue action when available | ⬜ Not Started | — |
| MTG-DSC-013 | Booking flow requires guest details before proceeding | ⬜ Not Started | — |
| MTG-DSC-014 | Booking summary displays selected property, dates, guests, and payable amount | ⬜ Not Started | — |
| MTG-DSC-015 | Back navigation returns from results/details to the previous discovery screen without app crash | ⬜ Not Started | — |
| MTG-DSC-016 | Filters/sorting can be opened from search results when available | ⬜ Not Started | — |
| MTG-DSC-017 | Invalid policies filter does not expose raw backend API validation error (BUG-DSC-001 regression) | ⬜ Not Started | — |

> Note: `MTG-DSC-001` through `MTG-DSC-005` and `MTG-DSC-010` are based on the observed APK home screen dump, which exposes `Search destinations or hotels`, `WHEN`, `WHO`, disabled `Search`, `No popular properties found`, and `Retry`. Result, property detail, filter, and booking selectors still need live UI verification before automation.

---

## Engagement & Preferences (Nazitora — Group D)

| Manual ID | Description | Automation Status | Spec File |
|---|---|---|---|
| MTG-ENG-001 | Profile exposes engagement/preference entry points | 🔧 Pending Locators | `engagement.preferences.spec.ts` |
| MTG-ENG-002 | Achievements opens and shows badge/milestone content | 🔧 Pending Locators | `engagement.preferences.spec.ts` |
| MTG-ENG-003 | Language preferences opens and shows selectable languages | 🔧 Pending Locators | `engagement.preferences.spec.ts` |
| MTG-ENG-004 | Hindi language can be applied and reverted to English | 🔧 Pending Locators | `engagement.preferences.spec.ts` |
| MTG-ENG-005 | Help & Support exposes live chat/support content | 🔧 Pending Locators | `engagement.preferences.spec.ts` |
| MTG-ENG-006 | Help & Support exposes phone validation surface | 🔧 Pending Locators | `engagement.preferences.spec.ts` |
| MTG-ENG-007 | Referral Program | ⬜ Not Started — PDF marks Referral as NOT TESTED | — |

---

## Content & Other (Nazitora — Group E)

| Manual ID | Description | Automation Status | Spec File |
|---|---|---|---|
| MTG-CNT-001 | Policies opens from Profile when available | 🔧 Pending Locators | `content.other.spec.ts` |
| MTG-CNT-002 | Policy screen shows readable policy content or policy links | 🔧 Pending Locators | `content.other.spec.ts` |
| MTG-CNT-003 | List Property | ⬜ Not Started — PDF section names module but has no detailed observation table | — |

> Source: `MT_Gateway_Combined_Report (1).docx.pdf`, section 8, "Groups D & E — Engagement, Preferences & Content". Referral is intentionally not counted as automated coverage because that section marks it as `NOT TESTED`.
