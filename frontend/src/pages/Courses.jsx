// src/pages/Courses.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const { user } = useAuth(); // Changed from token to user for clarity
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Correct path for public course list
        const res = await axiosInstance.get("/course/preview"); 
        setCourses(res.data.courses);
      } catch (err) {
        console.error(err);
        alert("Error fetching courses");
      }
    };
    fetchCourses();
  }, []);

  const purchaseCourse = async (courseId) => {
    if (!user) return alert("Please login first"); // Check user object instead of raw token
    try {
      await axiosInstance.post(
        "/course/purchase_course", // Correct protected endpoint
        { courseId }
        // ❌ REMOVED: Manual headers due to Interceptor
      );
      alert("Course purchased successfully!");
    } catch (err) {
      console.error(err);
      alert("Error purchasing course");
    }
  };
// ... rest of the component

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Courses</h2>
      <div className="grid grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} onPurchase={purchaseCourse} />
        ))}
      </div>
    </div>
  );
}
