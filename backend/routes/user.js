//routes/user.js
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// --- Imports ---
const { userModel, purchaseModel, courseModel } = require("../db"); 
const { JWT_USER_PASSWORD } = require("../config.js");
const { userMiddleware } = require("../middleware/user"); // Assuming this is the correct path

const userRouter = Router();

// ------------------------------------
// 1. Authentication Routes (Public)
// ------------------------------------

// User Signup
// FULL PATH: /api/v1/user/signup
userRouter.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    
    // 💡 Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(403).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });
        res.json({ message: "User signup succeeded" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});


// User Signin
// FULL PATH: /api/v1/user/signin
userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    // 💡 Normalize email for consistent lookup
    const normalizedEmail = email.toLowerCase(); 

    const user = await userModel.findOne({ email: normalizedEmail });
    if (!user) return res.status(403).json({ message: "Incorrect credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(403).json({ message: "Incorrect credentials" });

    // 💡 Include role for the frontend to differentiate
    const token = jwt.sign({ id: user._id, role: 'user' }, JWT_USER_PASSWORD, { expiresIn: "1h" });

    res.json({ token });
});


// ------------------------------------
// 2. Protected Routes (Requires userMiddleware)
// ------------------------------------

// Get Purchased Courses (Needed by MyCourses.jsx)
// FULL PATH: /api/v1/user/purchases
userRouter.get("/purchases", userMiddleware, async (req, res) => {
    const userId = req.userId; // User ID from JWT

    try {
        // 1. Find all purchase records for this user
        const purchases = await purchaseModel.find({ userId });
        
        // 2. Extract the course IDs
        const courseIds = purchases.map(purchase => purchase.courseId);

        // 3. Find the full course details using the IDs
        const coursesData = await courseModel.find({ _id: { $in: courseIds } });

        res.json({ coursesData }); // Send this data to MyCourses.jsx
    } catch (err) {
        console.error("Purchases fetch error:", err);
        res.status(500).json({ message: "Failed to fetch purchased courses" });
    }
});
module.exports = { userRouter };