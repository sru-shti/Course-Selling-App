// src/pages/AdminCourses.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom"; 
import AdminCourseCard from "../components/AdminCourseCard"; 
import AdminEditCourse from "../components/AdminEditCourse"; 

export default function AdminCourses() {
  const { token, loading } = useAuth();
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null); 

  const fetchCourses = async () => {
    try {
      if (loading || !token) return; 
      
      const res = await axiosInstance.get("/admin/courses");
      setCourses(res.data.courses);
    } catch (err) {
      console.error("Error fetching courses:", err);
      alert("Error fetching your created courses.");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [token, loading]); 

  const handleUpdate = () => {
    fetchCourses(); 
    setEditingCourse(null); 
  };
  
  if (editingCourse) {
    return (
      <AdminEditCourse 
        course={editingCourse} 
        onCancel={() => setEditingCourse(null)} 
        onSave={handleUpdate} 
      />
    );
  }

  if (loading) return <p className="admin-loading">Loading Admin panel...</p>;

  return (
    <div className="admin-dashboard-container">
      
      {/* Header and Add Course Button */}
      <div className="admin-header">
        <h2 className="dashboard-title">Your Created Courses</h2>
        <Link to="/admin/add-course" className="btn-add-course">
          + Add New Course
        </Link>
      </div>
      
      {/* Course List */}
      <div className="course-list-grid">
        {courses.length === 0 && (
            <p className="no-courses-message">You haven't created any courses yet. Click '+ Add New Course' to begin!</p>
        )}
        
        {courses.map((course) => (
          <AdminCourseCard 
            key={course._id} 
            course={course}
            onEdit={setEditingCourse} 
            onUpdate={handleUpdate} 
          />
        ))}
      </div>
    </div>
  );
}