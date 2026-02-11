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

      // 🪄 CLOUDINARY MAGIC: Forces any weird downloaded video format to become a mobile-friendly MP4
  const getOptimizedVideoUrl = (url) => {
      if (!url) return "";
      
      // If it's a Cloudinary link, force the extension to be .mp4
      if (url.includes("cloudinary.com")) {
          const lastDotIndex = url.lastIndexOf('.');
          // Make sure we are actually replacing an extension at the end of the URL
          if (lastDotIndex > url.lastIndexOf('/')) {
              return url.substring(0, lastDotIndex) + '.mp4';
          }
      }
      return url;
  };

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
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              marginBottom: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
          }}>
            <video 
                controls 
                playsInline 
                preload="auto"
                width="100%" 
                style={{ maxHeight: '500px', backgroundColor: 'black', objectFit: 'contain' }}
                controlsList="nodownload"
            >
                {/* 👇 Notice we wrap the course.videoUrl in our magic function here! */}
                <source src={getOptimizedVideoUrl(course.videoUrl)} type="video/mp4" /> 
                
                Your browser does not support the video player.
            </video>

            {/* Fallback Link */}
            <div style={{ padding: '10px' }}>
                <a href={getOptimizedVideoUrl(course.videoUrl)} target="_blank" rel="noreferrer" style={{ color: '#a5b4fc', fontSize: '0.85rem' }}>
                    Video not playing? Click here to open it directly.
                </a>
            </div>
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
      {/* 👇 Changed padding from 2rem to a flexible percentage/rem combo */}
      <div style={{background: '#f8fafc', padding: '5%', borderRadius: '12px', border: '1px solid #e2e8f0'}}>
          {/* 👇 Added flexWrap so the price badge doesn't squish the text on small screens */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
             <h3 style={{color: '#4f46e5', margin: 0, fontSize: '1.5rem'}}>About This Course</h3>
             <span style={{background: '#e0e7ff', color: '#4f46e5', padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold'}}>
                ₹{course.price}
             </span>
          </div>
          
          <p style={{color: '#475569', lineHeight: '1.6', fontSize: '1rem'}}>
            {course.description}
          </p>
      </div>
      
    </div>
  );
}