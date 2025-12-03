// src/pages/MyCourses.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";

export default function MyCourses() {
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Only attempt to fetch if a token is present
    if (!token) return; 

    const fetchMyCourses = async () => {
      try {
        // Correct protected endpoint: /api/v1/user/purchases
        const res = await axiosInstance.get("/user/purchases");
        // ❌ NO MANUAL HEADERS NEEDED! Axios Interceptor handles the token.
        setCourses(res.data.coursesData);
      } catch (err) {
        console.error("Error fetching user purchases:", err);
        alert("Error fetching your courses: " + (err.response?.data?.message || err.message));
      }
    };
    fetchMyCourses();
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Courses</h2>
      <div className="grid grid-cols-3 gap-4">
        {courses.length === 0 && <p>You have not purchased any courses yet.</p>}
        {courses.map((course) => (
          // No onPurchase prop here, so the Buy button is hidden (correct)
          <CourseCard key={course._id} course={course} /> 
        ))}
      </div>
    </div>
  );
}