// src/pages/Courses.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
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
    if (!token) return alert("Please login first");
    try {
      await axiosInstance.post(
        "/course/purchase_course",
        { courseId },
        { headers: { token } }
      );
      alert("Course purchased successfully!");
    } catch (err) {
      console.error(err);
      alert("Error purchasing course");
    }
  };

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
