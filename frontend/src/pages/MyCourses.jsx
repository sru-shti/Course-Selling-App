// src/pages/MyCourses.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
  const { token, loading } = useAuth();
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

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
    <div style={{maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem'}}>
      <h1 style={{marginBottom: '2rem', color: '#1e293b'}}>My Learning</h1>
      
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem'}}>
        {courses.map((course) => (
          <div key={course._id} style={{border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}}>
            
            <img 
              src={course.imgUrl} 
              alt={course.title} 
              style={{width: '100%', height: '200px', objectFit: 'cover'}}
            />
            
            <div style={{padding: '1.5rem'}}>
              <h3 style={{fontSize: '1.25rem', marginBottom: '0.5rem', color: '#0f172a'}}>{course.title}</h3>
              <p style={{color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                {course.description}
              </p>
              
              {/* 3. ADD THE BUTTON HERE */}
              <button 
                onClick={() => navigate(`/course/${course._id}`)} // Redirects to CourseDetail.jsx
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                ▶ Watch Course
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}