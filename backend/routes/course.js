const { Router } = require("express");
const courseRouter = Router();
const { userMiddleware } = require("../middleware/user");
const { purchaseModel, courseModel } = require("../db"); // ✅ import from db.js

// Purchase a course
courseRouter.post("/purchase_course", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const courseId = req.body.courseId;

  await purchaseModel.create({ userId, courseId });
  res.json({ message: "You have successfully bought the course" });
});

// Get all courses
courseRouter.get("/preview", async (req, res) => {
  const courses = await courseModel.find({});
  res.json({ courses });
});

module.exports = { courseRouter };
