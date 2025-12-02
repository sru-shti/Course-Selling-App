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

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, role } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && role !== "admin") return <Navigate to="/courses" />;
  return children;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute>
                <MyCourses />
              </ProtectedRoute>
            }
          />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
