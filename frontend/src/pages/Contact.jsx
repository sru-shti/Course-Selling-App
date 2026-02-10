import React, { useState } from "react";

export default function Contact() {
  // 1. Get Number from .env (Secure)
  const ADMIN_PHONE = import.meta.env.VITE_ADMIN_PHONE; 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Course Inquiry",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppMessage = (e) => {
    e.preventDefault();
    const { name, email, phone, subject, message } = formData;

    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Format message with WhatsApp styling (*bold*, %0a for new line)
    const text = `*New Inquiry from Website*%0a%0a*👤 Name:* ${name}%0a*✉️ Email:* ${email}%0a*📞 Phone:* ${phone}%0a*📝 Subject:* ${subject}%0a%0a*💬 Message:*%0a${message}`;

    window.open(`https://wa.me/${ADMIN_PHONE}?text=${text}`, "_blank");
  };

  return (
    <div className="contact-page">
      
      {/* Header Section */}
      <div className="contact-header">
        <h1 className="contact-title">Contact Us</h1>
        <div className="contact-divider"></div>
      </div>

      <div className="contact-container">
        
        {/* Left: Form */}
        <div className="contact-form-box">
          <form onSubmit={handleWhatsAppMessage}>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="contact-input" 
                  placeholder="John Doe"
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="contact-input" 
                  placeholder="john@example.com"
                  required 
                />
              </div>
            </div>

            <div className="form-group mb-4">
              <label className="form-label">Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                className="contact-input" 
                placeholder="+1 234 567 890"
              />
            </div>

            <div className="form-group mb-4">
              <label className="form-label">Subject</label>
              <select 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                className="contact-input"
              >
                <option>Course Inquiry</option>
                <option>Technical Support</option>
                <option>Billing</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group mb-6">
              <label className="form-label">Message *</label>
              <textarea 
                rows="4" 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                className="contact-input" 
                placeholder="How can we help you?"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-whatsapp">
              <span>📱</span> Send via WhatsApp
            </button>
          </form>
        </div>

        {/* Right: Image */}
        <div className="contact-img-container">
          <img 
            src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?w=740" 
            alt="Customer Support" 
            className="contact-img" 
          />
        </div>
      </div>

      <div className="contact-footer">
        We usually reply within a few hours!
      </div>
    </div>
  );
}