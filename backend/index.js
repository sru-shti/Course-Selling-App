require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();

// 1. GLOBAL MIDDLEWARE
app.use(cors({ 
    // 👇 Added your Vercel URL right next to localhost!
    origin: [
        "http://localhost:5173", 
        "http://127.0.0.1:5173", 
        "https://course-selling-app-ten.vercel.app/" // Change this to your exact Vercel link
    ], 
    credentials: true 
}));
app.use(express.json()); 

// 2. THE SPY LOGGER (Crucial for debugging)
app.use((req, res, next) => {
    console.log(`Incoming: ${req.method} ${req.url}`);
    next();
});

// Serve static uploads (if you still have local files)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/ping", (req, res) => res.send("pong"));

// 3. ROUTES
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

// 4. DATABASE & SERVER
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // 👇 CRITICAL RENDER FIX: Use process.env.PORT
    const PORT = process.env.PORT || 3001;
    
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

main();