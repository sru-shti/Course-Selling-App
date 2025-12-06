// src/components/AdminEditCourse.jsx
import { useState } from "react";
import axiosInstance from "../api/axiosConfig";

export default function AdminEditCourse({ course, onCancel, onSave }) {
  // Initialize form data with the current course values
  const [formData, setFormData] = useState({
    title: course.title || '',
    description: course.description || '',
    imgUrl: course.imgUrl || '',
    price: course.price || 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Calls the backend PUT route: /api/v1/admin/courses/:courseId
      await axiosInstance.put(`/admin/courses/${course._id}`, formData);
      alert(`Course "${formData.title}" updated successfully!`);
      onSave(); // Trigger re-fetch and close modal in parent
    } catch (err) {
      console.error("Update Error:", err);
      // The backend returns a specific error message, use it here
      alert("Failed to update course: " + (err.response?.data?.message || "Unknown error."));
    }
  };

  return (
    // 💡 Replaced Tailwind with semantic classes
    <div className="admin-edit-container">
      
      <h2 className="admin-edit-title">
        Edit Course: {course.title}
      </h2>
      
      <form onSubmit={handleSubmit} className="admin-edit-form">
        
        {/* Input fields */}
        <input 
            name="title" 
            placeholder="Title" 
            value={formData.title} 
            onChange={handleChange} 
            className="input-field" 
        />
        
        <textarea 
            name="description" 
            placeholder="Description" 
            value={formData.description} 
            onChange={handleChange} 
            className="input-field" 
            rows="4" 
        />
        
        <input 
            name="imgUrl" 
            placeholder="Image URL" 
            value={formData.imgUrl} 
            onChange={handleChange} 
            className="input-field" 
        />
        
        <input 
            name="price" 
            placeholder="Price" 
            type="number" 
            value={formData.price} 
            onChange={handleChange} 
            className="input-field" 
        />
        
        {/* Buttons */}
        <div className="button-group">
            {/* Save Button */}
          <button 
                type="submit" 
                className="btn-save"
            >
                Save Changes
            </button>
            
            {/* Cancel Button */}
          <button 
                type="button" 
                onClick={onCancel} 
                className="btn-cancel"
            >
                Cancel
            </button>
        </div>
      </form>
    </div>
  );
}