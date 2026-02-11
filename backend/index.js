require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();

// 1. GLOBAL MIDDLEWARE
app.use(cors({ 
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], 
    credentials: true 
}));
app.use(express.json()); 

// 2. THE SPY LOGGER (Crucial for debugging)
app.use((req, res, next) => {
    console.log(`Incoming: ${req.method} ${req.url}`);
    next();
});

// 3. ROUTES (Defined exactly ONCE)
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
require("dotenv").config(); // <--- This loads the .env file

app.get("/ping", (req, res) => res.send("pong"));

// 4. DATABASE & SERVER
// backend/index.js
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // Change 3000 to 3001
    app.listen(3001, "0.0.0.0", () => {
      console.log("Server running on port 3001");
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

main();