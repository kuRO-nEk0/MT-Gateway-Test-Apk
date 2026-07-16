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

| Manual ID | Description | Automation Status | Spec File |
|---|---|---|---|
| MTG-DSC-xxx | Discovery & booking flows | ⬜ Not Started | — |

---

## Engagement & Preferences (Nazitora — Group D)

| Manual ID | Description | Automation Status | Spec File |
|---|---|---|---|
| MTG-ENG-xxx | Engagement features | ⬜ Not Started | — |

---

## Content & Other (Nazitora — Group E)

| Manual ID | Description | Automation Status | Spec File |
|---|---|---|---|
| MTG-CNT-xxx | Content features | ⬜ Not Started | — |
