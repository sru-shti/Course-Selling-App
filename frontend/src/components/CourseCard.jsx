// src/components/CourseCard.jsx
export default function CourseCard({ course, onPurchase }) {
    
    // NOTE: This component assumes the global CSS (src/index.css) has been defined
    // with the semantic classes like .course-card, .btn-buy, etc.

    return (
        // Container
        <div className="course-card">
            
            {/* Course Details */}
            <div>
                {course.imgUrl && (
                    <img 
                        src={course.imgUrl} 
                        alt={course.title} 
                        className="course-image" 
                    />
                )}
                
                <h3 className="course-title">{course.title}</h3>
                
                <p className="course-description">{course.description}</p>
                
                <p className="course-price">Price: ${course.price}</p>
            </div>

            {/* Buy Button (Conditional Rendering) */}
            {onPurchase && (
                <button
                    onClick={() => onPurchase(course._id)}
                    className="btn-buy"
                >
                    Buy
                </button>
            )}
        </div>
    );
}