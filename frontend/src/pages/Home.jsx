import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import CourseCard from "../components/CourseCard"; 

export default function Home() {
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosInstance.get("/course/preview");
        setFeaturedCourses(res.data.courses.slice(0, 3));
      } catch (err) {
        console.error("Error fetching preview courses", err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="home-page">
      
      {/* --- HERO SECTION --- */}
      <section className="hero-container">
        <div className="hero-content">
          <span className="hero-tag">✨ New Features Available</span>
          <h1 className="hero-title">
            Build Amazing <br />
            <span className="gradient-text">Digital Products</span>
          </h1>
          <p className="hero-subtitle">
            Create beautiful, responsive web applications with our powerful tools and courses. Start building your next project today.
          </p>
          
          <div className="hero-buttons">
            <Link to="/courses">
              {/* Only the Get Started button remains */}
              <button className="btn-primary" style={{borderRadius: '50px', padding: '14px 36px', fontSize: '1.1rem'}}>
                Get Started
              </button>
            </Link>
          </div>

          <div className="hero-features">
            <div className="feature-item">✅ Easy to Use</div>
            <div className="feature-item">✅ Fast & Secure</div>
            <div className="feature-item">✅ 24/7 Support</div>
            <div className="feature-item">✅ Free Updates</div>
          </div>
        </div>

        <div className="hero-image-container">
         <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Team working" 
            className="hero-img" 
        />
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="stats-container">
        <div className="stat-item">
            <div className="stat-number">10k+</div>
            <div className="stat-label">Students Enrolled</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Expert Instructors</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
            <div className="stat-number">4.9</div>
            <div className="stat-label">Average Rating</div>
        </div>
      </section>

      {/* --- FEATURED COURSES SECTION --- */}
      <section className="section-container">
         <div className="section-header">
            <h2 className="section-title">Explore Top Courses</h2>
            <p className="section-subtitle">
               Hand-picked courses to help you master new skills and advance your career path.
            </p>
         </div>

         <div className="course-list-grid">
            {featuredCourses.length > 0 ? (
                featuredCourses.map(course => (
                    <CourseCard key={course._id} course={course} onPurchase={() => console.log("Go to courses page")} />
                ))
            ) : (
                <p style={{textAlign: 'center', color: '#94a3b8'}}>Loading top courses...</p>
            )}
         </div>

         <div style={{ textAlign: 'center' }}>
            <Link to="/courses" className="btn-secondary">
                View All Courses →
            </Link>
         </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="cta-container">
         <div className="cta-circle" style={{width: '300px', height: '300px', top: '-100px', left: '-100px'}}></div>
         <div className="cta-circle" style={{width: '200px', height: '200px', bottom: '-50px', right: '-50px'}}></div>

         <div className="cta-content">
            <h2 className="cta-title">Ready to start your career?</h2>
            <p className="cta-text">
               Join thousands of students learning to code today. Get unlimited access to all courses with our premium plan.
            </p>
            <Link to="/login">
                <button className="btn-white">
                    Join for Free
                </button>
            </Link>
         </div>
      </section>

    </div>
  );
}