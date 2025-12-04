// routes/course.js (Complete Logic)
const { Router } = require("express");
const courseRouter = Router();
const { userMiddleware } = require("../middleware/user");
const { purchaseModel, courseModel } = require("../db");

// 1. Get all courses (Public Route)
// FULL PATH: /api/v1/course/preview
courseRouter.get("/preview", async (req, res) => {
  try {
    const courses = await courseModel.find({});
    res.json({ courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
});


// 2. Get a specific course by ID (Missing Route)
// FULL PATH: /api/v1/course/:courseId
courseRouter.get("/:courseId", async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const course = await courseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ course }); // 👈 This is the route needed by CourseDetail.jsx
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Invalid ID format or server error" });
  }
});


// 3. Purchase a course (User Protected)
// FULL PATH: /api/v1/course/purchase_course
courseRouter.post("/purchase_course", userMiddleware, async (req, res) => {
    const userId = req.userId; // User ID from JWT
    const { courseId } = req.body;

    try {
        // Check if the course exists
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found." });
        }

        // Check if the user already purchased it
        const alreadyPurchased = await purchaseModel.findOne({ userId, courseId });
        if (alreadyPurchased) {
            return res.status(400).json({ message: "Course already purchased." });
        }

        // Create the purchase record
        await purchaseModel.create({ userId, courseId });
        res.json({ message: "You have successfully bought the course" });
    } catch (err) {
        console.error("Purchase error:", err);
        res.status(500).json({ message: "Failed to process purchase" });
    }
});


module.exports = { courseRouter };