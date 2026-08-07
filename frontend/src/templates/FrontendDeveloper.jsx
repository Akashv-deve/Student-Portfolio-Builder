import React, { useState } from 'react';

/**
 * FrontendDeveloper.jsx
 * Vibrant, punchy "Bento Box" themed portfolio template.
 * 100% inline styles. Plug-and-play — pass a single `data` prop.
 */
export default function FrontendDeveloper({ data }) {
  const {
    personal = {},
    projects = [],
    education = [],
    skills = [],
    socials = {},
  } = data || {};

  const [hoveredCard, setHoveredCard] = useState(null);

  const name = personal.name || 'Your Name Here';
  const role = personal.role || 'Frontend Developer';
  const bio =
    personal.bio ||
    "Bio coming soon — this developer is probably busy perfecting a pixel somewhere.";

  const safeProjects = projects.length
    ? projects
    : [
        {
          id: 'p1',
          title: 'Your First Project',
          description: 'Add projects to your data and they will show up here as vibrant bento cards.',
        },
        {
          id: 'p2',
          title: 'Another Great Build',
          description: 'Each project gets its own gradient treatment automatically.',
        },
      ];

  const safeEducation = education.length
    ? education
    : [{ id: 'e1', institution: 'Your School', degree: 'Your Degree', score: '—' }];

  const safeSkills = skills.length
    ? skills
    : ['React', 'CSS', 'JavaScript', 'Add your skills'];

  const gradients = [
    'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
    'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    'linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)',
    'linear-gradient(135deg, #eab308 0%, #f97316 100%)',
    'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
  ];

  const colors = {
    bg: '#f8fafc',
    card: '#ffffff',
    border: '#e2e8f0',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#94a3b8',
  };

  const heading = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  const sectionWrapper = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 5vw',
    boxSizing: 'border-box',
  };

  const eyebrowStyle = {
    fontFamily: heading,
    fontSize: '0.8rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#8b5cf6',
    marginBottom: '0.75rem',
    display: 'block',
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: colors.bg,
        color: colors.textPrimary,
        fontFamily: heading,
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      {/* HERO */}
      <div
        style={{
          ...sectionWrapper,
          paddingTop: 'clamp(3rem, 9vh, 6rem)',
          paddingBottom: 'clamp(2rem, 6vh, 4rem)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '1.25rem',
          }}
        >
          {/* Big intro card */}
          <div
            style={{
              gridColumn: 'span 2',
              minWidth: 0,
              borderRadius: '28px',
              padding: 'clamp(2rem, 5vw, 3.5rem)',
              background: colors.card,
              border: `1px solid ${colors.border}`,
              boxShadow: '0 20px 40px -20px rgba(15,23,42,0.15)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-40%',
                right: '-15%',
                width: '55%',
                height: '180%',
                background: gradients[0],
                opacity: 0.12,
                borderRadius: '50%',
                filter: 'blur(10px)',
              }}
            />
            <span style={eyebrowStyle}>Welcome to my portfolio</span>
            <h1
              style={{
                fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                margin: 0,
                letterSpacing: '-0.02em',
                position: 'relative',
              }}
            >
              Hi, I'm{' '}
              <span
                style={{
                  background: gradients[0],
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {name}
              </span>
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
                fontWeight: 600,
                color: colors.textSecondary,
                marginTop: '0.75rem',
                marginBottom: '1.25rem',
              }}
            >
              {role}
            </p>
            <p
              style={{
                fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                color: colors.textMuted,
                lineHeight: 1.7,
                maxWidth: '60ch',
                margin: 0,
                position: 'relative',
              }}
            >
              {bio}
            </p>
          </div>

          {/* Socials bento cell */}
          <div
            style={{
              borderRadius: '28px',
              padding: '2rem',
              background: gradients[2],
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '220px',
              boxShadow: '0 20px 40px -20px rgba(59,130,246,0.5)',
            }}
          >
            <span style={{ fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.85 }}>
              Let's connect
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <SocialLink label="GitHub" href={socials.github} />
              <SocialLink label="LinkedIn" href={socials.linkedin} />
              <SocialLink label="Email" href={socials.email ? `mailto:${socials.email}` : null} display={socials.email} />
            </div>
          </div>
        </div>
      </div>

      {/* SKILLS - bento chips */}
      <div style={{ ...sectionWrapper, paddingBottom: 'clamp(2.5rem, 6vh, 4rem)' }}>
        <span style={eyebrowStyle}>Toolkit</span>
        <h2
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            fontWeight: 800,
            margin: '0 0 1.5rem 0',
            letterSpacing: '-0.01em',
          }}
        >
          Skills &amp; Technologies
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '0.9rem',
          }}
        >
          {safeSkills.map((skill, i) => {
            const key = `skill-${i}`;
            const isHovered = hoveredCard === key;
            return (
              <div
                key={key}
                onMouseEnter={() => setHoveredCard(key)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  borderRadius: '18px',
                  padding: '1.1rem 1rem',
                  background: isHovered ? gradients[i % gradients.length] : colors.card,
                  border: `1px solid ${isHovered ? 'transparent' : colors.border}`,
                  color: isHovered ? '#fff' : colors.textPrimary,
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  cursor: 'default',
                  transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: isHovered ? 'translateY(-6px) scale(1.03)' : 'translateY(0) scale(1)',
                  boxShadow: isHovered
                    ? '0 16px 30px -12px rgba(99,102,241,0.45)'
                    : '0 2px 6px rgba(15,23,42,0.04)',
                }}
              >
                {skill}
              </div>
            );
          })}
        </div>
      </div>

      {/* PROJECTS - bento masonry feel */}
      <div style={{ ...sectionWrapper, paddingBottom: 'clamp(2.5rem, 6vh, 4rem)' }}>
        <span style={eyebrowStyle}>Selected Work</span>
        <h2
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            fontWeight: 800,
            margin: '0 0 1.5rem 0',
            letterSpacing: '-0.01em',
          }}
        >
          Projects
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gridAutoRows: '1fr',
            gap: '1.25rem',
          }}
        >
          {safeProjects.map((project, i) => {
            const key = project.id ?? `proj-${i}`;
            const isHovered = hoveredCard === key;
            const gradient = gradients[i % gradients.length];
            return (
              <div
                key={key}
                onMouseEnter={() => setHoveredCard(key)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  borderRadius: '24px',
                  padding: '1.75rem',
                  background: colors.card,
                  border: `1px solid ${colors.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  minHeight: '220px',
                  cursor: 'default',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: isHovered
                    ? '0 24px 45px -20px rgba(15,23,42,0.25)'
                    : '0 4px 12px rgba(15,23,42,0.05)',
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    background: gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    margin: 0,
                    letterSpacing: '-0.01em',
                    wordBreak: 'break-word',
                  }}
                >
                  {project.title || 'Untitled Project'}
                </h3>
                <p
                  style={{
                    fontSize: '0.92rem',
                    color: colors.textSecondary,
                    lineHeight: 1.65,
                    margin: 0,
                    flexGrow: 1,
                  }}
                >
                  {project.description || 'No description added for this project yet.'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* EDUCATION */}
      <div style={{ ...sectionWrapper, paddingBottom: 'clamp(4rem, 9vh, 6rem)' }}>
        <span style={eyebrowStyle}>Background</span>
        <h2
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            fontWeight: 800,
            margin: '0 0 1.5rem 0',
            letterSpacing: '-0.01em',
          }}
        >
          Education
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '1.25rem',
          }}
        >
          {safeEducation.map((edu, i) => (
            <div
              key={edu.id ?? i}
              style={{
                borderRadius: '24px',
                padding: '1.75rem',
                background: colors.card,
                border: `1px solid ${colors.border}`,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(15,23,42,0.05)',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>
                {edu.institution || 'Institution not set'}
              </h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: colors.textSecondary }}>
                {edu.degree || 'Degree not specified'}
              </p>
              <span
                style={{
                  marginTop: '0.5rem',
                  alignSelf: 'flex-start',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  padding: '0.35rem 0.8rem',
                  borderRadius: '999px',
                  background: gradients[3],
                  color: '#fff',
                }}
              >
                Score: {edu.score || 'N/A'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          borderTop: `1px solid ${colors.border}`,
          padding: '2rem 5vw',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: colors.textMuted,
          fontWeight: 600,
        }}
      >
        Built with care by {name} ✦
      </div>
    </div>
  );
}

function SocialLink({ label, href, display }) {
  const isActive = Boolean(href);
  return (
    <a
      href={isActive ? href : undefined}
      target={isActive && !href.startsWith('mailto:') ? '_blank' : undefined}
      rel={isActive ? 'noopener noreferrer' : undefined}
      style={{
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 700,
        fontSize: '0.95rem',
        opacity: isActive ? 1 : 0.55,
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        cursor: isActive ? 'pointer' : 'default',
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#fff',
          display: 'inline-block',
          opacity: isActive ? 1 : 0.4,
        }}
      />
      {isActive ? (display || label) : `${label} not set`}
    </a>
  );
}
