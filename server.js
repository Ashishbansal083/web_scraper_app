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
const connectDB = require("./src/config/db"); // Database connection
const app = require("./src/app"); // Import Express app

const startServer = async () => {
  try {
    await connectDB(); // Ensure DB connection
    console.log("Database Connected");

    // Instead of app.listen(), export the app for Vercel
    module.exports = app;
  } catch (error) {
    console.error("Server Startup Error:", error.message);
    process.exit(1);
  }
};

startServer();

