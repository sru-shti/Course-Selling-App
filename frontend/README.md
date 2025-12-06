# 📚 Course Selling Application

This is a modern, full-stack course selling platform built using the MERN stack (MongoDB, Express, React, Node.js). The application features secure, role-based authentication (Admin/User), and provides dedicated dashboards for course management and user purchases.

## 🌟 Key Features

* **Role-Based Authentication:** Separate sign-in flows and protected routes for Admins and regular Users.
* **Secure API:** All sensitive routes (Adding/Editing/Purchasing) are protected using JWT (JSON Web Tokens).
* **Admin Dashboard:**
    * Create, Read, Update, and Delete (CRUD) courses.
    * View only the courses they have created.
* **User Flow:**
    * View a public list of all courses.
    * Purchase courses via a protected API endpoint.
    * View a list of previously purchased courses (`/my-courses`).
* **Clean Styling:** Consistent, professional styling using external CSS.

---

## 🛠️ Technology Stack

### Backend
* **Node.js & Express:** Server environment and framework.
* **MongoDB & Mongoose:** Database and ODM for data modeling.
* **Bcrypt.js:** Secure hashing for passwords.
* **JSON Web Tokens (JWT):** For state management and secure authentication.
* **CORS:** Configured to handle requests from the React frontend.

### Frontend
* **React:** Frontend library for building the user interface.
* **React Router DOM:** For client-side routing.
* **Axios:** For simplified HTTP requests, utilizing an **Interceptor** to automatically attach JWTs.
* **Context API:** For global state management (Authentication/User/Role).
* **Plain CSS:** For robust, external, and maintainable styling.

---

## ⚙️ Setup and Installation

Follow these steps to get the application running on your local machine.

## Prerequisites

* Node.js (v18+)
* MongoDB Instance (Local or Cloud Atlas)

#  Step 1: Clone the Repository
```bash
git clone [YOUR_REPO_URL]
cd course-selling-app

 backend/.env

## MongoDB Connection String (Replace with your own URL)
MONGO_URL=mongodb://localhost:27017/course-selling-db

### Step 2: Configure Environment Variables

# Secret Keys (Must be long, complex random strings)
JWT_USER_PASSWORD=YOUR_USER_SECRET_KEY
JWT_ADMIN_PASSWORD=YOUR_ADMIN_SECRET_KEY

Step 3: Install Dependencies
Navigate to both the backend and frontend directories and install the packages.

Bash

# In the project root:
cd backend
npm install

cd ../frontend
npm install

tep 4: Run the Application
Open two separate terminal windows.

Terminal 1 (Backend)
Bash

cd backend
npm start  # or 'nodemon'
# Should display: "Connected to MongoDB" and "Server running on http://localhost:3000"
Terminal 2 (Frontend)
Bash

cd frontend
npm run dev
# Should display: "Local: http://localhost:5173/"


Project Structure (Simplified)
.
├── backend/
│   ├── config.js
│   ├── db/index.js           # Mongoose Schemas (user, admin, course, purchase)
│   ├── middleware/
│   │   ├── adminAuth.js      # Protects Admin Routes (Checks JWT)
│   │   └── user.js           # Protects User Routes (Checks JWT)
│   └── routes/
│       ├── admin.js          # Admin CRUD logic
│       ├── course.js         # Public preview, Purchase logic
│       └── user.js           # User auth, View purchases
│
└── frontend/
    ├── src/
    │   ├── api/axiosConfig.js  # Centralized Axios setup (JWT Interceptor)
    │   ├── components/         # Reusable UI elements (Navbar, CourseCard, AdminCourseCard)
    │   ├── context/AuthContext.jsx # Global auth state and logic
    │   └── pages/              # Main view components (Login, Courses, AdminCourses, etc.)
    └── package.json