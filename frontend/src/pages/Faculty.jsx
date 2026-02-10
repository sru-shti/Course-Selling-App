import React from "react";

export default function Faculty() {
  const facultyMembers = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      role: "Ph.D. in Artificial Intelligence",
      desc: "Specialized in Machine Learning and Deep Neural Networks.",
      exp: "12+ years Exp",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Mr. Arjun Verma",
      role: "M.Tech in Computer Science",
      desc: "Frontend Architect with expertise in React and Vue.",
      exp: "8+ years Exp",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Mrs. Neha Kapoor",
      role: "M.S. in Cloud Computing",
      desc: "DevOps Engineer and Cloud Infrastructure Specialist.",
      exp: "10+ years Exp",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      name: "Mr. Rahul Singh",
      role: "Ph.D. in Data Science",
      desc: "Data Scientist and Machine Learning Researcher.",
      exp: "9+ years Exp",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="faculty-page" style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 className="gradient-text" style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
          MEET OUR FACULTY
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
          Learn from industry experts and academic pioneers dedicated to your success
        </p>
        <div style={{ width: "80px", height: "4px", background: "#4f46e5", margin: "1.5rem auto", borderRadius: "2px" }}></div>
      </div>

      {/* Faculty Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "3rem" }}>
        {facultyMembers.map((member) => (
          <div key={member.id} className="faculty-card">
            
            {/* Image & Badge */}
            <div className="faculty-img-container">
              <img src={member.img} alt={member.name} className="faculty-img" />
            </div>
            <span className="exp-badge">{member.exp}</span>

            {/* Content */}
            <h3 style={{ marginTop: "1.5rem", marginBottom: "5px", color: "#1e293b" }}>{member.name}</h3>
            <p style={{ color: "#7c3aed", fontWeight: "600", fontSize: "0.9rem", marginBottom: "1rem" }}>
              {member.role}
            </p>
            <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: "1.5", marginBottom: "1.5rem" }}>
              {member.desc}
            </p>

            {/* Stars */}
            <div style={{ color: "#fbbf24", marginBottom: "1.5rem" }}>★★★★★</div>

            {/* Social Icons */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span className="social-icon" style={{ background: "#10b981" }}>✉</span>
              <span className="social-icon" style={{ background: "#0ea5e9" }}>in</span>
              <span className="social-icon" style={{ background: "#ec4899" }}>📷</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}