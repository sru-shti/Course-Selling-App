// routes/admin.js
const { Router } = require("express");
const adminRouter = Router(); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateAdmin } = require("../middleware/adminAuth"); 
const { adminModel, courseModel } = require("../db");
const { JWT_ADMIN_PASSWORD } = require("../config.js");

// 🛑 Admin Signup is commented out for security.

// Admin Signin (Public)
adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  
  // 💡 FIX: Normalize email input for consistent lookup
  const normalizedEmail = email.toLowerCase(); 

  const admin = await adminModel.findOne({ email: normalizedEmail });
  if (!admin) return res.status(403).json({ message: "Incorrect credentials" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(403).json({ message: "Incorrect credentials" });

  const token = jwt.sign({ id: admin._id, role: 'admin' }, JWT_ADMIN_PASSWORD, { expiresIn: "1h" });

  res.json({ token, role: 'admin' });
});

// Admin Add Course (Requires Auth)
// FULL PATH: /api/v1/admin/courses
adminRouter.post("/courses", authenticateAdmin, async (req, res) => {
  const { title, description, price, imgUrl } = req.body;
  const createrId = req.adminId;

  try {
    const newCourse = await courseModel.create({
      title,
      description,
      price,
      imgUrl,
      createrId,
    });
    res.json({ message: "Course created successfully", courseId: newCourse._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create course" });
  }
});

// Admin Get Courses (Requires Auth)
// FULL PATH: /api/v1/admin/courses
adminRouter.get("/courses", authenticateAdmin, async (req, res) => {
  const createrId = req.adminId;
  try {
    // Only fetch courses created by this admin
    const courses = await courseModel.find({ createrId });
    res.json({ courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch admin courses" });
  }
});


module.exports = { adminRouter };