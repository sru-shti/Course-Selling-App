// src/pages/AdminCourses.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";

export default function AdminCourses() {
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosInstance.get("/admin/course/bulk", {
          headers: { token },
        });
        setCourses(res.data.courses);
      } catch (err) {
        console.error(err);
        alert("Error fetching courses");
      }
    };
    fetchCourses();
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Courses</h2>
      <div className="grid grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
}
