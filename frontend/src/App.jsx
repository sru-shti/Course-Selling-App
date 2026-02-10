// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home"; // <--- Import New Home Page
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
          
          {/* 💡 CHANGE: The root path now shows Home instead of redirecting */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* ... Keep all your existing Protected Routes exactly the same ... */}
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/add-course" element={<AdminAddCourse />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;