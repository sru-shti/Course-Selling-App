import { useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function AdminAddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState(""); // <--- 1. NEW STATE
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post("/admin/courses", {
        title,
        description,
        price,
        imgUrl,
        videoUrl // <--- 2. SEND TO BACKEND
      });
      alert("🎉 Course Published Successfully!");
      navigate("/admin/courses");
    } catch (err) {
      alert("Failed to create course. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="admin-container">
      <div className="creator-card">
        
        {/* Header Section */}
        <div className="creator-header">
          <h1>Course Creator Studio</h1>
          <p>Design a new learning experience for your students</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="creator-form">
          
          {/* Title */}
          <div className="form-group">
            <label>Course Title</label>
            <input 
              className="input-field" 
              placeholder="e.g. Master React in 30 Days"
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea 
              className="input-field" 
              placeholder="What will students learn in this course?"
              rows="3"
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
            />
          </div>

          {/* Price & Image Row */}
          <div className="form-row">
            <div className="form-group">
              <label>Price ($)</label>
              <input 
                type="number" 
                className="input-field" 
                placeholder="49.99"
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Thumbnail Image URL</label>
              <input 
                className="input-field" 
                placeholder="https://..."
                value={imgUrl} 
                onChange={(e) => setImgUrl(e.target.value)} 
              />
            </div>
          </div>

          {/* --- 3. VIDEO URL INPUT --- */}
          <div className="form-group video-input-wrapper">
            <label style={{color: '#7c3aed'}}>📺 Video Content (YouTube URL)</label>
            <input 
              className="input-field" 
              placeholder="Paste YouTube Link here (e.g. https://youtu.be/...)"
              value={videoUrl} 
              onChange={(e) => setVideoUrl(e.target.value)} 
            />
            {/* Small helper text */}
            <small style={{display: 'block', marginTop: '5px', color: '#94a3b8'}}>
              Students will see this video immediately after purchase.
            </small>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-create" disabled={loading}>
            {loading ? "Publishing..." : "🚀 Publish Course"}
          </button>

        </form>
      </div>
    </div>
  );
}