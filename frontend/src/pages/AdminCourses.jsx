import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await axiosInstance.get("/admin/courses");
      setCourses(res.data.courses);
    } catch (err) {
      console.error(err);
      alert("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axiosInstance.delete(`/admin/courses/${courseId}`);
      setCourses(courses.filter((c) => c._id !== courseId));
    } catch (err) {
      alert("Failed to delete course.");
    }
  };

  if (loading) return <div style={{textAlign: "center", marginTop: "50px"}}>Loading...</div>;

  return (
    <div className="admin-container">
      <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
        
        {/* 1. Header Section */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Your Created Courses</h1>
            <p style={{ color: "#64748b", marginTop: "5px" }}>Manage your content and students</p>
          </div>
          <Link to="/admin/add-course" className="btn-add-new">
            <span>+</span> Add New Course
          </Link>
        </div>

        {/* 2. Grid Section */}
        {courses.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#94a3b8" }}>
            <h2>No courses found.</h2>
            <p>Click "Add New Course" to get started!</p>
          </div>
        ) : (
          <div className="admin-grid">
            {courses.map((course) => (
              <div key={course._id} className="admin-course-card">
                
                {/* Image */}
                <img 
                  src={course.imgUrl || "https://via.placeholder.com/300?text=No+Image"} 
                  alt={course.title} 
                  className="admin-card-img" 
                />

                {/* Body */}
                <div className="admin-card-body">
                  <h3 className="admin-card-title">{course.title}</h3>
                  <p className="admin-card-desc">{course.description}</p>
                  <div className="admin-card-price">${course.price}</div>
                </div>

                {/* Footer Actions */}
                <div className="admin-card-actions">
                  <button 
                    className="action-btn btn-edit"
                    onClick={() => navigate(`/admin/edit-course/${course._id}`)}
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    className="action-btn btn-delete"
                    onClick={() => handleDelete(course._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}