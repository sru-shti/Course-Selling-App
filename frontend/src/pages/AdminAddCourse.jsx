// src/pages/AdminAddCourse.jsx
import { useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Needed for successful redirect

export default function AdminAddCourse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imgUrl: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(
        "/admin/courses", 
        formData
      );
      alert("Course added successfully!");
      navigate('/admin/courses'); // Redirect back to the admin dashboard
    } catch (err) {
      console.error(err);
      alert("Error adding course: " + (err.response?.data?.message || "Unknown error."));
    }
  };

  return (
    // Reusing the general edit/add form container styles
    <div className="admin-edit-container">
      <h2 className="admin-edit-title">
        Create New Course
      </h2>
      <form onSubmit={handleSubmit} className="admin-edit-form">
        {/* Input fields use the standard input-field class */}
        <input name="title" placeholder="Title" onChange={handleChange} className="input-field" required />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="input-field" rows="3" required />
        <input name="imgUrl" placeholder="Image URL" onChange={handleChange} className="input-field" required />
        <input name="price" placeholder="Price" type="number" onChange={handleChange} className="input-field" required />
        
        {/* Submit Button uses the primary save button style */}
        <button 
          type="submit" 
          className="btn-save btn-full-width" 
        >
          Add Course
        </button>
      </form>
    </div>
  );
}