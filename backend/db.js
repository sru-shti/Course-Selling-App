const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Use built-in types for ObjectIds for consistency and better error handling
const { ObjectId } = mongoose.Schema.Types; 

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imgUrl: String,
    videoUrl: String, 
    creatorId: mongoose.Schema.Types.ObjectId
});

const purchaseSchema = new Schema({
  userId: { type: ObjectId, ref: 'user' },
  courseId: { type: ObjectId, ref: 'course' },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
const adminModel = mongoose.models.admin || mongoose.model("admin", adminSchema);
const courseModel = mongoose.models.course || mongoose.model("course", courseSchema);
const purchaseModel = mongoose.models.purchase || mongoose.model("purchase", purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
};