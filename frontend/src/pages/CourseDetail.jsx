//pages/CourseDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        // 💡 CRITICAL: Update URL to fetch specific course details
        const res = await axiosInstance.get(`/course/${id}`); // Assumes backend path: /api/v1/course/:id
        setCourse(res.data.course); // Assumes backend returns { course: {...} }
      } catch (err) {
        console.error("Error fetching course detail:", err);
        setCourse(null); // Keep loading state or show error
      }
    };
    
    // Only fetch if id is available
    if (id) {
        fetchCourseDetail();
    }
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>{course.content}</p>
    </div>
  );
}
