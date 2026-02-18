import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import ReactPlayer from "react-player";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");

 // AI STATES
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]); 
  const [isAiLoading, setIsAiLoading] = useState(false);
  
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

  // 🪄 CLOUDINARY MAGIC
  const getOptimizedVideoUrl = (url) => {
      if (!url) return "";
      
      if (url.includes("cloudinary.com")) {
          const lastDotIndex = url.lastIndexOf('.');
          if (lastDotIndex > url.lastIndexOf('/')) {
              return url.substring(0, lastDotIndex) + '.mp4';
          }
      }
      return url;
  };

// 🤖 AI SUBMIT HANDLER
  const handleAskAI = async (e) => {
      e.preventDefault();
      if (!currentQuestion.trim()) return;

      const questionToSend = currentQuestion;
      
      // 1. Instantly show the user's question on the screen
      const newHistory = [...chatHistory, { sender: "user", text: questionToSend }];
      setChatHistory(newHistory);
      setCurrentQuestion(""); // Clear the input box
      setIsAiLoading(true);

      try {
          // 2. Send the question AND the memory array to the backend
          const res = await axiosInstance.post("/ai/ask", {
              question: questionToSend,
              courseTitle: course.title,
              history: chatHistory // We send the old history!
          });
          
          // 3. Add the AI's answer to the chat memory
          setChatHistory([...newHistory, { sender: "ai", text: res.data.answer }]);
      } catch (err) {
          console.error("AI Error:", err);
          setChatHistory([...newHistory, { sender: "ai", text: "Sorry, I had a connection error!" }]);
      } finally {
          setIsAiLoading(false);
      }
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
                <source src={getOptimizedVideoUrl(course.videoUrl)} type="video/mp4" /> 
                Your browser does not support the video player.
            </video>
          </div>
      ) : (
          course.imgUrl && (
              <img 
                src={course.imgUrl} 
                alt={course.title} 
                style={{width: '100%', borderRadius: '12px', marginBottom: '2rem', objectFit: 'cover'}}
              />
          )
      )}
      
      {/* Course Info */}
      <div style={{background: '#f8fafc', padding: '5%', borderRadius: '12px', border: '1px solid #e2e8f0'}}>
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

      {/* --- 🤖 AI TEACHING ASSISTANT SECTION (Continuous Chat) --- */}
      <div style={{marginTop: '2rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)'}}>
          <h3 style={{color: '#0f172a', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.4rem'}}>
              💬 AI Teaching Assistant
          </h3>
          <p style={{color: '#64748b', fontSize: '0.95rem', marginBottom: '1.2rem'}}>
              Ask questions about the course. I will remember what we talk about!
          </p>

          {/* 📜 THE SCROLLING CHAT WINDOW */}
          <div style={{
              maxHeight: '300px', 
              overflowY: 'auto', 
              padding: '10px', 
              marginBottom: '15px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '10px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #cbd5e1'
          }}>
              {chatHistory.length === 0 ? (
                  <div style={{textAlign: 'center', color: '#94a3b8', padding: '20px'}}>
                      Start the conversation! Say hello. 👋
                  </div>
              ) : (
                  chatHistory.map((msg, index) => (
                      <div key={index} style={{
                          alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                          backgroundColor: msg.sender === 'user' ? '#4f46e5' : '#f1f5f9',
                          color: msg.sender === 'user' ? 'white' : '#1e293b',
                          padding: '10px 15px',
                          borderRadius: '15px',
                          maxWidth: '80%',
                          borderBottomRightRadius: msg.sender === 'user' ? '0' : '15px',
                          borderBottomLeftRadius: msg.sender === 'ai' ? '0' : '15px',
                          lineHeight: '1.5'
                      }}>
                          {msg.text}
                      </div>
                  ))
              )}
              {isAiLoading && (
                  <div style={{ alignSelf: 'flex-start', backgroundColor: '#f1f5f9', padding: '10px 15px', borderRadius: '15px', color: '#64748b' }}>
                      Typing... ✍️
                  </div>
              )}
          </div>

          {/* ⌨️ THE INPUT BAR */}
          <form onSubmit={handleAskAI} style={{display: 'flex', gap: '10px'}}>
              <input
                  type="text"
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  placeholder="Ask a follow-up question..."
                  style={{flex: '1', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem'}}
              />
              <button
                  type="submit"
                  disabled={isAiLoading || !currentQuestion.trim()}
                  style={{
                      padding: '12px 24px', 
                      background: isAiLoading ? '#a5b4fc' : '#4f46e5', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: isAiLoading ? 'not-allowed' : 'pointer',
                      fontWeight: 'bold',
                      fontSize: '1rem'
                  }}
              >
                  Send 🚀
              </button>
          </form>
      </div>
    </div>
  );
}