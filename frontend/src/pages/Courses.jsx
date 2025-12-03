// src/pages/Courses.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const { user } = useAuth(); // Check user object for purchase eligibility
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Correct public route: /api/v1/course/preview
        const res = await axiosInstance.get("/course/preview");
        setCourses(res.data.courses);
      } catch (err) {
        console.error("Error fetching public courses:", err);
        // Display a user-friendly error
      }
    };
    fetchCourses();
  }, []);

  const purchaseCourse = async (courseId) => {
    if (!user) return alert("Please login first to purchase a course.");
    try {
      await axiosInstance.post(
        "/course/purchase_course", 
        { courseId }
        // ❌ NO MANUAL HEADERS NEEDED! Axios Interceptor handles the token.
      );
      alert("Course purchased successfully! Check My Courses.");
    } catch (err) {
      console.error(err);
      alert("Error purchasing course: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Courses</h2>
      <div className="grid grid-cols-3 gap-4">
        {courses.length === 0 && <p>No courses available to display.</p>}
        {courses.map((course) => (
          // onPurchase prop ensures the Buy button is visible
          <CourseCard key={course._id} course={course} onPurchase={purchaseCourse} /> 
        ))}
      </div>
    </div>
  );
}