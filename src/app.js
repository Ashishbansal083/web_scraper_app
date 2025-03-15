const express = require("express");
const cors = require("cors");
const companyRoutes = require("./routes/companyRoutes");
const path = require("path");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Routes
app.use("/uploads", express.static(path.join(__dirname,"services", "uploads")));
app.use("/", companyRoutes);

module.exports = app;
