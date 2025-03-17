// require("dotenv").config();
// const connectDB = require("./src/config/db");  // Database connection
// const app = require("./src/app"); // Import Express app

// const PORT = process.env.PORT || 5000;


// // Start Server
// const startServer = async () => {
//   try {
//     await connectDB(); 
//     app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
//   } catch (error) {
//     console.error(" Server Startup Error:", error.message);
//     process.exit(1);
//   }
// };

// startServer();
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./src/config/db"); // Database connection
const companyRoutes = require("./src/routes/companyRoutes"); // Import routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/uploads", express.static(path.join(__dirname, "services", "uploads")));
// Mount the router on `/api`
app.use("/api", companyRoutes);



// Handle React frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Database Connection
const startServer = async () => {
  try {
    await connectDB(); // Ensure DB connection
    console.log("✅ Database Connected");
  } catch (error) {
    console.error("❌ Database Connection Error:", error.message);
    process.exit(1);
  }
};

startServer();

// ✅ Export the app for Vercel (Do NOT use app.listen)
module.exports = app;
