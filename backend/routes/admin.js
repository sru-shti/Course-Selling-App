// routes/admin.js
const mongoose = require('mongoose');
const { Router } = require("express");
const adminRouter = Router(); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateAdmin } = require("../middleware/adminAuth"); // Custom middleware
const { adminModel, courseModel } = require("../db");
const { JWT_ADMIN_PASSWORD } = require("../config.js");

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
adminRouter.post("/courses", authenticateAdmin, async (req, res) => {
    const { title, description, price, imgUrl } = req.body;
    const createrId = req.adminId; // ID extracted from JWT

    if (!title || !description || !price || !imgUrl) {
        return res.status(400).json({ message: "All fields are required to create a course." });
    }
    // Simple validation for price
    if (isNaN(price) || price < 0) {
        return res.status(400).json({ message: "Price must be a valid non-negative number." });
    }

    try {
        const newCourse = await courseModel.create({
            title,
            description,
            price: Number(price), // Ensure price is stored as a number
            imgUrl,
            createrId,
        });
        res.json({ message: "Course created successfully", courseId: newCourse._id });
    } catch (err) {
        console.error("Course creation error:", err);
        res.status(500).json({ message: "Failed to create course" });
    }
});

// 2. Get Admin's Courses (GET)
// Full Path: /api/v1/admin/courses
adminRouter.get("/courses", authenticateAdmin, async (req, res) => {
    const createrId = req.adminId;

    try {
        // Find only the courses created by the logged-in admin
        const courses = await courseModel.find({ createrId });
        res.json({ courses });
    } catch (err) {
        console.error("Admin courses fetch error:", err);
        res.status(500).json({ message: "Failed to fetch admin courses" });
    }
});
// 3. Update Course (PUT) - **THE FIX IS HERE**
adminRouter.put("/courses/:courseId", authenticateAdmin, async (req, res) => {
    const { courseId } = req.params;
    const createrId = req.adminId;
    
    let objectCourseId, objectCreaterId;

    try {
        // 💡 FIX 1: Convert string IDs to Mongoose ObjectIds for the query
        objectCourseId = new mongoose.Types.ObjectId(courseId);
        objectCreaterId = new mongoose.Types.ObjectId(createrId);
    } catch (e) {
        return res.status(400).json({ message: "Invalid ID format provided." });
    }

    const updateData = req.body;
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
            // 🛑 FIX 2: USE THE CONVERTED OBJECT IDs in the query
            { _id: objectCourseId, createrId: objectCreaterId }, 
            validUpdates,
            { new: true }
        );

        if (!updatedCourse) {
            // This is the error message the client receives when unauthorized or ID is wrong
            return res.status(404).json({ message: "Course not found or unauthorized." });
        }

        res.json({ message: "Course updated successfully", course: updatedCourse });
    } catch (err) {
        console.error("Course update error:", err);
        res.status(500).json({ message: "Failed to update course" });
    }
});


// 4. Delete Course (DELETE) - **THE FIX IS HERE**
adminRouter.delete("/courses/:courseId", authenticateAdmin, async (req, res) => {
    const { courseId } = req.params;
    const createrId = req.adminId;
    
    let objectCourseId, objectCreaterId;

    try {
        // 💡 FIX 3: Convert string IDs to Mongoose ObjectIds
        objectCourseId = new mongoose.Types.ObjectId(courseId);
        objectCreaterId = new mongoose.Types.ObjectId(createrId);
    } catch (e) {
        return res.status(400).json({ message: "Invalid ID format provided." });
    }

    try {
        // 🛑 FIX 4: USE THE CONVERTED OBJECT IDs in the query
        const result = await courseModel.deleteOne({ _id: objectCourseId, createrId: objectCreaterId });

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