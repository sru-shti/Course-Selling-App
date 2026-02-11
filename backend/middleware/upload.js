// backend/middleware/upload.js
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

// 1. Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Configure Storage (Where files go)
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "course-videos", // Folder name in Cloudinary
        resource_type: "video", // IMPORTANT: Tell it we are uploading videos
        allowed_formats: ["mp4", "mkv", "mov"],
    },
});

const upload = multer({ storage: storage });

module.exports = upload;