# MT Gateway — Mobile Test Automation

> Appium + WebdriverIO (TypeScript) automated test suite for the **MyTravaly Gateway** Android app.

## 📋 Quick Start

### Prerequisites

| Tool | Version | Install |
|---|---|---|
| Node.js | 24.x LTS | [nodejs.org](https://nodejs.org) |
| Android SDK | Latest | Android Studio → SDK Manager |
| Java JDK | 11+ | `brew install openjdk@11` |
| Emulator / Device | Android 7.0+ | AVD Manager or physical device via USB |

### Setup

```bash
# 1. Clone the repo
git clone <repo-url>
cd mt-gateway-automation

# 2. Install dependencies (includes Appium + UiAutomator2 driver)
npm install

# 3. Copy env template and configure
cp .env.example .env
# Edit .env with your ANDROID_HOME path and device name

# 4. Place the APK
# Either copy app-release.apk to ./apps/ or keep it at ../app-release.apk
# The config references the APK by package name (noReset mode), so the app
# must already be installed on the emulator/device.

# 5. Start the emulator
emulator -avd Pixel_8  # or use AVD Manager

# 6. Verify device connection
adb devices
# Should show your device/emulator as "device"
```

### Running Tests

```bash
# Run ALL test specs
npm test

# Run only Wallet Add Funds tests
npm run test:wallet

# Run only Onboarding tests (when added)
npm run test:onboarding

# Type-check without running
npm run typecheck

# Dump current screen's UI source (for locator discovery)
npm run dump
```

---

## 🏗️ Project Structure

```
mt-gateway-automation/
├── AGENTS.md                         # Workspace memory / project rules
├── README.md                         # This file
├── .gitignore
├── .env.example                      # Environment config template
├── package.json
├── tsconfig.json
├── config/
│   └── wdio.conf.ts                  # WebdriverIO + Appium configuration
├── apps/
│   └── .gitkeep                      # APK goes here (gitignored)
├── docs/
│   └── MANUAL_TEST_REFERENCE.md      # Manual ↔ automated test mapping
├── scripts/
│   └── dump-page-source.ts           # UI dump utility for locators
├── reports/                          # Generated test reports (gitignored)
│   ├── html/
│   ├── json/
│   └── screenshots/
└── test/
    ├── data/
    │   └── testData.ts               # Centralised test data (typed)
    ├── helpers/
    │   └── appActions.ts             # Shared app actions (login, nav)
    ├── pageobjects/
    │   ├── base.page.ts              # Abstract base with common helpers
    │   ├── login.page.ts             # Login flow page object
    │   ├── home.page.ts              # Home screen + navigation
    │   └── wallet.page.ts            # Wallet & Add Funds screens
    └── specs/
        └── wallet.addfunds.spec.ts   # Wallet Add Funds test cases
```

---

## 👥 Team & Module Ownership

| Member | Group | Modules | Test ID Prefix |
|---|---|---|---|
| **Anshuman Rajkonwar** | A — Onboarding & Account Setup | 1–7 | `MTG-ONB-xxx` |
| **Anshuman Rajkonwar** | C — Wallet & Financial | 14–18 | `MTG-WAL-xxx` |
| **Nazitora Das** | B — Discovery & Booking | 8–13 | `MTG-DSC-xxx` |
| **Nazitora Das** | D — Engagement & Preferences | 19–22 | `MTG-ENG-xxx` |
| **Nazitora Das** | E — Content & Other | 23–27 | `MTG-CNT-xxx` |

---

## 🔍 Locator Discovery (How to capture selectors)

The app is built with Flutter, so standard Android resource IDs are limited. We rely on **content-desc** (accessibility labels) and **UiSelector** strategies.

**Priority:** `content-desc` → `UiSelector().description*()` → XPath (last resort)

### Steps to capture locators for a new screen:

1. **Navigate** to the screen on your emulator
2. **Run** the dump script:
   ```bash
   # Make sure Appium is running (it starts automatically with tests,
   # but for standalone dumps start it manually):
   npx appium &

   npm run dump
   ```
3. **Open** the generated XML in `./dumps/page-dump-<timestamp>.xml`
4. **Find** elements by their `content-desc`, `text`, or `resource-id` attributes
5. **Update** the corresponding page object selectors

---

## 🤝 Git Workflow (Fork-based Collaboration)

**Anshuman** owns the upstream repo. **Nazitora** forks it and contributes via Pull Requests.

### For Anshuman (repo owner)

```bash
# Push the boilerplate to GitHub (one-time setup)
git remote add origin <your-github-repo-url>
git push -u origin main

# Work directly on feature branches
git checkout -b feature/wallet-addfunds
# ... write tests, commit ...
git push origin feature/wallet-addfunds
# Merge via GitHub PR (or directly into main for your own module)
```

### For Nazitora (contributor via fork)

```bash
# 1. Fork the repo on GitHub (click "Fork" button)
# 2. Clone YOUR fork
git clone https://github.com/nazitora/<repo-name>.git
cd <repo-name>
npm install

# 3. Add upstream (Anshuman's repo) as a remote
git remote add upstream https://github.com/anshuman/<repo-name>.git

# 4. Create a feature branch for your module
git checkout -b feature/discovery-booking

# 5. Write tests, commit frequently
git add -A
git commit -m "feat(discovery): add search results page object"

# 6. Push to YOUR fork
git push origin feature/discovery-booking

# 7. Open a Pull Request from your fork → upstream/main on GitHub

# 8. Stay in sync with upstream
git fetch upstream
git merge upstream/main
```

### Handling Merge Conflicts

When Nazitora's PR has conflicts with Anshuman's changes (this is expected!):

```bash
# On Nazitora's fork, pull latest from upstream
git fetch upstream
git merge upstream/main
# Resolve conflicts in your editor, then:
git add -A
git commit -m "merge: resolve conflicts with upstream wallet changes"
git push origin feature/discovery-booking
# The PR on GitHub will auto-update
```

### Commit Convention

```
type(scope): description

Examples:
  feat(wallet):     add happy-path add-funds test
  fix(login):       update email field selector after UI change
  docs(readme):     add locator discovery instructions
  chore(config):    bump Appium version to 3.6
  test(onboarding): add MTG-ONB-005 language selection test
```

---

## 📊 Reports

After running tests, reports are generated in `./reports/`:

- **Console:** Spec reporter output in terminal
- **HTML:** `./reports/html/master-report.html` — open in browser
- **JSON:** `./reports/json/results-*.json` — for CI/CD parsing
- **Screenshots:** `./reports/screenshots/FAIL-*.png` — auto-captured on failure

---

## 🐛 Known Bugs (Regression Candidates)

| Bug ID | Description | Module |
|---|---|---|
| BUG-ONB-001 | Business website field accepts non-URL text | Onboarding |
| BUG-ONB-002 | Postal code accepts alphabetic chars, no auto-population | Onboarding |
| BUG-WAL-001 | Add Funds amount overflows to scientific notation | Wallet |
| BUG-DSC-001 | Policies filter leaks raw backend API validation error | Discovery |

---

## 📝 License

ISC — Internal QA project for MyTravaly.
