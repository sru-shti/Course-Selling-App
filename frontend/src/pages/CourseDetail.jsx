// src/pages/CourseDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig"; // Assuming axiosInstance is imported here

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const res = await axiosInstance.get(`/course/${id}`); 
        setCourse(res.data.course); 
      } catch (err) {
        console.error("Error fetching course detail:", err);
        setCourse(null); 
      }
    };
    
    if (id) {
        fetchCourseDetail();
    }
  }, [id]);

  if (!course) return <p className="course-detail-loading">Loading course details...</p>;

  return (
    <div className="course-detail-container">
      
      {/* Header Section */}
      <div className="course-detail-header">
        <h2 className="course-detail-title">{course.title}</h2>
        {/* You could conditionally render the image here if available */}
        {/* {course.imgUrl && <img src={course.imgUrl} className="course-detail-image" alt={course.title} />} */}
      </div>
      
      {/* Description */}
      <p className="course-detail-description">{course.description}</p>
      
      {/* Main Content */}
      <div className="course-detail-content">
        <h3 className="content-heading">Course Content</h3>
        {/* NOTE: If course.content is a string, you might use dangerouslySetInnerHTML here */}
        <p>{course.content}</p> 
      </div>
      
    </div>
  );
}