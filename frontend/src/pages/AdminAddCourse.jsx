// src/pages/AdminAddCourse.jsx
import { useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";

export default function AdminAddCourse() {
  const { token } = useAuth(); // JWT token from context
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
      const res = await axiosInstance.post(
        "/admin/course",
        formData,
        { headers: { token } }
      );
      alert("Course added successfully! ID: " + res.data.courseId);
    } catch (err) {
      console.error(err);
      alert("Error adding course");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add Course</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="description" placeholder="Description" onChange={handleChange} />
        <input name="imgUrl" placeholder="Image URL" onChange={handleChange} />
        <input name="price" placeholder="Price" type="number" onChange={handleChange} />
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2">Add Course</button>
      </form>
    </div>
  );
}
