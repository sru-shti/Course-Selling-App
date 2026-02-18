// routes/user.js
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require('google-auth-library'); 


const { userModel, purchaseModel, courseModel } = require("../db"); 
const { JWT_USER_PASSWORD } = require("../config.js");
const { userMiddleware } = require("../middleware/user");

const userRouter = Router();

// --- GOOGLE CLIENT SETUP ---
// ⚠️ PASTE YOUR GOOGLE CLIENT ID HERE (Must match the one in frontend/src/main.jsx)
const googleClientId = process.env.GOOGLE_CLIENT_ID.trim();
const client = new OAuth2Client("process.env.GOOGLE_CLIENT_ID"); 

// ------------------------------------
// 1. Authentication Routes (Public)
// ------------------------------------

// User Signup
userRouter.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    
    const normalizedEmail = email.toLowerCase(); 
    
    const existingUser = await userModel.findOne({ email: normalizedEmail });
    
    if (existingUser) {
        return res.status(403).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await userModel.create({
            email: normalizedEmail,
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
userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase(); 

    const user = await userModel.findOne({ email: normalizedEmail });
    if (!user) return res.status(403).json({ message: "Incorrect credentials" });

    // If the user was created via Google, they might not have a password
    if (!user.password) {
        return res.status(403).json({ message: "Please login with Google" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(403).json({ message: "Incorrect credentials" });

    const token = jwt.sign({ id: user._id, role: 'user' }, JWT_USER_PASSWORD, { expiresIn: "1h" });

    res.json({ token, firstName: user.firstName });
});

// --- ✨ NEW GOOGLE LOGIN ROUTE ---
// FULL PATH: /api/v1/user/google
userRouter.post("/google", async (req, res) => {
    const { token } = req.body;
   console.log("Trimmed ID:", googleClientId);

   try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: googleClientId, 
        });
        
        // 2. Get user info from the ticket payload
        const { email, given_name, family_name, picture } = ticket.getPayload();

        // 3. Check if user exists in our DB
        let user = await userModel.findOne({ email });

        if (!user) {
            // 4. If new user, create them automatically
            user = await userModel.create({
                email,
                firstName: given_name,
                lastName: family_name,
                password: "", // Google users don't need a local password
                // imgUrl: picture // Optional: You can save their profile pic if you update your schema
            });
        }

        // 5. Generate our own JWT Token so they stay logged in
        const jwtToken = jwt.sign(
            { id: user._id, role: 'user' }, 
            JWT_USER_PASSWORD, 
            { expiresIn: "1h" }
        );

        // 6. Send back the token and user data
        res.json({ 
            token: jwtToken, 
            firstName: user.firstName, 
            email: user.email 
        });

    } catch (err) {
        console.error("Google Auth Error:", err);
        res.status(400).json({ message: "Google authentication failed" });
    }
});


// ------------------------------------
// 2. Protected Routes (Requires userMiddleware)
// ------------------------------------

// Get Purchased Courses
userRouter.get("/purchases", userMiddleware, async (req, res) => {
    const userId = req.userId;

    try {
        const purchases = await purchaseModel.find({ userId });
        const courseIds = purchases.map(purchase => purchase.courseId);
        const coursesData = await courseModel.find({ _id: { $in: courseIds } });

        res.json({ coursesData });
    } catch (err) {
        console.error("Purchases fetch error:", err);
        res.status(500).json({ message: "Failed to fetch purchased courses" });
    }
});

module.exports = { userRouter };