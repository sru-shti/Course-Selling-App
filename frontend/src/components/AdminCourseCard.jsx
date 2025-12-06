// src/components/AdminCourseCard.jsx
import axiosInstance from "../api/axiosConfig";

export default function AdminCourseCard({ course, onEdit, onUpdate }) {
  
  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete course: ${course.title}?`)) {
      return;
    }

    try {
      await axiosInstance.delete(`/admin/courses/${course._id}`);
      alert(`Course "${course.title}" deleted successfully!`);
      onUpdate(); 

    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete course. Check server logs.");
    }
  };

  return (
    // 💡 Replaced Tailwind with semantic classes
    <div className="admin-card">
      
      {/* Course Details */}
      <div>
        {course.imgUrl && (
          <img 
            src={course.imgUrl} 
            alt={course.title} 
            className="card-image" 
          />
        )}
        
        <h3 className="card-title">{course.title}</h3>
        
        <p className="card-description">{course.description}</p>
        
        <p className="card-price">Price: ${course.price}</p>
      </div>

      {/* Admin Action Buttons */}
      <div className="card-actions">
        
        <button 
          onClick={() => onEdit(course)} 
          className="btn-edit"
        >
          Edit
        </button>
        
        <button 
          onClick={handleDelete} 
          className="btn-delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
}