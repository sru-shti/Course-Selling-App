// src/components/AdminCourseCard.jsx
import axiosInstance from "../api/axiosConfig";

export default function AdminCourseCard({ course, onEdit, onUpdate }) {
  
  // ----------------------------------------
  // Delete Handler
  // ----------------------------------------
  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete course: ${course.title}?`)) {
      return;
    }

    try {
      // Calls the backend DELETE route: /api/v1/admin/courses/:courseId
      await axiosInstance.delete(`/admin/courses/${course._id}`);
      alert(`Course "${course.title}" deleted successfully!`);
      
      // Trigger a re-fetch in the parent component
      onUpdate(); 

    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete course. Check server logs.");
    }
  };

  return (
    <div className="border p-4 rounded shadow flex flex-col justify-between">
      <div>
        {/* Using imgUrl field from the database model */}
        {course.imgUrl && <img src={course.imgUrl} alt={course.title} className="w-full h-32 object-cover mb-2" />}
        <h3 className="text-xl font-bold">{course.title}</h3>
        <p className="text-gray-600">{course.description}</p>
        <p className="mt-2 text-lg font-semibold">Price: ${course.price}</p>
      </div>

      <div className="mt-4 flex gap-2">
        {/* Edit Button - Sets the course object to state for editing */}
        <button 
          onClick={() => onEdit(course)} 
          className="bg-yellow-500 text-white p-2 flex-1 rounded"
        >
          Edit
        </button>
        
        {/* Delete Button - Calls the handleDelete function */}
        <button 
          onClick={handleDelete} 
          className="bg-red-600 text-white p-2 flex-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}