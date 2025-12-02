const { Router } = require("express");
const adminRouter = Router(); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { adminModel, courseModel } = require("../db");
const { JWT_ADMIN_PASSWORD } = require("../config.js");

// Admin Signup
adminRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await adminModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    res.json({ message: "Admin signup succeeded" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});


// Admin Signin
adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const admin = await adminModel.findOne({ email });
  if (!admin) return res.status(403).json({ message: "Incorrect credentials" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(403).json({ message: "Incorrect credentials" });

  const token = jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD, { expiresIn: "1h" });

  res.json({ token });
});

module.exports = { adminRouter };