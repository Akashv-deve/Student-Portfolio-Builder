import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send the data to a backend or service here
    alert(`Thanks for reaching out, ${formData.name}! Your message has been simulated.`);
    setFormData({ name: '', email: '', message: '' }); // Reset form
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Section Header */}
        <div className="contact-header">
          <h2 className="contact-title">Contact Us</h2>
          <div className="contact-divider"></div>
        </div>

        <div className="contact-content">
          {/* Left Side: Info & Socials */}
          <div className="contact-info">
            <h3 className="info-title">Let's Connect</h3>
            <p className="info-description">
              Have questions about building your portfolio or need technical support? We're here to help. Reach out to us through the form or connect with us on social media.
            </p>
            
            <div className="social-icons">
              <a href="#twitter" className="social-icon" aria-label="Twitter" title="Twitter">🐦</a>
              <a href="#linkedin" className="social-icon" aria-label="LinkedIn" title="LinkedIn">💼</a>
              <a href="#github" className="social-icon" aria-label="GitHub" title="GitHub">🐙</a>
              <a href="#email" className="social-icon" aria-label="Email" title="Email">✉️</a>
            </div>
          </div>

          {/* Right Side: Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                className="form-textarea"
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;