// src/pages/Courses.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const { user, role, loading } = useAuth(); // Check user object for purchase eligibility
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (loading) return;
    const fetchCourses = async () => {
      try {
        const res = await axiosInstance.get("/course/preview");
        setCourses(res.data.courses);
      } catch (err) {
        console.error("Error fetching public courses:", err);
      }
    };
    fetchCourses();
  }, [loading]);

  if (loading) return <p className="page-loading-message">Loading application data...</p>;
  
  const purchaseCourse = async (courseId) => {
    if (!user) return alert("Please login first to purchase a course.");
    try {
      await axiosInstance.post(
        "/course/purchase_course", 
        { courseId }
      );
      alert("Course purchased successfully! Check My Courses.");
    } catch (err) {
      console.error(err);
      alert("Error purchasing course: " + (err.response?.data?.message || err.message));
    }
  };
return (
    <div className="courses-page-container">
      <h2 className="page-title">All Courses</h2>
<header className="hero-section">
        <h1>Unlock Your Potential</h1>
      </header>
      <div className="course-list-grid">
        {courses.length === 0 && <p className="no-courses-message">No courses available to display.</p>}
        {courses.map((course) => (
          <CourseCard 
            key={course._id} 
            course={course} 
            // Only pass the purchase function if the logged-in user is NOT an admin
            onPurchase={role !== 'admin' ? purchaseCourse : null} 
          /> 
        ))}
      </div>
    </div>
  );
}