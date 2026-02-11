import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";

export default function AdminEditCourse() {
  const { id } = useParams(); // Get the course ID from the URL
  const navigate = useNavigate();

  // Form States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  
  // Video States
  const [videoType, setVideoType] = useState("url"); 
  const [videoUrl, setVideoUrl] = useState("");      
  const [videoFile, setVideoFile] = useState(null);  

  // Loading States
  const [fetching, setFetching] = useState(true); 
  const [saving, setSaving] = useState(false);

  // 1. FETCH THE EXISTING COURSE DATA
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get(`/course/${id}`);
        const courseData = res.data.course;
        
        // Populate the form with existing data
        setTitle(courseData.title || "");
        setDescription(courseData.description || "");
        setPrice(courseData.price || "");
        setImgUrl(courseData.imgUrl || "");
        
        // If they already have a video URL, put it in the box
        if (courseData.videoUrl) {
            setVideoUrl(courseData.videoUrl);
        }

        setFetching(false); 
      } catch (err) {
        console.error("Failed to fetch course:", err);
        alert("Could not load course data.");
        navigate("/admin/courses");
      }
    };

    fetchCourse();
  }, [id, navigate]);

  // 2. HANDLE UPDATING THE COURSE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("imgUrl", imgUrl);

      if (videoType === "url") {
        formData.append("videoUrl", videoUrl);
      } else if (videoType === "upload" && videoFile) {
        formData.append("videoFile", videoFile); 
      }

      await axiosInstance.put(`/admin/courses/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Course Updated Successfully!");
      navigate("/admin/courses");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update course.");
    }
    setSaving(false);
  };

  if (fetching) return <div style={{textAlign: 'center', marginTop: '50px', fontSize: '1.2rem'}}>Loading course data...</div>;

  return (
    <div className="admin-container" style={{padding: '2rem', maxWidth: '800px', margin: '0 auto'}}>
      <div className="creator-card" style={{background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}>
        
        <h1 style={{fontSize: '1.8rem', marginBottom: '1.5rem', color: '#1e293b'}}>
            Edit Course
        </h1>

        <form onSubmit={handleSubmit} className="creator-form">
          
          <div className="form-group" style={{marginBottom: '1rem'}}>
            <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>Course Title</label>
            <input 
                className="input-field" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
                style={{width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0'}}
            />
          </div>
          
          <div className="form-group" style={{marginBottom: '1rem'}}>
             <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>Description</label>
             <textarea 
                className="input-field" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
                rows="4"
                style={{width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0'}}
             />
          </div>
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
             <div>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>Price (₹)</label>
                <input 
                    type="number" 
                    className="input-field" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    required 
                    style={{width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0'}}
                />
             </div>
             <div>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>Thumbnail URL</label>
                <input 
                    className="input-field" 
                    value={imgUrl} 
                    onChange={(e) => setImgUrl(e.target.value)} 
                    style={{width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0'}}
                />
             </div>
          </div>

          <div style={{background: '#f8fafc', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '1.5rem', border: '1px solid #e2e8f0'}}>
            <label style={{color: '#4f46e5', fontWeight: '600', marginBottom: '10px', display:'block'}}>📺 Update Video</label>
            
            <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
                <button type="button" onClick={() => setVideoType("url")} style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #4f46e5', background: videoType === 'url' ? '#4f46e5' : 'white', color: videoType === 'url' ? 'white' : '#4f46e5', cursor: 'pointer', fontWeight: '500' }}>🔗 Keep or Change URL</button>
                <button type="button" onClick={() => setVideoType("upload")} style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #4f46e5', background: videoType === 'upload' ? '#4f46e5' : 'white', color: videoType === 'upload' ? 'white' : '#4f46e5', cursor: 'pointer', fontWeight: '500' }}>📤 Upload New File</button>
            </div>

            {videoType === "url" ? (
                <input className="input-field" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} style={{width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1'}} />
            ) : (
                <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} style={{width: '100%', padding: '0.5rem', background: 'white', borderRadius: '0.5rem', border: '1px solid #cbd5e1'}} />
            )}
          </div>

          <button type="submit" disabled={saving} style={{ width: '100%', padding: '1rem', background: saving ? '#94a3b8' : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: 'white', border: 'none', borderRadius: '0.75rem', fontWeight: 'bold', fontSize: '1rem', cursor: saving ? 'not-allowed' : 'pointer' }}>
            {saving ? "Saving Changes..." : "💾 Save Changes"}
          </button>

        </form>
      </div>
    </div>
  );
}