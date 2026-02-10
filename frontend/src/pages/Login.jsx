// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from '@react-oauth/google'; // <--- 1. Import Google Component
import axiosInstance from "../api/axiosConfig";     // <--- 2. Import Axios
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, setToken, setUser, setRole } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // Keeps your Admin toggle

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // --- GOOGLE LOGIN SUCCESS HANDLER ---
  const handleGoogleSuccess = async (credentialResponse) => {
      try {
          // Send the token to your backend
          const res = await axiosInstance.post("/user/google", {
              token: credentialResponse.credential
          });

          // Save data to localStorage & Context
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          
          const userData = { firstName: res.data.firstName, email: res.data.email };
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          
          // Google logins are always 'user' role in this system
          setRole("user"); 
          localStorage.setItem("role", "user");

          alert("Google Login Successful!");
          navigate("/courses");
      } catch (err) {
          console.error("Google Login Error:", err);
          alert("Google login failed.");
      }
  };

  // --- EXISTING VALIDATION & SUBMIT ---
  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Your existing login function supports (email, password, isAdmin)
      await login(email, password, isAdmin);
    } catch (err) {
      alert("Login failed. Check credentials.");
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2 className="gradient-text" style={{textAlign: 'center', marginBottom: '1.5rem'}}>
            {isAdmin ? "Admin Portal" : "Welcome Back"}
        </h2>

        {/* Only show Google Login if NOT trying to be an Admin.
            (Usually Admins must use password for security)
        */}
        {!isAdmin && (
            <>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => console.log('Login Failed')}
                        shape="pill"
                    />
                </div>
                <div style={{textAlign: 'center', margin: '15px 0', color: '#94a3b8', fontSize: '0.9rem'}}>
                    — OR —
                </div>
            </>
        )}

        {/* EXISTING FORM */}
        <form onSubmit={handleSubmit}>

            {/* Email Input */}
            <div style={{marginBottom: '15px'}}>
                <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                />
                {errors.email && <small className="error" style={{color: '#ef4444'}}>{errors.email}</small>}
            </div>

            {/* Password Input */}
            <div style={{marginBottom: '15px'}}>
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                />
                {errors.password && <small className="error" style={{color: '#ef4444'}}>{errors.password}</small>}
            </div>

            {/* Admin Checkbox */}
            <label className="checkbox-label" style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', cursor: 'pointer'}}>
                <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={() => setIsAdmin(!isAdmin)}
                    style={{width: '18px', height: '18px', accentColor: '#4f46e5'}}
                />
                <span style={{color: '#475569', fontSize: '0.95rem'}}>Login as Admin</span>
            </label>

            {/* Submit Button */}
            <button 
                type="submit" 
                disabled={loading}
                className="btn-primary" // Make sure this matches your CSS for the blue button
                style={{width: '100%', padding: '12px', borderRadius: '8px', fontSize: '1rem'}}
            >
                {loading ? "Verifying..." : (isAdmin ? "Admin Access" : "Secure Login")}
            </button>
        </form>
      </div>
    </div>
  );
}