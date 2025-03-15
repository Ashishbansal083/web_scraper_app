const express = require("express");
const cors = require("cors");
const companyRoutes = require("./routes/companyRoutes");
const path = require("path");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/uploads", express.static(path.join(__dirname,"services", "uploads")));
app.use("/", companyRoutes);

module.exports = app;
