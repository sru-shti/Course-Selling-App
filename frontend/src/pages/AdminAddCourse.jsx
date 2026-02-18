import { useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function AdminAddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  
  // New States for switching modes
  const [videoType, setVideoType] = useState("url"); // 'url' or 'upload'
  const [videoUrl, setVideoUrl] = useState("");      // For YouTube Link
  const [videoFile, setVideoFile] = useState(null);  // For File Upload
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
  
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("imgUrl", imgUrl);

      // 2. Decide which video source to send
      if (videoType === "url") {
        formData.append("videoUrl", videoUrl);
      } else if (videoType === "upload" && videoFile) {
        formData.append("videoFile", videoFile); 
      }

      // 3. Send Request (Content-Type header is handled automatically by axios for FormData)
      await axiosInstance.post("/admin/courses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("🎉 Course Published Successfully!");
      navigate("/admin/courses");

    } catch (err) {
      console.error(err);
      alert("Failed to create course.");
    }
    setLoading(false);
  };

  return (
    <div className="admin-container">
      <div className="creator-card">
        <div className="creator-header">
          <h1>Course Creator Studio</h1>
        </div>

        <form onSubmit={handleSubmit} className="creator-form">
          {/* ... Title, Desc, Price inputs remain same ... */}
          
          <div className="form-group">
            <label>Course Title</label>
            <input className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          
          <div className="form-group">
             <label>Description</label>
             <textarea className="input-field" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          
          <div className="form-row">
             <div className="form-group">
                <label>Price</label>
                <input type="number" className="input-field" value={price} onChange={(e) => setPrice(e.target.value)} required />
             </div>
             <div className="form-group">
                <label>Thumbnail URL</label>
                <input className="input-field" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
             </div>
          </div>

          {/* --- VIDEO SELECTION SECTION --- */}
          <div className="form-group video-input-wrapper" style={{background: '#f8fafc', padding: '15px', borderRadius: '10px'}}>
            <label style={{color: '#7c3aed', marginBottom: '10px', display:'block'}}>📺 Course Video Source</label>
            
            {/* Toggle Buttons */}
            <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
                <button 
                    type="button" 
                    onClick={() => setVideoType("url")}
                    style={{
                        padding: '8px 16px', 
                        borderRadius: '20px', 
                        border: '1px solid #7c3aed',
                        background: videoType === 'url' ? '#7c3aed' : 'white',
                        color: videoType === 'url' ? 'white' : '#7c3aed',
                        cursor: 'pointer'
                    }}
                >
                    🔗 YouTube URL
                </button>
                <button 
                    type="button" 
                    onClick={() => setVideoType("upload")}
                    style={{
                        padding: '8px 16px', 
                        borderRadius: '20px', 
                        border: '1px solid #7c3aed',
                        background: videoType === 'upload' ? '#7c3aed' : 'white',
                        color: videoType === 'upload' ? 'white' : '#7c3aed',
                        cursor: 'pointer'
                    }}
                >
                    📤 Upload File
                </button>
            </div>

            {/* Conditional Inputs */}
            {videoType === "url" ? (
                <input 
                  className="input-field" 
                  placeholder="Paste YouTube Link (e.g. https://youtu.be/...)"
                  value={videoUrl} 
                  onChange={(e) => setVideoUrl(e.target.value)} 
                />
            ) : (
                <input 
                  type="file" 
                  accept="video/*"
                  className="input-field"
                  onChange={(e) => setVideoFile(e.target.files[0])} 
                />
            )}
            
            <small style={{display: 'block', marginTop: '5px', color: '#94a3b8'}}>
              {videoType === 'upload' ? "Note: Large files may take a minute to upload." : ""}
            </small>
          </div>

          <button type="submit" className="btn-create" disabled={loading}>
            {loading ? (videoType === 'upload' ? "Uploading Video..." : "Publishing...") : "🚀 Publish Course"}
          </button>

        </form>
      </div>
    </div>
  );
}