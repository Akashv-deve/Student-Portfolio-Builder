import React from 'react';

const UIUXDesigner = ({ portfolioData }) => {
  // Destructure with fallbacks for the live builder preview
  const {
    name = "First Last",
    role = "UI / UX Designer",
    about = "I craft digital experiences focused on ultra-minimalism, massive typography, and intuitive functionality.",
    projects = [
      { id: 1, title: "Project One", category: "Mobile App", imageUrl: "https://placehold.co/1200x800/eeeeee/999999?text=Visual+Placeholder" },
      { id: 2, title: "Project Two", category: "Web Platform", imageUrl: "https://placehold.co/1200x800/eeeeee/999999?text=Visual+Placeholder" }
    ],
    contactEmail = "hello@example.com"
  } = portfolioData || {};

  return (
    <div style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', backgroundColor: '#ffffff', color: '#111111', padding: '5vw 10vw' }}>
      
      {/* Hero Section */}
      <header style={{ height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '8vw', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-0.03em', margin: '0' }}>
          {name}.
        </h1>
        <h2 style={{ fontSize: '3vw', fontWeight: '400', color: '#666666', marginTop: '20px' }}>
          {role}
        </h2>
      </header>

      {/* About Section */}
      <section style={{ paddingBottom: '15vh' }}>
        <p style={{ fontSize: '2.5vw', lineHeight: '1.4', maxWidth: '80%' }}>
          {about}
        </p>
      </section>

      {/* Visual Projects Grid */}
      <section>
        {projects.map((project) => (
          <div key={project.id} style={{ marginBottom: '10vh' }}>
            <div style={{ width: '100%', backgroundColor: '#f5f5f5', overflow: 'hidden', aspectRatio: '16/9' }}>
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontSize: '1.2rem' }}>
              <strong style={{ fontWeight: '600' }}>{project.title}</strong>
              <span style={{ color: '#666666' }}>{project.category}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Minimal Footer */}
      <footer style={{ paddingTop: '10vh', borderTop: '2px solid #111111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '4vw', margin: 0 }}>Let's Talk.</h3>
        <a href={`mailto:${contactEmail}`} style={{ fontSize: '1.5vw', color: '#111111', textDecoration: 'none', borderBottom: '1px solid #111111' }}>
          {contactEmail}
        </a>
      </footer>

    </div>
  );
};

export default UIUXDesigner;