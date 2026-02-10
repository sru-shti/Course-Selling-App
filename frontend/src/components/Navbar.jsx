// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const location = useLocation();

  // Helper to highlight the active link
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="app-navbar">
      {/* 1. Left: Brand Logo */}
      <Link to="/" className="nav-brand">
        <span className="brand-icon">🎓</span> 
        <span className="brand-text">LearnNova</span>
      </Link>

      {/* 2. Center: Navigation Links (Capsule Style) */}
      <div className="nav-links-center">
        <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
        <Link to="/courses" className={`nav-link ${isActive('/courses')}`}>Courses</Link>
        <Link to="/about" className={`nav-link ${isActive('/about')}`}>About</Link>
        
        {/* ✨ NEW FACULTY LINK ADDED HERE ✨ */}
        <Link to="/faculty" className={`nav-link ${isActive('/faculty')}`}>Faculty</Link>
        {/*  Inside the "nav-links-center" div: */}
        <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact</Link>

        {/* Only show "My Courses" if logged in as regular user */}
        {user && role !== 'admin' && (
           <Link to="/my-courses" className={`nav-link ${isActive('/my-courses')}`}>My Courses</Link>
        )}
         {user && role === 'admin' && (
           <Link to="/admin/courses" className={`nav-link ${isActive('/admin/courses')}`}>Admin</Link>
        )}
      </div>

      {/* 3. Right: Login/Profile Button */}
      <div className="nav-actions">
        {user ? (
          <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
             <span style={{fontWeight: '600', color: '#4f46e5'}}>Hi, {user.firstName}</span>
             <button onClick={logout} className="btn-pill btn-outline" style={{padding: '8px 16px', fontSize: '0.9rem'}}>
               Logout
             </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn-pill btn-primary-gradient">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}