import React, { useState } from 'react';

export default function UIUXDesigner({ data, portfolioData }) {
  // Catch both prop names so it never breaks!
  const activeData = data || portfolioData || {};

  const {
    personal = {},
    projects = [],
    education = [],
    skills = [],
    socials = {},
  } = activeData;

  const [hoveredProject, setHoveredProject] = useState(null);

  const name = personal.name || 'Your Name';
  const role = personal.role || 'Digital Designer';
  const bio = personal.bio || 'Crafting cinematic digital experiences and timeless interfaces with a focus on pristine typography and visual hierarchy.';

  const safeProjects = projects.length
    ? projects
    : [
        { id: 'p1', title: 'Editorial Redesign', description: 'A complete overhaul of a digital publication, focusing on whitespace and legibility.', category: 'Web Design' },
        { id: 'p2', title: 'Fintech Mobile App', description: 'Simplifying complex financial data into an intuitive, human-centered interface.', category: 'Product Design' },
      ];

  const safeEducation = education.length
    ? education
    : [{ id: 'e1', institution: 'Design Academy', degree: 'BFA Interaction Design', score: '3.9 GPA' }];

  const safeSkills = skills.length ? skills : ['Figma', 'Prototyping', 'Wireframing', 'User Research'];

  // High-contrast, monochromatic palette
  const colors = {
    bg: '#f9f9f9',
    fg: '#111111',
    muted: '#767676',
    border: '#e5e5e5',
  };

  const fonts = {
    sans: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    serif: "'Playfair Display', Didot, 'Times New Roman', serif",
  };

  return (
    <div style={{ backgroundColor: colors.bg, color: colors.fg, fontFamily: fonts.sans, minHeight: '100vh', paddingBottom: '10vh' }}>
      
      {/* NAVIGATION */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '2rem 5vw', borderBottom: `1px solid ${colors.border}`, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '500' }}>
        <div>{name}</div>
        <div>{role}</div>
      </nav>

      {/* CINEMATIC HERO */}
      <header style={{ padding: '15vh 5vw 10vh 5vw' }}>
        <h1 style={{ 
          fontFamily: fonts.serif, 
          fontSize: 'clamp(3rem, 10vw, 8rem)', 
          lineHeight: '1', 
          margin: '0 0 2rem 0', 
          letterSpacing: '-0.02em',
          fontWeight: '400',
          maxWidth: '900px'
        }}>
          Designing <br/><span style={{ fontStyle: 'italic', color: colors.muted }}>digital</span> experiences.
        </h1>
        <p style={{ 
          fontSize: 'clamp(1rem, 2vw, 1.5rem)', 
          lineHeight: '1.6', 
          maxWidth: '600px', 
          margin: 0,
          color: colors.fg,
          fontWeight: '300'
        }}>
          {bio}
        </p>
      </header>

      {/* ASYMMETRICAL PROJECT GRID */}
      <section style={{ padding: '5vh 5vw' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: `2px solid ${colors.fg}`, paddingBottom: '1rem', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', margin: 0, fontWeight: '500' }}>Selected Works</h2>
          <span style={{ color: colors.muted, fontSize: '0.9rem' }}>{new Date().getFullYear()}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {safeProjects.map((project, index) => {
            const isHovered = hoveredProject === project.id;

            return (
              <div 
                key={project.id || index}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  gap: '2vw',
                  padding: '4rem 0',
                  borderTop: index !== 0 ? `1px solid ${colors.border}` : 'none',
                  transition: 'opacity 0.4s ease',
                  opacity: hoveredProject === null || isHovered ? 1 : 0.3
                }}
              >
                {/* Meta Data Column */}
                <div style={{ flex: '1 1 200px' }}>
                  <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: colors.muted, display: 'block', paddingTop: '0.5rem' }}>
                    0{index + 1} — {project.category || 'Case Study'}
                  </span>
                </div>

                {/* Project Typography Column */}
                <div style={{ flex: '2 1 500px' }}>
                  <h3 style={{ 
                    fontFamily: fonts.serif, 
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
                    margin: '0 0 1rem 0', 
                    fontWeight: '400',
                    lineHeight: '1.1'
                  }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: colors.muted, margin: 0, maxWidth: '600px' }}>
                    {project.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SKILLS & EDUCATION ROW */}
      <section style={{ padding: '10vh 5vw', display: 'flex', flexWrap: 'wrap', gap: '5vw' }}>
        {/* Skills */}
        <div style={{ flex: '1 1 300px' }}>
          <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${colors.border}`, paddingBottom: '1rem', marginBottom: '2rem' }}>Core Capabilities</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {safeSkills.map((skill, i) => (
              <li key={i} style={{ fontSize: '1.5rem', fontWeight: '300' }}>{skill}</li>
            ))}
          </ul>
        </div>

        {/* Education */}
        <div style={{ flex: '1 1 300px' }}>
          <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${colors.border}`, paddingBottom: '1rem', marginBottom: '2rem' }}>Education</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {safeEducation.map((edu, i) => (
              <div key={edu.id || i}>
                <h4 style={{ fontFamily: fonts.serif, fontSize: '1.5rem', margin: '0 0 0.5rem 0', fontWeight: '400' }}>{edu.institution}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.muted, fontSize: '0.95rem' }}>
                  <span>{edu.degree}</span>
                  <span>{edu.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '10vh 5vw 0 5vw', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: '400', margin: '0 0 3rem 0', fontFamily: fonts.serif }}>
          Let's create something <span style={{ fontStyle: 'italic', color: colors.muted }}>exceptional.</span>
        </h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {socials.email && (
            <a href={`mailto:${socials.email}`} style={{ color: colors.fg, textDecoration: 'none', fontSize: '1.1rem', borderBottom: `1px solid ${colors.fg}`, paddingBottom: '0.2rem' }}>
              Email
            </a>
          )}
          {socials.linkedin && (
            <a href={socials.linkedin} target="_blank" rel="noreferrer" style={{ color: colors.fg, textDecoration: 'none', fontSize: '1.1rem', borderBottom: `1px solid ${colors.fg}`, paddingBottom: '0.2rem' }}>
              LinkedIn
            </a>
          )}
          {socials.github && (
            <a href={socials.github} target="_blank" rel="noreferrer" style={{ color: colors.fg, textDecoration: 'none', fontSize: '1.1rem', borderBottom: `1px solid ${colors.fg}`, paddingBottom: '0.2rem' }}>
              GitHub
            </a>
          )}
        </div>
      </footer>

    </div>
  );
}