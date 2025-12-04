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
    <div className="p-4 max-w-lg mx-auto bg-gray-100 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Course: {course.title}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Input fields */}
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="p-2 border rounded" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="p-2 border rounded" rows="3" />
        <input name="imgUrl" placeholder="Image URL" value={formData.imgUrl} onChange={handleChange} className="p-2 border rounded" />
        <input name="price" placeholder="Price" type="number" value={formData.price} onChange={handleChange} className="p-2 border rounded" />
        
        <div className="flex gap-2 mt-4">
          <button type="submit" className="bg-green-600 text-white p-2 flex-1 rounded">Save Changes</button>
          <button type="button" onClick={onCancel} className="bg-gray-400 text-black p-2 flex-1 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}