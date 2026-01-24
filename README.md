Course Selling Platform (MERN)
A full-stack web application that allows administrators to manage and sell online courses while enabling users to browse and purchase them.

🚀 Features:

**For Admins
Secure Authentication: Register and login using JWT-based authentication.

Course Management: Full CRUD (Create, Read, Update, Delete) capabilities for courses.

Admin Dashboard: A private interface to track all uploaded content and pricing.

**For Users
Course Marketplace: Browse a library of available courses.

Purchase System: Ability to buy courses and link them to a user profile.

Personal Library: A "My Courses" section to view all purchased content.

🛠️ Tech Stack
Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JSON Web Tokens (JWT) & Bcrypt for password hashing
Styling: Custom CSS 

├── server/             # Backend (Node/Express)
│   ├── routes/         # Admin and User API routes
│   ├── models/         # MongoDB Schemas
│   ├── middleware/     # Auth verification logic
│   └── index.js        # Entry point
└── client/             # Frontend (React)
    ├── src/
    │   ├── components/ # Reusable UI components
    │   └── pages/      # Login, Signup, Dashboard, Marketplace
    └── App.js          # Routing logic

⚙️ Installation & Setup
1 . Clone the repository:

git clone https://github.com/your-username/course-selling-app.git

2 . Setup Backend:

-Navigate to the server folder.
-Create a .env file and add your MONGODB_URL and JWT_SECRET.
-Run: npm install then node index.js.

3 . Setup Frontend:

-Navigate to the client folder.
-Run: npm install then npm start.

🛡️ API Endpoints:
Method,Endpoint,Access,Description
POST,/admin/signup,Public,Register a new admin
POST,/admin/courses,Admin,Create a new course
GET,/users/courses,Public,View all courses
POST,/users/courses/:id,User,Purchase a specific course
