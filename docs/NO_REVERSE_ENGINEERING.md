# APK Handling & No Reverse-Engineering Policy

As QA Automation Engineers working on the MT Gateway (MyTravaly) application, we treat the provided `app-release.apk` as a **Black Box**. 

To maintain the integrity of our testing process and adhere to strict security and compliance standards, the following rules apply to all contributors (including Anshuman and Nazitora):

## 🚫 Strictly Prohibited Actions
- **No Decompiling:** You may not decompile, unpack, or reverse-engineer the APK to view its source code (e.g., `.java`, `.kt`, or `.dex` files) using tools like `apktool`, `jadx`, or similar.
- **No API Scraping:** You may not intercept or extract proprietary backend API endpoints, keys, or business logic buried within the app's code.
- **No APK Modification:** You may not modify the APK, rebuild it, or alter its digital signature to bypass security checks or authentication flows.

## ✅ Permitted Actions (For Automation Purposes Only)
You are permitted to interact with the APK *only* through standard Android debugging tools for the sole purpose of enabling E2E UI automation:

1. **Identifying UI Locators:** You may use the `npm run dump` script, Appium Inspector, or Android UI Automator Viewer to extract the XML UI tree of the currently displayed screen. This is necessary to find `content-desc`, `resource-id`, or `text` attributes for your tests.
2. **Identifying App Activities:** You may use terminal commands (like `aapt dump badging` or `adb shell dumpsys window`) to identify the app's `appPackage` (e.g., `com.mytravaly.mytravaly_ta`) and `appActivity` (e.g., `.MainActivity`) required to initialize the Appium driver.
3. **Black-Box Interaction:** You may interact with the app exactly as a normal user would (tapping, scrolling, typing) via the Appium WebDriver.

**Rule of Thumb:** If a user or an accessibility screen-reader can't see it on the device screen, our automation framework shouldn't be trying to access it.
