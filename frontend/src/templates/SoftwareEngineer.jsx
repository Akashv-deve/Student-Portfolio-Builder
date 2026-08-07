// src/templates/SoftwareEngineer.jsx
import React from 'react';

const SoftwareEngineer = ({ data }) => {
  const skills = Array.isArray(data?.skills)
    ? data.skills.filter(Boolean)
    : [];

  const socials = data?.socials && typeof data.socials === 'object'
    ? data.socials
    : {};

  return (
    <div style={{ 
      backgroundColor: '#1e1e1e', 
      color: '#a6accd', 
      fontFamily: 'monospace', 
      padding: '3rem', 
      minHeight: '100%',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ borderBottom: '1px solid #333', paddingBottom: '2rem', marginBottom: '2rem' }}>
        <h1 style={{ color: '#82aaff', fontSize: '3rem', margin: '0 0 0.5rem 0' }}>
          {data.personal.name || "developer_name"}
        </h1>
        <h2 style={{ color: '#c792ea', fontSize: '1.5rem', margin: 0 }}>
          &gt; {data.personal.role || "sys.role"}
        </h2>
      </div>

      <div>
        <h3 style={{ color: '#89ddff', marginBottom: '1rem' }}>~/about_me</h3>
        <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
          {data.personal.bio || "Waiting for bio input..."}
        </p>
      </div>
      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ color: '#c3e88d', marginBottom: '1rem' }}>~/projects</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {data.projects && data.projects.map((project) => (
            <div key={project.id} style={{ borderLeft: '2px solid #82aaff', paddingLeft: '1rem' }}>
              <h4 style={{ color: '#ffcb6b', fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>{project.title}</h4>
              <p style={{ margin: 0, color: '#a6accd', lineHeight: '1.5' }}>{project.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ color: '#f07178', marginBottom: '1rem' }}>~/education</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {data.education && data.education.map((edu) => (
            <div key={edu.id} style={{ borderLeft: '2px solid #c792ea', paddingLeft: '1rem' }}>
              <h4 style={{ color: '#89ddff', fontSize: '1.1rem', margin: '0 0 0.25rem 0' }}>{edu.institution}</h4>
              <p style={{ margin: 0, color: '#a6accd' }}>
                {edu.degree} <span style={{ color: '#c3e88d', marginLeft: '0.5rem' }}>[{edu.score}]</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ color: '#ffcb6b', marginBottom: '1rem' }}>~/skills</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {skills.map((skill, index) => (
            <span key={index} style={{ backgroundColor: '#292d3e', color: '#89ddff', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.9rem', border: '1px solid #444' }}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Contact & Socials */}
      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px dashed #333' }}>
        <h3 style={{ color: '#f78c6c', marginBottom: '1rem' }}>~/contact</h3>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, color: '#a6accd', lineHeight: '1.8', fontSize: '1.1rem' }}>
          {socials.email && <li><span style={{ color: '#89ddff', marginRight: '10px' }}>email:</span>{socials.email}</li>}
          {socials.github && <li><span style={{ color: '#89ddff', marginRight: '10px' }}>github:</span><a href={socials.github} target="_blank" rel="noreferrer" style={{ color: '#82aaff', textDecoration: 'none' }}>{socials.github}</a></li>}
          {socials.linkedin && <li><span style={{ color: '#89ddff', marginRight: '10px' }}>linkedin:</span><a href={socials.linkedin} target="_blank" rel="noreferrer" style={{ color: '#82aaff', textDecoration: 'none' }}>{socials.linkedin}</a></li>}
        </ul>
      </div>
    </div>
  );
};

export default SoftwareEngineer;