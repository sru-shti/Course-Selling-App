// src/pages/Signup.jsx
import { useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/user/signup", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });

      alert("Signup success! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4 font-semibold">Create Account</h2>

      <form onSubmit={submit} className="space-y-3">
        <input
          required
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) =>
            setForm({ ...form, firstName: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        />

        <input
          required
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) =>
            setForm({ ...form, lastName: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        />

        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        />

        <input
          required
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        />

        <button className="w-full bg-green-600 text-white px-4 py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
