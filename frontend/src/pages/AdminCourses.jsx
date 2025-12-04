// src/pages/AdminCourses.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom"; // 💡 Needed for the 'Add Course' button
// 🛑 IMPORTANT: Use the dedicated Admin card component
import AdminCourseCard from "../components/AdminCourseCard"; 
import AdminEditCourse from "../components/AdminEditCourse"; 

export default function AdminCourses() {
  const { token, loading } = useAuth();
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null); // State for editing

  // Function to fetch courses (runs on mount and after updates/deletes)
  const fetchCourses = async () => {
    try {
      // 💡 Wait for loading to finish and token to exist
      if (loading || !token) return; 
      
      const res = await axiosInstance.get("/admin/courses");
      setCourses(res.data.courses);
    } catch (err) {
      console.error("Error fetching courses:", err);
      // More specific error handling could be implemented here
      alert("Error fetching your created courses.");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [token, loading]); // Dependency on token/loading ensures fetch runs only when stable

  // Function to re-fetch data and close the edit form after a successful action (Delete/Edit)
  const handleUpdate = () => {
    fetchCourses(); 
    setEditingCourse(null); // Close the edit form
  };
  
  // Show the Edit Form Component if a course is selected for editing
  if (editingCourse) {
    return (
      <AdminEditCourse 
        course={editingCourse} 
        onCancel={() => setEditingCourse(null)} // Function to close the form
        onSave={handleUpdate} // Function to close and refresh data
      />
    );
  }

  if (loading) return <p className="p-4">Loading Admin panel...</p>;

  return (
    <div className="p-4">
      {/* 1. 💡 FIX: Add the 'Add Course' button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Created Courses</h2>
        <Link to="/admin/add-course" className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
          + Add New Course
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.length === 0 && (
            <p>You haven't created any courses yet. Click '+ Add New Course' to begin!</p>
        )}
        
        {courses.map((course) => (
          // 2. 💡 FIX: Use AdminCourseCard to display Edit/Delete buttons
          <AdminCourseCard 
            key={course._id} 
            course={course}
            onEdit={setEditingCourse} // Sets the course object to the state, opening the edit form
            onUpdate={handleUpdate} // Function to re-fetch and close modal after Delete
          />
        ))}
      </div>
    </div>
  );
}