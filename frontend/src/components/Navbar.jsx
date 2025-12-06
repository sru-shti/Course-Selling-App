// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, role, logout } = useAuth();

  return (
    <nav className="app-navbar">
      <h1>CourseSelling</h1>
      <div className="nav-links-container">
        
        <Link to="/courses" className="nav-link">Courses</Link>
        
        {user ? (
            // FIX: Ensure all authenticated links are within a single fragment (<>)
          <>
            {/* User Links */}
            {role !== 'admin' && (
                <Link to="/my-courses" className="nav-link">My Courses</Link>
            )}
        
            {/* Admin Link */}
            {role === "admin" && (
                <Link to="/admin/courses" className="nav-link admin-link">Admin Panel</Link>
            )}
        
            <button onClick={logout} className="btn-logout">Logout</button>
          </>
        ) : (
            // FIX: Ensure all unauthenticated links are within a single fragment (<>)
          <>
            {/* Logged Out Links */}
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Signup</Link> 
          </>
        )}
      </div>
    </nav>
  );
}