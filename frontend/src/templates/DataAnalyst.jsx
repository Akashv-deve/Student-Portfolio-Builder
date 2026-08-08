import React, { useState } from 'react';

/**
 * DataAnalyst.jsx
 * Dashboard / Metrics / Analytics themed portfolio template.
 * 100% inline styles. Plug-and-play — pass a single `data` prop.
 */
export default function DataAnalyst({ data }) {
  const {
    personal = {},
    projects = [],
    education = [],
    skills = [],
    socials = {},
  } = data || {};

  const [hoveredCard, setHoveredCard] = useState(null);

  const name = personal.name || 'Your Name';
  const role = personal.role || 'Data Analyst';
  const bio =
    personal.bio ||
    'Bio not provided yet. Add a summary to personal.bio to introduce your analytical focus and experience.';

  const safeProjects = projects.length
    ? projects
    : [
        {
          id: 'p1',
          title: 'Case Study: Add Your First Project',
          description: 'Populate the projects array to showcase your analysis work as case-study cards.',
          imageUrl: '',
        },
      ];

  const safeEducation = education.length
    ? education
    : [{ id: 'e1', institution: 'Institution not set', degree: 'Degree not specified', score: '—' }];

  const safeSkills = skills.length
    ? skills
    : ['SQL', 'Python', 'Add your skills'];

  const accentPalette = ['#6366f1', '#10b981', '#8b5cf6', '#0ea5e9', '#f59e0b', '#ec4899'];

  const colors = {
    bg: '#F8FAFC',
    card: '#ffffff',
    border: '#e2e8f0',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#94a3b8',
  };

  const heading = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  const wrapper = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 5vw',
    boxSizing: 'border-box',
  };

  const cardShadow = '0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -12px rgba(15,23,42,0.08)';
  const cardShadowHover = '0 4px 8px rgba(15,23,42,0.06), 0 20px 40px -16px rgba(15,23,42,0.16)';

  const kpiStats = [
    { label: 'Projects Delivered', value: String(safeProjects.length).padStart(2, '0') },
    { label: 'Core Skills', value: String(safeSkills.length).padStart(2, '0') },
    { label: 'Credentials', value: String(safeEducation.length).padStart(2, '0') },
  ];

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
      {/* TOP NAV BAR */}
      <div
        style={{
          width: '100%',
          borderBottom: `1px solid ${colors.border}`,
          background: colors.card,
        }}
      >
        <div
          style={{
            ...wrapper,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.1rem 5vw',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '3px',
                background: 'linear-gradient(135deg, #6366f1, #10b981)',
                display: 'inline-block',
              }}
            />
            <span style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
              {name}
            </span>
          </div>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: colors.textMuted,
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              border: `1px solid ${colors.border}`,
            }}
          >
            {role}
          </span>
        </div>
      </div>

      {/* HERO / OVERVIEW */}
      <div style={{ ...wrapper, paddingTop: 'clamp(2.5rem, 7vh, 4.5rem)', paddingBottom: 'clamp(2rem, 5vh, 3rem)' }}>
        <span
          style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#6366f1',
            display: 'block',
            marginBottom: '0.75rem',
          }}
        >
          Portfolio Overview
        </span>
        <h1
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '0 0 1rem 0',
            lineHeight: 1.1,
            maxWidth: '20ch',
          }}
        >
          {bio ? `Hi, I'm ${name}.` : name}
        </h1>
        <p
          style={{
            fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
            color: colors.textSecondary,
            lineHeight: 1.7,
            maxWidth: '68ch',
            margin: 0,
          }}
        >
          {bio}
        </p>

        {/* KPI row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: '1rem',
            marginTop: '2.25rem',
          }}
        >
          {kpiStats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                background: colors.card,
                border: `1px solid ${colors.border}`,
                borderRadius: '16px',
                padding: '1.25rem 1.4rem',
                boxShadow: cardShadow,
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  fontWeight: 800,
                  color: accentPalette[i % accentPalette.length],
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '0.82rem',
                  color: colors.textMuted,
                  marginTop: '0.4rem',
                  fontWeight: 600,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}

          {/* socials card */}
          <div
            style={{
              background: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: '16px',
              padding: '1.25rem 1.4rem',
              boxShadow: cardShadow,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Connect
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <DashLink label="GitHub" href={socials.github} />
              <DashLink label="LinkedIn" href={socials.linkedin} />
              <DashLink label="Email" href={socials.email ? `mailto:${socials.email}` : null} display={socials.email} />
            </div>
          </div>
        </div>
      </div>

      {/* SKILLS */}
      <div style={{ ...wrapper, paddingBottom: 'clamp(2.5rem, 6vh, 4rem)' }}>
        <SectionHeading title="Skills &amp; Tools" subtitle="Technical proficiencies" colors={colors} />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
          }}
        >
          {safeSkills.map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: accentPalette[i % accentPalette.length],
                background: `${accentPalette[i % accentPalette.length]}14`,
                border: `1px solid ${accentPalette[i % accentPalette.length]}33`,
                borderRadius: '10px',
                padding: '0.55rem 1rem',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* PROJECTS - case studies */}
      <div style={{ ...wrapper, paddingBottom: 'clamp(2.5rem, 6vh, 4rem)' }}>
        <SectionHeading title="Case Studies" subtitle="Selected analysis projects" colors={colors} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '1.5rem',
          }}
        >
          {safeProjects.map((project, i) => {
            const key = project.id ?? i;
            const isHovered = hoveredCard === key;
            const accent = accentPalette[i % accentPalette.length];
            const img = project.imageUrl || 'https://placehold.co/800x600/eeeeee/999999?text=Visual+Asset';
            return (
              <div
                key={key}
                onMouseEnter={() => setHoveredCard(key)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: colors.card,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: isHovered ? cardShadowHover : cardShadow,
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'all 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '16 / 10',
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                />
                <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', flexGrow: 1 }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: accent,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    Case Study {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      margin: 0,
                      letterSpacing: '-0.01em',
                      wordBreak: 'break-word',
                    }}
                  >
                    {project.title || 'Untitled Case Study'}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: colors.textSecondary,
                      lineHeight: 1.65,
                      margin: 0,
                      flexGrow: 1,
                    }}
                  >
                    {project.description || 'No description provided for this case study yet.'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EDUCATION */}
      <div style={{ ...wrapper, paddingBottom: 'clamp(4rem, 9vh, 6rem)' }}>
        <SectionHeading title="Education" subtitle="Academic background" colors={colors} />
        <div
          style={{
            background: colors.card,
            border: `1px solid ${colors.border}`,
            borderRadius: '20px',
            boxShadow: cardShadow,
            overflow: 'hidden',
          }}
        >
          {safeEducation.map((edu, i) => (
            <div
              key={edu.id ?? i}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                padding: '1.25rem 1.5rem',
                borderBottom:
                  i === safeEducation.length - 1 ? 'none' : `1px solid ${colors.border}`,
              }}
            >
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: '1rem' }}>
                  {edu.institution || 'Institution not set'}
                </p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.88rem', color: colors.textSecondary }}>
                  {edu.degree || 'Degree not specified'}
                </p>
              </div>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#10b981',
                  background: '#10b98114',
                  border: '1px solid #10b98133',
                  borderRadius: '10px',
                  padding: '0.4rem 0.85rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {edu.score || 'N/A'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          borderTop: `1px solid ${colors.border}`,
          padding: '1.75rem 5vw',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: colors.textMuted,
          fontWeight: 600,
        }}
      >
        {name} — Data-driven, always.
      </div>
    </div>
  );
}

function SectionHeading({ title, subtitle, colors }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h2
        style={{
          fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)',
          fontWeight: 800,
          margin: 0,
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h2>
      <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.88rem', color: colors.textMuted }}>
        {subtitle}
      </p>
    </div>
  );
}

function DashLink({ label, href, display }) {
  const isActive = Boolean(href);
  return (
    <a
      href={isActive ? href : undefined}
      target={isActive && !href.startsWith('mailto:') ? '_blank' : undefined}
      rel={isActive ? 'noopener noreferrer' : undefined}
      style={{
        fontSize: '0.85rem',
        fontWeight: 600,
        color: isActive ? '#0f172a' : '#cbd5e1',
        textDecoration: 'none',
        cursor: isActive ? 'pointer' : 'default',
      }}
    >
      {isActive ? display || label : `${label}: not set`}
    </a>
  );
}
