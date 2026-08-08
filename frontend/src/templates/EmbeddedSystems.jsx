import React, { useState } from 'react';

/**
 * EmbeddedSystems.jsx
 * Hardware / Blueprint / Datasheet themed portfolio template.
 * 100% inline styles. Plug-and-play — pass a single `data` prop.
 */
export default function EmbeddedSystems({ data }) {
  const {
    personal = {},
    projects = [],
    education = [],
    skills = [],
    socials = {},
  } = data || {};

  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const name = personal.name || 'UNNAMED_UNIT';
  const role = personal.role || 'EMBEDDED_SYSTEMS_ENGINEER';
  const bio =
    personal.bio ||
    '/* No bio provided. Populate personal.bio in the datasheet source to replace this comment block. */';

  const safeProjects = projects.length
    ? projects
    : [
        {
          id: 'p1',
          title: 'MODULE_PLACEHOLDER',
          description: 'No projects registered. Add entries to the projects array to populate this schematic.',
          imageUrl: '',
        },
      ];

  const safeEducation = education.length
    ? education
    : [{ id: 'e1', institution: 'INSTITUTION_UNSET', degree: 'DEGREE_UNSET', score: 'N/A' }];

  const safeSkills = skills.length ? skills : ['C', 'ADD_SKILLS', 'TO_ARRAY'];

  const email = socials.email || null;

  const colors = {
    bg: '#0A192F',
    bgPanel: '#0d1f3c',
    bgPanelAlt: '#0a1a30',
    line: '#1f3a5f',
    lineBright: '#2d5486',
    white: '#e6f1ff',
    cyan: '#64ffda',
    cyanDim: '#5a8fa8',
    muted: '#8a9bb5',
  };

  const mono = "'Fira Code', 'JetBrains Mono', 'Courier New', monospace";
  const sans = "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif";

  const wrapper = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 5vw',
    boxSizing: 'border-box',
  };

  const tagStyle = {
    fontFamily: mono,
    fontSize: '0.7rem',
    letterSpacing: '0.1em',
    color: colors.cyan,
    border: `1px solid ${colors.line}`,
    padding: '0.2rem 0.6rem',
    borderRadius: '2px',
  };

  const panelStyle = {
    background: colors.bgPanel,
    border: `1px solid ${colors.line}`,
    borderRadius: '2px',
    boxSizing: 'border-box',
    position: 'relative',
  };

  const cornerMarks = (color) => (
    <>
      {[
        { top: -1, left: -1, borderWidth: '2px 0 0 2px' },
        { top: -1, right: -1, borderWidth: '2px 2px 0 0' },
        { bottom: -1, left: -1, borderWidth: '0 0 2px 2px' },
        { bottom: -1, right: -1, borderWidth: '0 2px 2px 0' },
      ].map((pos, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            borderStyle: 'solid',
            borderColor: color,
            ...pos,
          }}
        />
      ))}
    </>
  );

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: colors.bg,
        backgroundImage: `linear-gradient(${colors.line}22 1px, transparent 1px), linear-gradient(90deg, ${colors.line}22 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        color: colors.white,
        fontFamily: sans,
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      {/* TOP SPEC BAR */}
      <div
        style={{
          ...wrapper,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 5vw',
          borderBottom: `1px solid ${colors.line}`,
          fontFamily: mono,
          fontSize: '0.75rem',
          color: colors.muted,
          gap: '0.5rem',
        }}
      >
        <span>REV: 1.0.0</span>
        <span style={{ color: colors.cyan }}>DATASHEET // PORTFOLIO</span>
        <span>STATUS: <span style={{ color: colors.cyan }}>ACTIVE</span></span>
      </div>

      {/* HERO PANEL */}
      <div style={{ ...wrapper, paddingTop: 'clamp(2.5rem, 6vh, 4rem)', paddingBottom: 'clamp(2.5rem, 6vh, 4rem)' }}>
        <div style={{ ...panelStyle, padding: 'clamp(1.75rem, 4vw, 3rem)' }}>
          {cornerMarks(colors.cyan)}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={tagStyle}>PART_NO: {name.toUpperCase().replace(/\s+/g, '_')}</span>
            <span style={tagStyle}>PKG: PORTFOLIO_V1</span>
          </div>
          <h1
            style={{
              fontFamily: mono,
              fontSize: 'clamp(1.8rem, 5vw, 3.4rem)',
              fontWeight: 700,
              color: colors.white,
              margin: 0,
              lineHeight: 1.1,
              wordBreak: 'break-word',
            }}
          >
            {name}
          </h1>
          <p
            style={{
              fontFamily: mono,
              fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)',
              color: colors.cyan,
              margin: '0.6rem 0 1.5rem 0',
              letterSpacing: '0.03em',
            }}
          >
            {role}
          </p>
          <p
            style={{
              fontFamily: sans,
              fontSize: 'clamp(0.9rem, 1.2vw, 1.02rem)',
              color: colors.muted,
              lineHeight: 1.75,
              maxWidth: '70ch',
              margin: 0,
            }}
          >
            {bio}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.9rem', marginTop: '2rem' }}>
            <SpecLink label="GITHUB" href={socials.github} colors={colors} mono={mono} />
            <SpecLink label="LINKEDIN" href={socials.linkedin} colors={colors} mono={mono} />
            <SpecLink label={email ? `MAIL: ${email}` : 'MAIL'} href={email ? `mailto:${email}` : null} colors={colors} mono={mono} />
          </div>
        </div>
      </div>

      {/* SKILLS - pinout style */}
      <div style={{ ...wrapper, paddingBottom: 'clamp(2.5rem, 6vh, 4rem)' }}>
        <SectionLabel index="01" title="PIN CONFIGURATION / SKILLS" colors={colors} mono={mono} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
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
                  ...panelStyle,
                  padding: '0.85rem 1rem',
                  borderColor: isHovered ? colors.cyan : colors.line,
                  background: isHovered ? colors.bgPanelAlt : colors.bgPanel,
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: isHovered ? colors.cyan : colors.lineBright,
                    flexShrink: 0,
                    transition: 'background 0.2s ease',
                  }}
                />
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: '0.82rem',
                    color: isHovered ? colors.cyan : colors.white,
                    transition: 'color 0.2s ease',
                    wordBreak: 'break-word',
                  }}
                >
                  {skill}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* PROJECTS - module datasheets */}
      <div style={{ ...wrapper, paddingBottom: 'clamp(2.5rem, 6vh, 4rem)' }}>
        <SectionLabel index="02" title="MODULE REGISTRY / PROJECTS" colors={colors} mono={mono} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '1.25rem',
          }}
        >
          {safeProjects.map((project, i) => {
            const key = project.id ?? i;
            const isHovered = hoveredProject === key;
            const img = project.imageUrl || 'https://placehold.co/800x600/eeeeee/999999?text=Visual+Asset';
            return (
              <div
                key={key}
                onMouseEnter={() => setHoveredProject(key)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  ...panelStyle,
                  overflow: 'hidden',
                  borderColor: isHovered ? colors.cyan : colors.line,
                  boxShadow: isHovered ? `0 0 0 1px ${colors.cyan}55` : 'none',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {isHovered && cornerMarks(colors.cyan)}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '4 / 3',
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderBottom: `1px solid ${colors.line}`,
                    filter: isHovered ? 'none' : 'grayscale(0.3)',
                    transition: 'filter 0.25s ease',
                  }}
                />
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flexGrow: 1 }}>
                  <span style={{ fontFamily: mono, fontSize: '0.7rem', color: colors.cyanDim }}>
                    MOD_{String(i + 1).padStart(2, '0')}
                  </span>
                  <h3
                    style={{
                      fontFamily: mono,
                      fontSize: '1.1rem',
                      color: colors.white,
                      margin: 0,
                      wordBreak: 'break-word',
                    }}
                  >
                    {project.title || 'UNTITLED_MODULE'}
                  </h3>
                  <p
                    style={{
                      fontFamily: sans,
                      fontSize: '0.88rem',
                      color: colors.muted,
                      lineHeight: 1.6,
                      margin: 0,
                      flexGrow: 1,
                    }}
                  >
                    {project.description || 'No description provided for this module yet.'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EDUCATION - register table */}
      <div style={{ ...wrapper, paddingBottom: 'clamp(3.5rem, 8vh, 5rem)' }}>
        <SectionLabel index="03" title="TRAINING LOG / EDUCATION" colors={colors} mono={mono} />
        <div style={{ ...panelStyle, overflow: 'hidden' }}>
          {/* header row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 2fr 1fr',
              gap: '1rem',
              padding: '0.85rem 1.25rem',
              borderBottom: `1px solid ${colors.line}`,
              background: colors.bgPanelAlt,
            }}
          >
            <span style={{ fontFamily: mono, fontSize: '0.7rem', color: colors.cyanDim }}>INSTITUTION</span>
            <span style={{ fontFamily: mono, fontSize: '0.7rem', color: colors.cyanDim }}>CREDENTIAL</span>
            <span style={{ fontFamily: mono, fontSize: '0.7rem', color: colors.cyanDim, textAlign: 'right' }}>SCORE</span>
          </div>
          {safeEducation.map((edu, i) => (
            <div
              key={edu.id ?? i}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 2fr 1fr',
                gap: '1rem',
                padding: '1rem 1.25rem',
                borderBottom:
                  i === safeEducation.length - 1 ? 'none' : `1px solid ${colors.line}`,
              }}
            >
              <span style={{ fontFamily: sans, fontSize: '0.9rem', color: colors.white, wordBreak: 'break-word' }}>
                {edu.institution || 'Institution not set'}
              </span>
              <span style={{ fontFamily: sans, fontSize: '0.9rem', color: colors.muted, wordBreak: 'break-word' }}>
                {edu.degree || 'Degree not specified'}
              </span>
              <span style={{ fontFamily: mono, fontSize: '0.85rem', color: colors.cyan, textAlign: 'right' }}>
                {edu.score || 'N/A'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          borderTop: `1px solid ${colors.line}`,
          padding: '1.5rem 5vw',
          fontFamily: mono,
          fontSize: '0.72rem',
          color: colors.muted,
          textAlign: 'center',
        }}
      >
        EOF // {name.toUpperCase()} // ALL SYSTEMS NOMINAL
      </div>
    </div>
  );
}

function SectionLabel({ index, title, colors, mono }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
      <span
        style={{
          fontFamily: mono,
          fontSize: '0.75rem',
          color: colors.bg,
          background: colors.cyan,
          padding: '0.2rem 0.5rem',
          borderRadius: '2px',
          fontWeight: 700,
        }}
      >
        {index}
      </span>
      <span
        style={{
          fontFamily: mono,
          fontSize: '0.85rem',
          color: colors.white,
          letterSpacing: '0.08em',
        }}
      >
        {title}
      </span>
      <span style={{ flexGrow: 1, height: '1px', background: colors.line }} />
    </div>
  );
}

function SpecLink({ label, href, colors, mono }) {
  const isActive = Boolean(href);
  return (
    <a
      href={isActive ? href : undefined}
      target={isActive && !href.startsWith('mailto:') ? '_blank' : undefined}
      rel={isActive ? 'noopener noreferrer' : undefined}
      style={{
        fontFamily: mono,
        fontSize: '0.78rem',
        color: isActive ? colors.cyan : colors.muted,
        textDecoration: 'none',
        border: `1px solid ${isActive ? colors.cyanDim : colors.line}`,
        borderRadius: '2px',
        padding: '0.5rem 1rem',
        transition: 'all 0.2s ease',
        cursor: isActive ? 'pointer' : 'default',
      }}
      onMouseEnter={(e) => {
        if (isActive) {
          e.currentTarget.style.background = colors.bgPanelAlt;
          e.currentTarget.style.borderColor = colors.cyan;
        }
      }}
      onMouseLeave={(e) => {
        if (isActive) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.borderColor = colors.cyanDim;
        }
      }}
    >
      {isActive ? label : `${label}: N/C`}
    </a>
  );
}
