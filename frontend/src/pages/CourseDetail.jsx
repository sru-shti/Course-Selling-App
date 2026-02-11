import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import ReactPlayer from "react-player";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        // Fetch the data
        const res = await axiosInstance.get(`/course/${id}`); 
        
        // Ensure we actually have course data before setting it
        if (res.data && res.data.course) {
            setCourse(res.data.course); 
        } else {
            setError("Course data is missing from server response.");
        }
      } catch (err) {
        console.error("Error fetching course detail:", err);
        setError("Failed to load course details. Please try again later.");
      }
    };
    
    if (id) {
        fetchCourseDetail();
    }
  }, [id]);

  // UI STATES
  if (error) return <div style={{textAlign: 'center', marginTop: '50px', color: 'red'}}>{error}</div>;
  if (!course) return <div style={{textAlign: 'center', marginTop: '50px', fontSize: '1.2rem'}}>Loading course details...</div>;

  // MAIN RENDER
  return (
    <div style={{maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem'}}>
      
      {/* Header */}
      <div style={{marginBottom: '1.5rem'}}>
        <h2 style={{fontSize: '2.2rem', color: '#1e293b', marginBottom: '10px'}}>
            {course.title}
        </h2>
      </div>
{/* --- NATIVE HTML5 VIDEO PLAYER --- */}
      {course.videoUrl ? (
          <div style={{
              width: '100%',
              backgroundColor: '#000', 
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              marginBottom: '2rem',
              display: 'flex',
              justifyContent: 'center'
          }}>
            
            {/* We replaced ReactPlayer with the native <video> tag */}
            <video 
                controls 
                width="100%" 
                style={{ maxHeight: '500px', backgroundColor: 'black' }}
                controlsList="nodownload"
            >
                <source src={course.videoUrl} type="video/mp4" />
                Your browser does not support the video player.
            </video>

          </div>
      ) : (
          /* Fallback if there is no video */
          course.imgUrl && (
              <img 
                src={course.imgUrl} 
                alt={course.title} 
                style={{width: '100%', borderRadius: '12px', marginBottom: '2rem', objectFit: 'cover'}}
              />
          )
      )}
      
      {/* Course Info */}
      <div style={{background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0'}}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
             <h3 style={{color: '#4f46e5', margin: 0}}>About This Course</h3>
             <span style={{background: '#e0e7ff', color: '#4f46e5', padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold'}}>
                ₹{course.price}
             </span>
          </div>
          
          <p style={{color: '#475569', lineHeight: '1.8', fontSize: '1.1rem'}}>
            {course.description}
          </p>
      </div>
      
    </div>
  );
}