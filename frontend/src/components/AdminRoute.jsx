// AdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute() {
  const { token, role } = useAuth();
  return token && role === "admin" ? <Outlet /> : <Navigate to="/login" />;
}
