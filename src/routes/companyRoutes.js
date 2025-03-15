const express = require("express");
const Company = require("../models/companyModel");
const scrapeWebsite = require("../services/scraper");
const  captureScreenshot  = require("../services/screenShot");
const { Parser } = require("json2csv");
const fs = require("fs");
const path = require("path");

const router = express.Router();


router.post("/scrape", async (req, res) => {
  try {
    const { url } = req.body;
    const data = await scrapeWebsite(url);
    if (!data) return res.status(500).json({ error: "Scraping failed" });
    const screenshot = await captureScreenshot(url);
    const newCompany = await Company.create({ ...data, screenshot });

    res.json(newCompany);
  } catch (error) {
    console.error("Error in /scrape:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/companies", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    console.error(" Error fetching companies:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { ids } = req.body;
    await Company.deleteMany({ _id: { $in: ids } });
    res.json({ success: true });
  } catch (error) {
    console.error(" Error deleting companies:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/export", async (req, res) => {
  try {
    const companies = await Company.find();
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(companies);

    const filePath = path.join(__dirname, "../../companies.csv");
    fs.writeFileSync(filePath, csv);

    res.download(filePath, "companies.csv", () => {
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error("CSV Export Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
