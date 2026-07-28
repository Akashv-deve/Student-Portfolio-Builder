// src/templates/SoftwareEngineer.jsx
import React from 'react';

const SoftwareEngineer = ({ data }) => {
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
    </div>
  );
};

export default SoftwareEngineer;