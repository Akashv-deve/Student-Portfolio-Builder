import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        {/* Top Section: Grid Layout */}
        <div className="footer-top">
          
          {/* Column 1: Brand & Description */}
          <div className="footer-brand-col">
            <h3 className="footer-logo">Student Portfolio Builder</h3>
            <p className="footer-description">
              Empowering computer science and engineering students to create stunning, responsive portfolios in minutes. Stand out to recruiters and land your dream role.
            </p>
            <div className="footer-socials">
              <a href="#twitter" className="social-link" aria-label="Twitter" title="Twitter">🐦</a>
              <a href="#linkedin" className="social-link" aria-label="LinkedIn" title="LinkedIn">💼</a>
              <a href="#github" className="social-link" aria-label="GitHub" title="GitHub">🐙</a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Features</a></li>
              <li><a href="#education">Education</a></li>
              <li><a href="#projects">Projects</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="footer-contact-col">
            <h4 className="footer-heading">Contact Info</h4>
            <ul className="footer-list">
              <li><span className="contact-icon">📧</span> support@portfoliobuilder.com</li>
              <li><span className="contact-icon">📍</span> Theni, Tamil Nadu, India</li>
              <li><span className="contact-icon">🎓</span> Open for Student Feedback</li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Section: Copyright */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} Student Portfolio Builder. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;