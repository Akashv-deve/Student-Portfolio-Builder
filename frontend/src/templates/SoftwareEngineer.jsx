import React, { useState } from 'react';

/**
 * SoftwareEngineer.jsx
 * Terminal / Hacker themed portfolio template.
 * 100% inline styles. Plug-and-play — pass a single `data` prop.
 */
export default function SoftwareEngineer({ data }) {
  const {
    personal = {},
    projects = [],
    education = [],
    skills = [],
    socials = {},
  } = data || {};

  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const name = personal.name || 'unknown_user';
  const role = personal.role || 'software.engineer';
  const bio =
    personal.bio ||
    '// No bio provided yet. This developer prefers to let their commits do the talking.';

  const safeProjects = projects.length
    ? projects
    : [
        {
          id: 'placeholder-1',
          title: 'project_alpha',
          description:
            'No projects added yet. Once you add some, they will render right here as terminal cards.',
        },
      ];

  const safeEducation = education.length
    ? education
    : [
        {
          id: 'placeholder-edu',
          institution: 'Institution not set',
          degree: 'Add your degree in the education array',
          score: '--',
        },
      ];

  const safeSkills = skills.length
    ? skills
    : ['javascript', 'add_your_skills', 'to_the_array'];

  const email = socials.email || null;

  const handleCopyEmail = () => {
    if (!email) return;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(email).catch(() => {});
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 1800);
  };

  // ---- shared style tokens ----
  const colors = {
    bg: '#0d1117',
    bgAlt: '#111820',
    panel: '#0f151c',
    border: '#1f2933',
    borderHover: '#39ff14',
    accent: '#39ff14', // matrix green
    accentBlue: '#58a6ff', // electric blue
    textPrimary: '#e6edf3',
    textSecondary: '#8b949e',
    textDim: '#4d5560',
  };

  const monoFont = "'Fira Code', 'Courier New', monospace";
  const sansFont =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  const sectionWrapper = {
    width: '100%',
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 5vw',
    boxSizing: 'border-box',
  };

  const sectionTitle = {
    fontFamily: monoFont,
    fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
    color: colors.accent,
    letterSpacing: '0.05em',
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  };

  const promptSpan = {
    color: colors.accentBlue,
    fontWeight: 700,
  };

  const cardBase = {
    background: colors.panel,
    border: `1px solid ${colors.border}`,
    borderRadius: '6px',
    padding: '1.5rem',
    transition: 'all 0.25s ease',
    boxSizing: 'border-box',
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: colors.bg,
        backgroundImage:
          'radial-gradient(circle at 15% 10%, rgba(57,255,20,0.06), transparent 40%), radial-gradient(circle at 85% 30%, rgba(88,166,255,0.06), transparent 40%)',
        color: colors.textPrimary,
        fontFamily: sansFont,
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      {/* NAV / TOP BAR */}
      <div
        style={{
          width: '100%',
          borderBottom: `1px solid ${colors.border}`,
          padding: '1rem 5vw',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: monoFont,
          fontSize: '0.85rem',
          color: colors.textSecondary,
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
          </div>
          <span>~/portfolio/{name.toLowerCase().replace(/\s+/g, '_')}</span>
        </div>
        <span style={{ color: colors.textDim }}>status: online</span>
      </div>

      {/* HERO */}
      <div
        style={{
          ...sectionWrapper,
          paddingTop: 'clamp(3rem, 8vh, 6rem)',
          paddingBottom: 'clamp(3rem, 8vh, 6rem)',
        }}
      >
        <div
          style={{
            ...cardBase,
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            background: colors.bgAlt,
            borderColor: colors.border,
          }}
        >
          <p
            style={{
              fontFamily: monoFont,
              color: colors.accentBlue,
              fontSize: '0.9rem',
              margin: 0,
              marginBottom: '0.75rem',
            }}
          >
            <span style={{ color: colors.accent }}>$</span> whoami
          </p>
          {/* 👇 INJECT THE AVATAR HERE */}
        {data.personal?.avatar && (
          <img
            src={data.personal.avatar}
            alt={`${data.personal?.name || 'Developer'} Profile`}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #4ade80', // Matrix green border to match the terminal vibe
              marginBottom: '1.5rem',
              display: 'block'
            }}
          />
        )}
          <h1
            style={{
              fontFamily: monoFont,
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              lineHeight: 1.1,
              margin: 0,
              color: colors.textPrimary,
              fontWeight: 700,
              wordBreak: 'break-word',
            }}
          >
            {name}
            <span
              style={{
                display: 'inline-block',
                width: '0.55ch',
                marginLeft: '0.15em',
                color: colors.accent,
                animation: 'se-blink 1s steps(1) infinite',
              }}
            >
              _
            </span>
          </h1>
          <p
            style={{
              fontFamily: monoFont,
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              color: colors.accent,
              marginTop: '0.5rem',
              marginBottom: '1.5rem',
            }}
          >
            &gt; {role}
          </p>
          <p
            style={{
              fontFamily: sansFont,
              fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
              color: colors.textSecondary,
              lineHeight: 1.7,
              maxWidth: '70ch',
              margin: 0,
            }}
          >
            {bio}
          </p>

          {/* socials */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.9rem',
              marginTop: '2rem',
            }}
          >
            <SocialPill
              label="GitHub"
              href={socials.github}
              colors={colors}
              monoFont={monoFont}
            />
            <SocialPill
              label="LinkedIn"
              href={socials.linkedin}
              colors={colors}
              monoFont={monoFont}
            />
            {email ? (
              <button
                onClick={handleCopyEmail}
                style={{
                  fontFamily: monoFont,
                  fontSize: '0.85rem',
                  color: copiedEmail ? colors.accent : colors.textSecondary,
                  background: 'transparent',
                  border: `1px solid ${copiedEmail ? colors.accent : colors.border}`,
                  borderRadius: '999px',
                  padding: '0.5rem 1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.accent;
                  e.currentTarget.style.color = colors.accent;
                }}
                onMouseLeave={(e) => {
                  if (!copiedEmail) {
                    e.currentTarget.style.borderColor = colors.border;
                    e.currentTarget.style.color = colors.textSecondary;
                  }
                }}
              >
                {copiedEmail ? '✓ copied' : `✉ ${email}`}
              </button>
            ) : (
              <span
                style={{
                  fontFamily: monoFont,
                  fontSize: '0.85rem',
                  color: colors.textDim,
                  border: `1px dashed ${colors.border}`,
                  borderRadius: '999px',
                  padding: '0.5rem 1.1rem',
                }}
              >
                ✉ no-email-set
              </span>
            )}
          </div>
        </div>
      </div>

      {/* SKILLS */}
      <div style={{ ...sectionWrapper, paddingBottom: 'clamp(3rem, 8vh, 5rem)' }}>
        <h2 style={sectionTitle}>
          <span style={promptSpan}>$</span> cat skills.json
        </h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          {safeSkills.map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              onMouseEnter={() => setHoveredSkill(i)}
              onMouseLeave={() => setHoveredSkill(null)}
              style={{
                fontFamily: monoFont,
                fontSize: '0.85rem',
                padding: '0.55rem 1rem',
                borderRadius: '4px',
                border: `1px solid ${hoveredSkill === i ? colors.accent : colors.border}`,
                color: hoveredSkill === i ? colors.accent : colors.textSecondary,
                background: hoveredSkill === i ? 'rgba(57,255,20,0.06)' : colors.panel,
                transition: 'all 0.2s ease',
                cursor: 'default',
              }}
            >
              {`<${skill}/>`}
            </span>
          ))}
        </div>
      </div>

      {/* PROJECTS */}
      <div style={{ ...sectionWrapper, paddingBottom: 'clamp(3rem, 8vh, 5rem)' }}>
        <h2 style={sectionTitle}>
          <span style={promptSpan}>$</span> ls ./projects
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '1.25rem',
          }}
        >
          {safeProjects.map((project, i) => {
            const isHovered = hoveredProject === (project.id ?? i);
            return (
              <div
                key={project.id ?? i}
                onMouseEnter={() => setHoveredProject(project.id ?? i)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  ...cardBase,
                  borderColor: isHovered ? colors.accent : colors.border,
                  boxShadow: isHovered
                    ? '0 0 0 1px rgba(57,255,20,0.4), 0 12px 30px rgba(0,0,0,0.5)'
                    : 'none',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                {/* 👇 INJECT THE PROJECT IMAGE HERE */}
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                      border: `1px solid ${colors.border}`,
                      marginBottom: '0.5rem'
                    }}
                  />
                )}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontFamily: monoFont,
                      fontSize: '0.75rem',
                      color: colors.textDim,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}/
                  </span>
                  <span
                    style={{
                      fontFamily: monoFont,
                      fontSize: '0.7rem',
                      color: isHovered ? colors.accent : colors.textDim,
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {'>_'}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: monoFont,
                    fontSize: '1.15rem',
                    color: colors.textPrimary,
                    margin: 0,
                    wordBreak: 'break-word',
                  }}
                >
                  {project.title || 'untitled_project'}
                </h3>
                <p
                  style={{
                    fontFamily: sansFont,
                    fontSize: '0.9rem',
                    color: colors.textSecondary,
                    lineHeight: 1.6,
                    margin: 0,
                    flexGrow: 1,
                  }}
                >
                  {project.description ||
                    'No description provided for this project yet.'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* EDUCATION */}
      <div style={{ ...sectionWrapper, paddingBottom: 'clamp(4rem, 10vh, 6rem)' }}>
        <h2 style={sectionTitle}>
          <span style={promptSpan}>$</span> cat education.log
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {safeEducation.map((edu, i) => (
            <div
              key={edu.id ?? i}
              style={{
                ...cardBase,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                padding: '1.25rem 1.5rem',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: monoFont,
                    fontSize: '1rem',
                    color: colors.accentBlue,
                    margin: 0,
                    marginBottom: '0.3rem',
                  }}
                >
                  {edu.institution || 'Institution not set'}
                </p>
                <p
                  style={{
                    fontFamily: sansFont,
                    fontSize: '0.9rem',
                    color: colors.textSecondary,
                    margin: 0,
                  }}
                >
                  {edu.degree || 'Degree not specified'}
                </p>
              </div>
              <span
                style={{
                  fontFamily: monoFont,
                  fontSize: '0.85rem',
                  color: colors.accent,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '4px',
                  padding: '0.4rem 0.8rem',
                  whiteSpace: 'nowrap',
                }}
              >
                score: {edu.score || 'N/A'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          borderTop: `1px solid ${colors.border}`,
          padding: '1.5rem 5vw',
          fontFamily: monoFont,
          fontSize: '0.75rem',
          color: colors.textDim,
          textAlign: 'center',
        }}
      >
        // end_of_file — {name}
      </div>

      <style>{`
        @keyframes se-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function SocialPill({ label, href, colors, monoFont }) {
  const isActive = Boolean(href);
  return (
    <a
      href={isActive ? href : undefined}
      target={isActive ? '_blank' : undefined}
      rel={isActive ? 'noopener noreferrer' : undefined}
      style={{
        fontFamily: monoFont,
        fontSize: '0.85rem',
        color: isActive ? colors.textSecondary : colors.textDim,
        textDecoration: 'none',
        border: `1px solid ${isActive ? colors.border : colors.border}`,
        borderStyle: isActive ? 'solid' : 'dashed',
        borderRadius: '999px',
        padding: '0.5rem 1.1rem',
        transition: 'all 0.2s ease',
        cursor: isActive ? 'pointer' : 'default',
        display: 'inline-block',
      }}
      onMouseEnter={(e) => {
        if (isActive) {
          e.currentTarget.style.borderColor = colors.accentBlue;
          e.currentTarget.style.color = colors.accentBlue;
        }
      }}
      onMouseLeave={(e) => {
        if (isActive) {
          e.currentTarget.style.borderColor = colors.border;
          e.currentTarget.style.color = colors.textSecondary;
        }
      }}
    >
      {isActive ? label : `${label}: not set`}
    </a>
  );
}
