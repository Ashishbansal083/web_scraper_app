require("dotenv").config();
const connectDB = require("./src/config/db");  // Database connection
const app = require("./src/app"); // Import Express app

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start Server
const startServer = async () => {
  try {
    await connectDB(); 
    app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
  } catch (error) {
    console.error(" Server Startup Error:", error.message);
    process.exit(1);
  }
};

startServer();
