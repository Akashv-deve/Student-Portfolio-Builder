import React, { useState } from 'react';

/**
 * FullStack.jsx
 * Modern SaaS landing page themed portfolio template.
 * 100% inline styles. Plug-and-play — pass a single `data` prop.
 */
export default function FullStack({ data }) {
  const {
    personal = {},
    projects = [],
    education = [],
    skills = [],
    socials = {},
  } = data || {};

  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  const name = personal.name || 'Your Name';
  const role = personal.role || 'Full Stack Developer';
  const bio =
    personal.bio ||
    'Bio not provided yet. Add a summary to personal.bio to introduce your full-stack range — from database to UI.';

  const safeProjects = projects.length
    ? projects
    : [
        {
          id: 'p1',
          title: 'Add Your First Project',
          description: 'Populate the projects array to showcase end-to-end builds with alternating layout cards like this one.',
          imageUrl: '',
        },
        {
          id: 'p2',
          title: 'Add A Second Project',
          description: 'Each project alternates sides automatically to create visual rhythm down the page.',
          imageUrl: '',
        },
      ];

  const safeEducation = education.length
    ? education
    : [{ id: 'e1', institution: 'Institution not set', degree: 'Degree not specified', score: '—' }];

  const safeSkills = skills.length
    ? skills
    : ['React', 'Node.js', 'Add your skills'];

  const gradient = 'linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)';
  const gradientSoft = 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(236,72,153,0.15))';

  const colors = {
    bg: '#121212',
    card: '#181818',
    cardAlt: '#1c1c1c',
    border: '#2a2a2a',
    borderHover: '#3a3a3a',
    textPrimary: '#f5f5f5',
    textSecondary: '#a3a3a3',
    textMuted: '#6b6b6b',
  };

  const sans = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  const wrapper = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 5vw',
    boxSizing: 'border-box',
  };

  const gradientText = {
    background: gradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const eyebrow = {
    fontSize: '0.78rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: colors.textMuted,
    display: 'block',
    marginBottom: '0.85rem',
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: colors.bg,
        backgroundImage:
          'radial-gradient(circle at 10% 0%, rgba(99,102,241,0.12), transparent 45%), radial-gradient(circle at 90% 20%, rgba(236,72,153,0.1), transparent 45%)',
        color: colors.textPrimary,
        fontFamily: sans,
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      {/* NAV */}
      <div
        style={{
          ...wrapper,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem 5vw',
        }}
      >
        <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
          {name}
        </span>
        <div
          style={{
            padding: '0.5px',
            borderRadius: '999px',
            background: gradient,
          }}
        >
          <span
            style={{
              display: 'block',
              background: colors.bg,
              borderRadius: '999px',
              padding: '0.5rem 1.1rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: colors.textPrimary,
            }}
          >
            {role}
          </span>
        </div>
      </div>

      {/* HERO */}
      <div
        style={{
          ...wrapper,
          paddingTop: 'clamp(3rem, 8vh, 5.5rem)',
          paddingBottom: 'clamp(3rem, 8vh, 5.5rem)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            padding: '0.45rem 1rem',
            borderRadius: '999px',
            border: `1px solid ${colors.border}`,
            color: colors.textSecondary,
            marginBottom: '1.75rem',
          }}
        >
          Frontend &nbsp;•&nbsp; Backend &nbsp;•&nbsp; Full Stack
        </span>
        <h1
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: 0,
            maxWidth: '18ch',
          }}
        >
          Building products{' '}
          <span style={gradientText}>end&#8209;to&#8209;end</span>
        </h1>
        <p
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            color: colors.textSecondary,
            lineHeight: 1.7,
            maxWidth: '62ch',
            margin: '1.5rem 0 2.25rem 0',
          }}
        >
          {bio}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.9rem', justifyContent: 'center' }}>
          <SaasLink label="GitHub" href={socials.github} primary colors={colors} gradient={gradient} />
          <SaasLink label="LinkedIn" href={socials.linkedin} colors={colors} gradient={gradient} />
          <SaasLink
            label="Email"
            href={socials.email ? `mailto:${socials.email}` : null}
            display={socials.email}
            colors={colors}
            gradient={gradient}
          />
        </div>
      </div>

      {/* SKILLS - frontend/backend split */}
      <div style={{ ...wrapper, paddingBottom: 'clamp(3rem, 8vh, 5rem)' }}>
        <span style={{ ...eyebrow, textAlign: 'center', display: 'block' }}>The Stack</span>
        <h2
          style={{
            fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)',
            fontWeight: 800,
            textAlign: 'center',
            margin: '0 0 2rem 0',
            letterSpacing: '-0.01em',
          }}
        >
          Skills &amp; Technologies
        </h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem',
          }}
        >
          {safeSkills.map((skill, i) => {
            const isHovered = hoveredSkill === i;
            return (
              <div
                key={`${skill}-${i}`}
                onMouseEnter={() => setHoveredSkill(i)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{
                  padding: isHovered ? '1.5px' : '1px',
                  borderRadius: '999px',
                  background: isHovered ? gradient : colors.border,
                  transition: 'all 0.2s ease',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    background: colors.bg,
                    borderRadius: '999px',
                    padding: '0.6rem 1.25rem',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: isHovered ? colors.textPrimary : colors.textSecondary,
                    transition: 'color 0.2s ease',
                  }}
                >
                  {skill}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* PROJECTS - alternating layout */}
      <div style={{ ...wrapper, paddingBottom: 'clamp(3rem, 8vh, 5rem)' }}>
        <span style={{ ...eyebrow, textAlign: 'center', display: 'block' }}>Selected Work</span>
        <h2
          style={{
            fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)',
            fontWeight: 800,
            textAlign: 'center',
            margin: '0 0 3rem 0',
            letterSpacing: '-0.01em',
          }}
        >
          Projects
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2.5rem, 6vh, 4rem)' }}>
          {safeProjects.map((project, i) => {
            const key = project.id ?? i;
            const isHovered = hoveredProject === key;
            const reversed = i % 2 === 1;
            const img = project.imageUrl || 'https://placehold.co/800x600/eeeeee/999999?text=Visual+Asset';
            return (
              <div
                key={key}
                onMouseEnter={() => setHoveredProject(key)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                  gap: 'clamp(1.5rem, 4vw, 3rem)',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    order: reversed ? 2 : 1,
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: `1px solid ${isHovered ? colors.borderHover : colors.border}`,
                    aspectRatio: '16 / 10',
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    boxShadow: isHovered
                      ? '0 30px 60px -20px rgba(99,102,241,0.35)'
                      : '0 10px 30px -15px rgba(0,0,0,0.5)',
                    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
                <div style={{ order: reversed ? 1 : 2, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      ...gradientText,
                    }}
                  >
                    PROJECT {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3
                    style={{
                      fontSize: 'clamp(1.3rem, 2.6vw, 1.8rem)',
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
                      fontSize: '0.95rem',
                      color: colors.textSecondary,
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {project.description || 'No description provided for this project yet.'}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#a5b4fc',
                        background: 'rgba(99,102,241,0.12)',
                        border: '1px solid rgba(99,102,241,0.25)',
                        borderRadius: '8px',
                        padding: '0.3rem 0.7rem',
                      }}
                    >
                      Frontend
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#f0abfc',
                        background: 'rgba(236,72,153,0.12)',
                        border: '1px solid rgba(236,72,153,0.25)',
                        borderRadius: '8px',
                        padding: '0.3rem 0.7rem',
                      }}
                    >
                      Backend
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EDUCATION */}
      <div style={{ ...wrapper, paddingBottom: 'clamp(4rem, 9vh, 6rem)' }}>
        <span style={{ ...eyebrow, textAlign: 'center', display: 'block' }}>Background</span>
        <h2
          style={{
            fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)',
            fontWeight: 800,
            textAlign: 'center',
            margin: '0 0 2rem 0',
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
                background: colors.card,
                border: `1px solid ${colors.border}`,
                borderRadius: '18px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>
                {edu.institution || 'Institution not set'}
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: colors.textSecondary }}>
                {edu.degree || 'Degree not specified'}
              </p>
              <span
                style={{
                  marginTop: '0.5rem',
                  alignSelf: 'flex-start',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '0.35rem 0.8rem',
                  borderRadius: '999px',
                  background: gradientSoft,
                  color: colors.textPrimary,
                  border: `1px solid ${colors.border}`,
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
        © {new Date().getFullYear()} {name} — Built full stack, top to bottom.
      </div>
    </div>
  );
}

function SaasLink({ label, href, display, primary, colors, gradient }) {
  const isActive = Boolean(href);

  if (primary) {
    return (
      <a
        href={isActive ? href : undefined}
        target={isActive ? '_blank' : undefined}
        rel={isActive ? 'noopener noreferrer' : undefined}
        style={{
          fontSize: '0.9rem',
          fontWeight: 700,
          color: '#fff',
          textDecoration: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '999px',
          background: isActive ? gradient : colors.border,
          opacity: isActive ? 1 : 0.6,
          cursor: isActive ? 'pointer' : 'default',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
      >
        {isActive ? label : `${label}: not set`}
      </a>
    );
  }

  return (
    <a
      href={isActive ? href : undefined}
      target={isActive && !href.startsWith('mailto:') ? '_blank' : undefined}
      rel={isActive ? 'noopener noreferrer' : undefined}
      style={{
        fontSize: '0.9rem',
        fontWeight: 700,
        color: isActive ? colors.textPrimary : colors.textMuted,
        textDecoration: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '999px',
        border: `1px solid ${colors.border}`,
        cursor: isActive ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
      }}
    >
      {isActive ? (display || label) : `${label}: not set`}
    </a>
  );
}
