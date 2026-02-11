# 🎓 LearnNova - Full-Stack Course Selling Platform

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?logo=react)
![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)
![Deployed on Render](https://img.shields.io/badge/Deployed-Render-black?logo=render)

LearnNova is a comprehensive, responsive course-selling application built using the MERN stack. It empowers creators to upload and manage educational content while providing students with a seamless, mobile-optimized learning experience.

### 🌍 Live Demo
* **Frontend:** [LearnNova on Vercel](https://course-selling-app-ten.vercel.app)
* **Backend API:** [LearnNova on Render](https://course-selling-platform-learnnova.onrender.com)

---

## ✨ Key Features

### 👨‍💻 Admin / Creator Studio
* **Secure Authentication:** JWT-based login and route protection.
* **Course Management:** Full CRUD operations for courses (Title, Description, Price, Thumbnails).
* **Smart Media Uploads:** Integrated with Cloudinary for seamless video hosting.
* **Dynamic File Handling:** Backend intelligently switches between parsing `multipart/form-data` for new file uploads and `application/json` for text-only updates.

### 🧑‍🎓 Student Experience
* **Responsive UI:** Custom CSS ensuring a perfect layout across desktop, tablet, and mobile devices.
* **Optimized Video Player:** Custom React video player featuring Cloudinary's on-the-fly transcoding. Automatically forces `H.264 MP4` formats and `playsInline` attributes to ensure 100% compatibility with strict Android and iOS mobile browsers.
* **Frictionless Browsing:** Browse available courses, view detailed descriptions, and seamlessly check out.

---

## 🛠️ Tech Stack

**Frontend:**
* React.js (Vite)
* React Router DOM
* Axios (API calls)
* CSS3 (Custom responsive styling & flexbox/grid architectures)

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose (Database & Schemas)
* JSON Web Tokens (JWT) & bcryptjs (Security)
* Multer (Handling `FormData` boundaries)
* Cloudinary API (Media storage and optimization)

---

## 🚀 Local Setup & Installation

To run this project locally on your machine, follow these steps:

### 1. Clone the repository ---

git clone [https://github.com/](https://github.com/)<your-username>/<your-repo-name>.git
cd <your-repo-name>

### 2. Backend Setup---
   
cd backend
npm install

### 3. Start the backend server---

node index.js

### 4. Frontend Setup---

cd frontend
npm install

### 5.Start the React development server---
npm run dev
