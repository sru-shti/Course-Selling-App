import React from "react";

export default function About() {
  return (
    <div className="about-page">
      
      {/* 1. Hero / Header Section */}
      <section className="about-hero" style={{textAlign: 'center', padding: '4rem 2rem', background: 'white'}}>
        <div style={{background: '#f0fdf4', color: '#166534', display: 'inline-block', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: '600'}}>
          ★ Trusted by 50,000+ students worldwide
        </div>
        
        <h1 style={{fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem', color: '#0f172a'}}>
          About <span className="gradient-text">LearnNova</span>
        </h1>
        
        <p style={{fontSize: '1.2rem', color: '#64748b', maxWidth: '700px', margin: '0 auto 3rem auto'}}>
          Empowering millions to achieve their dreams through accessible, high-quality technical education.
        </p>

        {/* Stats Grid */}
        <div style={{display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap'}}>
          <StatBox number="50,000+" label="Active Students" />
          <StatBox number="2,500+" label="Premium Courses" />
          <StatBox number="95%" label="Success Rate" />
          <StatBox number="150+" label="Countries" />
        </div>
      </section>

      {/* 2. Mission Section */}
      <section style={{maxWidth: '1000px', margin: '4rem auto', padding: '2rem', display: 'flex', gap: '3rem', alignItems: 'center'}}>
        {/* Left: Illustration */}
        <div style={{flex: 1}}>
           <img 
             src="https://img.freepik.com/free-vector/business-mission-concept-illustration_114360-7295.jpg?w=740" 
             alt="Our Mission" 
             style={{width: '100%', borderRadius: '1rem'}} 
            />
        </div>

        {/* Right: Text Content */}
        <div style={{flex: 1}}>
          <div style={{color: '#4f46e5', fontWeight: 'bold', marginBottom: '0.5rem'}}>OPEN ACCESS GLOBAL EDUCATION</div>
          <h2 style={{fontSize: '2.5rem', marginBottom: '1.5rem', color: '#0f172a'}}>Our Mission</h2>
          <p style={{color: '#64748b', lineHeight: '1.6', marginBottom: '1.5rem'}}>
            To make high-quality education accessible and affordable for everyone, everywhere. We believe learning should have no boundaries.
          </p>
          
          <ul style={{listStyle: 'none', padding: 0}}>
            <ListItem text="Accessible to all backgrounds" />
            <ListItem text="Affordable pricing models" />
            <ListItem text="Global learning community" />
            <ListItem text="Industry-relevant skills" />
          </ul>
        </div>
      </section>

    </div>
  );
}

// Helper Components for clean code
function StatBox({ number, label }) {
  return (
    <div style={{background: '#1e293b', color: 'white', padding: '1.5rem 2rem', borderRadius: '1rem', minWidth: '150px'}}>
      <div style={{fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.2rem'}}>{number}</div>
      <div style={{fontSize: '0.9rem', opacity: 0.8}}>{label}</div>
    </div>
  );
}

function ListItem({ text }) {
  return (
    <li style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#334155', fontWeight: '500'}}>
      <span style={{color: '#4f46e5', fontSize: '1.2rem'}}>✓</span> {text}
    </li>
  );
}