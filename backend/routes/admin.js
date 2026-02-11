// routes/admin.js
const mongoose = require('mongoose');
const { Router } = require("express");
const adminRouter = Router(); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateAdmin } = require("../middleware/adminAuth"); // Custom middleware
const { adminModel, courseModel } = require("../db");
const { JWT_ADMIN_PASSWORD } = require("../config.js");
const upload = require("../middleware/upload"); // Import the middleware

// Admin Signin (Existing working logic)
adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase(); 

  const admin = await adminModel.findOne({ email: normalizedEmail });
  if (!admin) return res.status(403).json({ message: "Incorrect credentials" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(403).json({ message: "Incorrect credentials" });

  const token = jwt.sign({ id: admin._id, role: 'admin' }, JWT_ADMIN_PASSWORD, { expiresIn: "1h" });

  res.json({ token, role: 'admin' });
});

// ------------------------------------
// PROTECTED COURSE MANAGEMENT ROUTES
// ------------------------------------

// 1. Admin Add Course (POST)
// Full Path: /api/v1/admin/courses

adminRouter.post("/courses", authenticateAdmin, upload.single('videoFile'), async (req, res) => {
    const { title, description, price, imgUrl, videoUrl } = req.body;
    const creatorId = req.adminId;

    // 1. Check if a file was uploaded via Cloudinary
    let finalVideoUrl = videoUrl; // Default to the YouTube link provided

    if (req.file && req.file.path) {
        // If a file was uploaded, Cloudinary gives us the URL in req.file.path
        finalVideoUrl = req.file.path;
    }

    if (!title || !description || !price || !imgUrl) {
        return res.status(400).json({ message: "Required fields missing." });
    }

    try {
        const newCourse = await courseModel.create({
            title,
            description,
            price: Number(price),
            imgUrl,
            videoUrl: finalVideoUrl, // Use the determined URL
            creatorId,
        });
        res.json({ message: "Course created successfully", courseId: newCourse._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create course" });
    }
});

// 2. Get Admin's Courses (GET)
// Full Path: /api/v1/admin/courses
adminRouter.get("/courses", authenticateAdmin, async (req, res) => {
    const creatorId = req.adminId; // 💡 TYPO FIXED

    try {
        // Find only the courses created by the logged-in admin
        const courses = await courseModel.find({ creatorId }); // 💡 TYPO FIXED
        res.json({ courses });
    } catch (err) {
        console.error("Admin courses fetch error:", err);
        res.status(500).json({ message: "Failed to fetch admin courses" });
    }
});

// 3. Update Course (PUT)
adminRouter.put("/courses/:courseId", authenticateAdmin, async (req, res) => {
    const { courseId } = req.params;
    const creatorId = req.adminId; // 💡 TYPO FIXED
    
    let objectCourseId, objectCreatorId;

    try {
        // Convert string IDs to Mongoose ObjectIds for the query
        objectCourseId = new mongoose.Types.ObjectId(courseId);
        objectCreatorId = new mongoose.Types.ObjectId(creatorId); // 💡 TYPO FIXED
    } catch (e) {
        return res.status(400).json({ message: "Invalid ID format provided." });
    }

    const updateData = req.body;
    // Filter out null/empty values so we don't overwrite with blanks
    const validUpdates = Object.fromEntries(
        Object.entries(updateData).filter(([_, v]) => v !== null && v !== "")
    );
    
    // Price conversion/validation
    if (validUpdates.price !== undefined) {
        validUpdates.price = Number(validUpdates.price);
        if (isNaN(validUpdates.price) || validUpdates.price < 0) {
            return res.status(400).json({ message: "Price must be a valid non-negative number." });
        }
    }

    try {
        const updatedCourse = await courseModel.findOneAndUpdate(
            // 💡 TYPO FIXED in query
            { _id: objectCourseId, creatorId: objectCreatorId }, 
            validUpdates,
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found or unauthorized." });
        }

        res.json({ message: "Course updated successfully", course: updatedCourse });
    } catch (err) {
        console.error("Course update error:", err);
        res.status(500).json({ message: "Failed to update course" });
    }
});

// 4. Delete Course (DELETE)
adminRouter.delete("/courses/:courseId", authenticateAdmin, async (req, res) => {
    const { courseId } = req.params;
    const creatorId = req.adminId; // 💡 TYPO FIXED
    
    let objectCourseId, objectCreatorId;

    try {
        objectCourseId = new mongoose.Types.ObjectId(courseId);
        objectCreatorId = new mongoose.Types.ObjectId(creatorId); 
    } catch (e) {
        return res.status(400).json({ message: "Invalid ID format provided." });
    }

    try {
        // 💡 TYPO FIXED in query
        const result = await courseModel.deleteOne({ _id: objectCourseId, creatorId: objectCreatorId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Course not found or unauthorized." });
        }

        res.json({ message: "Course deleted successfully" });
    } catch (err) {
        console.error("Course delete error:", err);
        res.status(500).json({ message: "Failed to delete course" });
    }
});

module.exports = { adminRouter };