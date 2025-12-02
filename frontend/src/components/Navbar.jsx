// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, role, logout } = useAuth();

  return (
    <nav className="navbar" style={{ display: "flex", justifyContent: "space-between", padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <h1>CourseSelling</h1>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/courses">Courses</Link>
        {user ? (
          <>
            <Link to="/my-courses">My Courses</Link>
            {role === "admin" && <Link to="/admin/courses">Admin</Link>}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
