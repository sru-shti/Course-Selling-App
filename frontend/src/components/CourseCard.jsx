import React from "react";

export default function CourseCard({ course, onPurchase }) {
    // Helper function to convert standard YouTube links to Embed links
    const getEmbedUrl = (url) => {
        if (!url) return null;
        try {
            // Handles 'v=' IDs
            const videoId = url.split("v=")[1];
            if (videoId) {
                const ampPosition = videoId.indexOf("&");
                return "https://www.youtube.com/embed/" + (ampPosition !== -1 ? videoId.substring(0, ampPosition) : videoId);
            }
            // Handles 'youtu.be/' short links
            if (url.includes("youtu.be/")) {
                return "https://www.youtube.com/embed/" + url.split("youtu.be/")[1];
            }
            // If it's already an embed link, return as is
            if (url.includes("embed/")) return url;
            
            return null;
        } catch (e) {
            return null;
        }
    };

    const embedLink = getEmbedUrl(course.videoUrl);

    // LOGIC: If 'onPurchase' exists, we are in the Store (Show Buy Button).
    // If 'onPurchase' is MISSING, we are in My Courses (Show Video).
    const isPurchased = !onPurchase; 

    return (
        <div className="course-card">
            
            {/* 1. If purchased AND has video, show the Player */}
            {isPurchased && embedLink ? (
                <div className="video-container" style={{ marginBottom: '1rem' }}>
                    <iframe 
                        width="100%" 
                        height="200" 
                        src={embedLink} 
                        title={course.title} 
                        style={{ borderRadius: '0.5rem', border: 'none' }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                </div>
            ) : (
                /* 2. Otherwise show the Image (Thumbnail) */
                <>
                    <div className="badge">New</div>
                    {course.imgUrl && <img src={course.imgUrl} className="course-image" alt={course.title} />}
                </>
            )}

            <div className="card-body">
                <h3 className="course-title">{course.title}</h3>
                
                {/* Only show price if we haven't bought it yet */}
                {!isPurchased && <p className="course-price">${course.price}</p>}
                
                <p className="course-description" style={{fontSize: '0.9rem', color: '#666'}}>
                    {course.description}
                </p>

                {/* 3. Buy Button (Only visible in Store) */}
                {onPurchase && (
                    <button
                        onClick={() => onPurchase(course._id)}
                        className="btn-buy"
                    >
                        Buy Now
                    </button>
                )}

                {/* 4. "Watch Now" Label (Only visible in My Courses if video exists) */}
                {isPurchased && embedLink && (
                    <div style={{marginTop: '10px', color: '#4f46e5', fontWeight: 'bold', fontSize: '0.9rem'}}>
                        ▶ Now Playing
                    </div>
                )}
            </div>
        </div>
    );
}