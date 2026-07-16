# Forking & Setup Guide for Nazitora

Welcome to the MT Gateway Automation project! Since we are collaborating using a Fork and Pull Request workflow, follow these steps to get your own copy of the repository set up on your machine.

## Step 1: Fork the Repository
1. Go to the main project repository: [MT-Gateway-Test-Apk](https://github.com/kuRO-nEk0/MT-Gateway-Test-Apk)
2. In the top-right corner of the page, click the **Fork** button.
3. Choose your GitHub account as the destination. You now have your own copy of the project at `https://github.com/<your-username>/MT-Gateway-Test-Apk`.

## Step 2: Clone Your Fork Locally
Open your terminal and run the following commands to download your fork to your computer:

```bash
# Replace <your-username> with your actual GitHub username
git clone https://github.com/<your-username>/MT-Gateway-Test-Apk.git

# Navigate into the project folder
cd MT-Gateway-Test-Apk
```

## Step 3: Install Dependencies
This project uses Node.js, WebdriverIO, and Appium. Install everything by running:
```bash
npm install
```

## Step 4: Environment Setup
1. **Android Studio:** Ensure you have Android Studio installed and a Virtual Device (Emulator) running.
2. **Install the APK:** Drag and drop the `apps/app-release.apk` file from this project folder directly onto your running emulator. This will install the MyTravaly app.

## Step 5: How to Use the Automation Tools
- **Finding Locators:** Open the app on your emulator to the screen you want to inspect, then run:
  ```bash
  npm run dump
  ```
  This will extract the UI tree and save it to `page-source.xml` so you can find accessibility IDs and resource IDs without reverse-engineering the app.
- **Running Tests:** To execute the Appium test suites, run:
  ```bash
  npm run wdio
  ```

## Step 6: Submitting Your Work (Pull Request)
When you finish automating a module (e.g., Discovery or Booking):
1. Save and commit your changes:
   ```bash
   git add .
   git commit -m "feat: automated discovery and booking tests"
   ```
2. Push the changes to your fork on GitHub:
   ```bash
   git push origin main
   ```
3. Go to your repository on GitHub and click the **"Contribute"** -> **"Open Pull Request"** button to send your code back to Anshuman's main repository. We will resolve any merge conflicts together!
