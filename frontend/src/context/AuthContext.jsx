// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [role, setRole] = useState(() => localStorage.getItem("role") || "user");

  // Save token, role, user into storage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
    }
  }, [token, role, user]);

  // -----------------------------------------
  // LOGIN
  // -----------------------------------------
  const login = async (email, password, isAdmin = false) => {
    try {
      const endpoint = isAdmin ? "/admin/signin" : "/user/signin";

      const res = await axiosInstance.post(endpoint, { email, password });

      setToken(res.data.token);
      setRole(isAdmin ? "admin" : "user");
      setUser({ email });

      navigate(isAdmin ? "/admin/courses" : "/courses");
    } catch (err) {
      console.error(err);
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  // -----------------------------------------
  // SIGNUP
  // -----------------------------------------
  const signup = async (email, password, firstName, lastName, isAdmin = false) => {
    try {
      const endpoint = isAdmin ? "/admin/signup" : "/user/signup";

      await axiosInstance.post(endpoint, {
        email,
        password,
        firstName,
        lastName,
      });

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed: " + (err.response?.data?.message || err.message));
    }
  };

  // -----------------------------------------
  // LOGOUT
  // -----------------------------------------
  const logout = () => {
    setToken("");
    setUser(null);
    setRole("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, role, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  return useContext(AuthContext);
}
