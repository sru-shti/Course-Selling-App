// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// 🚨 FIXED: Imported useAuth here so ProtectedRoute works!
import { AuthProvider, useAuth } from "./context/AuthContext"; 

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Courses from "./pages/Courses";
import MyCourses from "./pages/MyCourses";
import Faculty from "./pages/Faculty";
import Contact from "./pages/Contact";
import AdminCourses from "./pages/AdminCourses";
import AdminAddCourse from "./pages/AdminAddCourse";
import NotFound from "./pages/NotFound";

// 👇 1. IMPORT THE MISSING PAGES HERE
import CourseDetail from "./pages/CourseDetail";
import AdminEditCourse from "./components/AdminEditCourse"; // Make sure this path matches your folder structure!

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
          
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected User Routes */}
          <Route path="/my-courses" element={
            <ProtectedRoute><MyCourses /></ProtectedRoute>
          } />
          
          {/* 👇 2. ADDED THE COURSE DETAIL ROUTE */}
          <Route path="/course/:id" element={
            <ProtectedRoute><CourseDetail /></ProtectedRoute>
          } />
          
          {/* Protected Admin Routes */}
          <Route path="/admin/courses" element={
            <ProtectedRoute adminOnly={true}><AdminCourses /></ProtectedRoute>
          } />
          <Route path="/admin/add-course" element={
            <ProtectedRoute adminOnly={true}><AdminAddCourse /></ProtectedRoute>
          } />
          
          {/* 👇 3. ADDED THE ADMIN EDIT ROUTE */}
          <Route path="/admin/edit-course/:id" element={
            <ProtectedRoute adminOnly={true}><AdminEditCourse /></ProtectedRoute>
          } />
          
          {/* 404 Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;