// const axios = require("axios");
// const cheerio = require("cheerio");

// const scrapeWebsite = async (url) => {
//   try {
//     const { data } = await axios.get(url);
//     const $ = cheerio.load(data);

//     return {
//       name: $("meta[property='og:site_name']").attr("content") || $("title").text(),
//       description: $("meta[name='description']").attr("content") || "No description available",
//       logo: $("link[rel='icon']").attr("href")|| $("link[rel='shortcut icon']").attr("href") || "",
//       facebook: $("a[href*='facebook.com']").attr("href") || "",
//       linkedin: $("a[href*='linkedin.com']").attr("href") || "",
//       twitter: $("a[href*='twitter.com']").attr("href") || "",
//       instagram: $("a[href*='instagram.com']").attr("href") || "",
//       address: "",
//       phone: "",
//       email: "",
//     };
//   } catch (error) {
//     console.error(" Scraping Error:", error.message);
//     return null;
//   }
// };

// module.exports = scrapeWebsite;
const axios = require("axios");
const cheerio = require("cheerio");
const urlLib = require("url");

const scrapeWebsite = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Convert relative URLs to absolute URLs
    const toAbsoluteUrl = (link) =>
      link && !link.startsWith("http") ? urlLib.resolve(url, link) : link;

    const name =
      $("meta[property='og:site_name']").attr("content") ||
      $("meta[name='application-name']").attr("content") ||
      $("title").text() ||
      "No name found";

    const description =
      $("meta[name='description']").attr("content") ||
      $("meta[property='og:description']").attr("content") ||
      "No description available";

    const logo =
      toAbsoluteUrl($("link[rel='icon']").attr("href")) ||
      toAbsoluteUrl($("link[rel='shortcut icon']").attr("href")) ||
      toAbsoluteUrl($("link[rel='apple-touch-icon']").attr("href")) ||
      "";

    const facebook = $("a[href*='facebook.com']").attr("href") || "";
    const linkedin = $("a[href*='linkedin.com']").attr("href") || "";
    const twitter = $("a[href*='twitter.com']").attr("href") || "";
    const instagram = $("a[href*='instagram.com']").attr("href") || "";

    // for page text
    const pageText = $("body").text();

    //  phone number
    const phoneMatch = pageText.match(
      /\+?\d{1,3}[-.\s]?\(?\d{2,4}\)?[-.\s]?\d{3,5}[-.\s]?\d{3,5}/
    );
    const phone = phoneMatch ? phoneMatch[0] : "Not found";

    // for email address
    const emailMatch = pageText.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    );
    const email = emailMatch ? emailMatch[0] : "Not found";

    // for address
    let address = $("address").text().trim(); 

    

   
    return {
      name,
      description,
      logo,
      facebook,
      linkedin,
      twitter,
      instagram,
      address,
      phone,
      email,
    };
  } catch (error) {
    console.error("Scraping Error:", error.message);
    return null;
  }
};

module.exports = scrapeWebsite;
