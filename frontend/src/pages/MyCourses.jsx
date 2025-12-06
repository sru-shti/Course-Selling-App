// src/pages/MyCourses.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";

export default function MyCourses() {
  const { token, loading } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Only attempt to fetch if a token is present and loading is done
    if (loading || !token) return;

    const fetchMyCourses = async () => {
      try {
        // Correct protected endpoint: /api/v1/user/purchases
        const res = await axiosInstance.get("/user/purchases");
        setCourses(res.data.coursesData);
      } catch (err) {
        console.error("Error fetching user purchases:", err);
        alert("Error fetching your courses: " + (err.response?.data?.message || err.message));
      }
    };
    fetchMyCourses();
  }, [token, loading]);

  // 💡 Finalized loading state display
  if (loading) return <p className="page-loading-message">Authenticating your purchases...</p>;
  
  return (
    <div className="mycourses-page-container">
      <h2 className="page-title">My Courses</h2>
      <div className="course-list-grid">
        {courses.length === 0 && <p className="no-courses-message">You have not purchased any courses yet.</p>}
        {courses.map((course) => (
          // Renders CourseCard without the onPurchase prop
          <CourseCard key={course._id} course={course} /> 
        ))}
      </div>
    </div>
  );
}