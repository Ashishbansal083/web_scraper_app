const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: String,
  description: String,
  logo: String,
  facebook: String,
  linkedin: String,
  twitter: String,
  instagram: String,
  address: String,
  phone: String,
  email: String,
  screenshot: String,
}, { timestamps: true });

module.exports = mongoose.model("Company", CompanySchema);
