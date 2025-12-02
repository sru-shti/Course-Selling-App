// src/pages/MyCourses.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";

export default function MyCourses() {
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await axiosInstance.get("/user/purchases");
        // ❌ REMOVED: Manual headers due to Interceptor
        setCourses(res.data.coursesData);
      } catch (err) {
        console.error(err);
        alert("Error fetching your courses");
      }
    };
    fetchMyCourses();
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Courses</h2>
      <div className="grid grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
}
