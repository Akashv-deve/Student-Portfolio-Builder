import React from 'react';

const FrontendDeveloper = ({ data }) => {
  const { personal, projects, education, skills, socials } = data;

  return (
    <div style={{
      backgroundColor: '#0f172a', // Deep cinematic blue-black
      color: '#e2e8f0',
      fontFamily: "'Inter', system-ui, sans-serif",
      minHeight: '100%',
      padding: '3rem 2rem',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Hero Section with Cinematic Gradient Typography */}
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            margin: '0 0 0.5rem 0',
            background: 'linear-gradient(135deg, #38bdf8, #818cf8, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-1px'
          }}>
            {personal?.name || 'Developer Name'}
          </h1>
          <h2 style={{ 
            fontSize: '1.2rem', color: '#94a3b8', margin: '0 0 1.5rem 0', 
            textTransform: 'uppercase', letterSpacing: '3px', fontWeight: '600'
          }}>
            {personal?.role || 'Frontend Engineer'}
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: '1.7', maxWidth: '600px', margin: '0 auto' }}>
            {personal?.bio || 'Passionate about building highly interactive, visually stunning user interfaces and seamless digital experiences.'}
          </p>
        </header>

        {/* Skills - Floating Neon Pills */}
        {skills && skills.length > 0 && (
          <section style={{ marginBottom: '4rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#f8fafc', marginBottom: '1.5rem', textAlign: 'center', fontWeight: '700' }}>
              Core Technologies
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              {skills.map((skill, idx) => (
                <span key={idx} style={{
                  padding: '0.6rem 1.2rem',
                  backgroundColor: 'rgba(56, 189, 248, 0.1)',
                  color: '#38bdf8',
                  borderRadius: '9999px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects - Hover Cards */}
        {projects && projects.length > 0 && (
          <section style={{ marginBottom: '4rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#f8fafc', borderBottom: '1px solid #1e293b', paddingBottom: '1rem', marginBottom: '2rem' }}>
              Selected Works
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {projects.map((proj, idx) => (
                <div key={idx} style={{
                  backgroundColor: '#1e293b',
                  padding: '2rem',
                  borderRadius: '16px',
                  border: '1px solid #334155',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = '#818cf8';
                  e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(129, 140, 248, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#334155';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <h4 style={{ margin: '0 0 0.75rem 0', color: '#c084fc', fontSize: '1.3rem' }}>{proj.title}</h4>
                  <p style={{ margin: 0, color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem' }}>{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education - Clean Timeline */}
        {education && education.length > 0 && (
          <section style={{ marginBottom: '4rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#f8fafc', borderBottom: '1px solid #1e293b', paddingBottom: '1rem', marginBottom: '2rem' }}>
              Academic Background
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {education.map((edu, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: '#f8fafc', fontSize: '1.1rem' }}>{edu.institution}</h4>
                    <p style={{ margin: 0, color: '#818cf8', fontSize: '0.95rem' }}>{edu.degree}</p>
                  </div>
                  <div style={{ backgroundColor: '#1e293b', padding: '0.4rem 1rem', borderRadius: '8px', border: '1px solid #334155', color: '#38bdf8', fontWeight: 'bold' }}>
                    {edu.score}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Footer */}
        <footer style={{ textAlign: 'center', marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            {socials?.email && (
              <a href={`mailto:${socials.email}`} style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#38bdf8'} onMouseOut={e => e.target.style.color = '#94a3b8'}>Email</a>
            )}
            {socials?.github && (
              <a href={socials.github} target="_blank" rel="noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#38bdf8'} onMouseOut={e => e.target.style.color = '#94a3b8'}>GitHub</a>
            )}
            {socials?.linkedin && (
              <a href={socials.linkedin} target="_blank" rel="noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#38bdf8'} onMouseOut={e => e.target.style.color = '#94a3b8'}>LinkedIn</a>
            )}
          </div>
        </footer>

      </div>
    </div>
  );
};

export default FrontendDeveloper;