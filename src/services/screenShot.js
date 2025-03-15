const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const captureScreenshot = async (url) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "load" });

    // Define screenshot path
    const screenshotFilename = `screenshots/${Date.now()}.png`;
    const screenshotPath = path.join(__dirname, "uploads", screenshotFilename);
  
    await page.screenshot({ path: screenshotPath });
  
    return `/uploads/${screenshotFilename}`; // Return relative path
  } catch (error) {
    console.error("Screenshot capture error:", error);
    return null;
  }
};

module.exports = captureScreenshot;
