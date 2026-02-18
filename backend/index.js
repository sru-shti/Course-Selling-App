require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const { aiRouter } = require("./routes/ai");

const app = express();

// 1. GLOBAL MIDDLEWARE
// 1. GLOBAL MIDDLEWARE
app.use(cors({ 
    origin: [
        "http://localhost:5173", 
        "http://127.0.0.1:5173", 
        "https://course-selling-app-ten.vercel.app" // 👈 FIXED: Added 'app' and removed the slash!
    ], 
    credentials: true 
}));
app.use(express.json()); 
;

// 3. ROUTES
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/ai", aiRouter);

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