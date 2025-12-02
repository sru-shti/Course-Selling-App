// routes/user.js
const { Router } = require("express");
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_USER_PASSWORD } = require("../config.js");

const userRouter = Router();

// User Signup
userRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
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
userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) return res.status(403).json({ message: "Incorrect credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(403).json({ message: "Incorrect credentials" });

  const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD, { expiresIn: "1h" });

  res.json({ token });
});

module.exports = { userRouter };
