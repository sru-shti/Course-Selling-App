// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Courses from "./pages/Courses";
import MyCourses from "./pages/MyCourses";
import AdminCourses from "./pages/AdminCourses";
import AdminAddCourse from "./pages/AdminAddCourse";
import NotFound from "./pages/NotFound";
// 🛑 Note: We removed the import for AdminSignup page for security

// Custom Component to enforce login and role access
function ProtectedRoute({ children, adminOnly = false }) {
  const { user, role } = useAuth();
  
  // If no user is logged in, redirect to login
  if (!user) return <Navigate to="/login" />;
  
  // If adminOnly is true and the user is NOT an admin, redirect to courses page
  if (adminOnly && role !== "admin") return <Navigate to="/courses" />;
  
  return children;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          
          {/* 💡 FIX: Redirect the root path to /courses to avoid routing conflicts */}
          <Route path="/" element={<Navigate to="/courses" replace />} />

          {/* 1. Public Routes */}
          {/* The main public page (or post-login landing page for Users) */}
          <Route path="/courses" element={<Courses />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* 🛑 SECURITY FIX: The /admin/signup route is intentionally missing */}
          
          {/* 2. User Protected Routes */}
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute>
                <MyCourses />
              </ProtectedRoute>
            }
          />
          
          {/* 3. Admin Protected Routes (AdminOnly=true) */}
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-course"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminAddCourse />
              </ProtectedRoute>
            }
          />
          
          {/* Catch-all for 404s */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;