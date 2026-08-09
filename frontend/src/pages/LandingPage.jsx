import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * LandingPage.jsx
 * Premium SaaS landing page for "PortfolioBuilder".
 * 100% inline styles. Plug-and-play — drop directly into your router.
 */
// ---------- per-template minimalist SVG icons ----------
// Distinct, domain-matched shapes — shared with the Dashboard's template
// selector so the same visual language carries through the whole app.
const iconBaseStyle = (color) => ({ color, display: 'block' });

function IconSoftwareEngineer({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconBaseStyle(color)}>
      <path d="M9 6L3 12L9 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 6L21 12L15 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconFullStack({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconBaseStyle(color)}>
      <path d="M12 3L3 8L12 13L21 8L12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M3 12L12 17L21 12" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M3 16L12 21L21 16" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function IconDataAnalyst({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconBaseStyle(color)}>
      <line x1="4" y1="21" x2="20" y2="21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <rect x="5" y="13" width="3.2" height="8" stroke="currentColor" strokeWidth="1.7" />
      <rect x="10.4" y="8" width="3.2" height="13" stroke="currentColor" strokeWidth="1.7" />
      <rect x="15.8" y="4" width="3.2" height="17" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function IconEmbeddedSystems({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconBaseStyle(color)}>
      <rect x="7" y="7" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.7" />
      <line x1="9" y1="2" x2="9" y2="7" stroke="currentColor" strokeWidth="1.7" />
      <line x1="15" y1="2" x2="15" y2="7" stroke="currentColor" strokeWidth="1.7" />
      <line x1="9" y1="17" x2="9" y2="22" stroke="currentColor" strokeWidth="1.7" />
      <line x1="15" y1="17" x2="15" y2="22" stroke="currentColor" strokeWidth="1.7" />
      <line x1="2" y1="9" x2="7" y2="9" stroke="currentColor" strokeWidth="1.7" />
      <line x1="2" y1="15" x2="7" y2="15" stroke="currentColor" strokeWidth="1.7" />
      <line x1="17" y1="9" x2="22" y2="9" stroke="currentColor" strokeWidth="1.7" />
      <line x1="17" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function IconFrontendDeveloper({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconBaseStyle(color)}>
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.7" />
      <line x1="9" y1="9" x2="9" y2="20" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function IconUIUXDesigner({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconBaseStyle(color)}>
      <path
        d="M4 20L9.5 18.5L18 10C18.8 9.2 18.8 7.9 18 7.1L16.9 6C16.1 5.2 14.8 5.2 14 6L5.5 14.5L4 20Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <line x1="13" y1="7" x2="17" y2="11" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ---------- design tokens ----------
  const colors = {
    bg: '#0a0a0f',
    bgAlt: '#0d0d14',
    card: '#12121a',
    cardAlt: '#16161f',
    border: '#232330',
    borderHover: '#33333f',
    textPrimary: '#f5f5f7',
    textSecondary: '#a1a1ae',
    textMuted: '#68687a',
    indigo: '#6366f1',
    purple: '#a855f7',
    pink: '#ec4899',
    cyan: '#22d3ee',
  };

  const gradient = `linear-gradient(90deg, ${colors.indigo} 0%, ${colors.purple} 50%, ${colors.pink} 100%)`;
  const gradientSoft = `linear-gradient(135deg, rgba(99,102,241,0.14), rgba(236,72,153,0.14))`;
  const sans = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  const gradientText = {
    background: gradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const wrapper = {
    width: '100%',
    maxWidth: '1240px',
    margin: '0 auto',
    padding: '0 5vw',
    boxSizing: 'border-box',
  };

  const eyebrow = {
    fontSize: '0.78rem',
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: colors.indigo,
    display: 'block',
    marginBottom: '1rem',
  };

  // ---------- data ----------
  const steps = [
    {
      n: '01',
      title: 'Choose an Architecture',
      desc: 'Pick from premium, purpose-built templates — from terminal-hacker to ultra-minimalist agency.',
    },
    {
      n: '02',
      title: 'Enter Your Data',
      desc: 'Fill in your projects, skills, and education through a simple guided form. No design decisions required.',
    },
    {
      n: '03',
      title: 'Deploy to a Live URL',
      desc: 'Publish instantly to a shareable, production-ready link. Zero servers, zero config, zero hassle.',
    },
  ];

  const templates = [
    { name: 'Software Engineer', desc: 'Dark terminal, matrix-green accents.', tag: 'Terminal', icon: IconSoftwareEngineer },
    { name: 'Full Stack', desc: 'Modern SaaS gradients, alternating layout.', tag: 'SaaS', icon: IconFullStack },
    { name: 'Data Analyst', desc: 'Clean dashboard, case-study cards.', tag: 'Dashboard', icon: IconDataAnalyst },
    { name: 'Embedded Systems', desc: 'Blueprint schematic, datasheet grid.', tag: 'Hardware', icon: IconEmbeddedSystems },
    { name: 'Frontend Developer', desc: 'Vibrant bento-box, punchy gradients.', tag: 'Bento', icon: IconFrontendDeveloper },
    { name: 'UI/UX Designer', desc: 'Cinematic minimalism, editorial type.', tag: 'Minimal', icon: IconUIUXDesigner },
  ];

  const features = [
    {
      title: 'No CSS Required',
      desc: 'Every template is fully styled out of the box. Just add your content and go.',
      big: true,
    },
    { title: 'Instant JSON Export', desc: 'Own your data. Export your full portfolio as clean, structured JSON anytime.' },
    { title: 'Zero-Config Hosting', desc: 'Every portfolio ships to a live URL automatically. No servers, no DNS, no DevOps.' },
    { title: 'Six Premium Templates', desc: 'Purpose-built designs across engineering, data, and design disciplines.' },
    { title: 'Fully Responsive', desc: 'Every template adapts flawlessly from mobile to ultra-wide displays.' },
  ];

  const faqs = [
    {
      q: 'Is PortfolioBuilder free?',
      a: 'Yes. You can build and publish a live portfolio on our free plan with no credit card required. Paid tiers unlock custom domains and advanced templates.',
    },
    {
      q: 'Can I export my code?',
      a: 'Absolutely. Every portfolio can be exported as clean JSON data, and premium plans include full React component export.',
    },
    {
      q: 'Do I need any design or CSS experience?',
      a: 'None at all. Every template is fully designed and styled — you just fill in your information and publish.',
    },
    {
      q: 'Can I switch templates later?',
      a: 'Yes, your data is decoupled from your template. Swap templates anytime and your content carries over instantly.',
    },
  ];

  const handlePrimaryCta = () => {
    navigate(token ? '/dashboard' : '/auth');
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: colors.bg,
        color: colors.textPrimary,
        fontFamily: sans,
        boxSizing: 'border-box',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      {/* ================= NAVBAR ================= */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          width: '100%',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          background: scrolled ? 'rgba(10,10,15,0.75)' : 'rgba(10,10,15,0.3)',
          borderBottom: `1px solid ${scrolled ? colors.border : 'transparent'}`,
          transition: 'all 0.25s ease',
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
          {/* logo */}
          <div
            onClick={() => navigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}
          >
            <span
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: gradient,
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
              PortfolioBuilder
            </span>
          </div>

          {/* desktop right side */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
            className="pb-navbar-desktop"
          >
            {token ? (
              <>
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: colors.textSecondary,
                    fontWeight: 500,
                    maxWidth: '180px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: window.innerWidth < 640 ? 'none' : 'inline-block',
                  }}
                >
                  {userEmail || 'Signed in'}
                </span>
                <button
                  onClick={() => navigate('/dashboard')}
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#fff',
                    background: gradient,
                    border: 'none',
                    borderRadius: '999px',
                    padding: '0.6rem 1.3rem',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: colors.textSecondary,
                    background: 'transparent',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '999px',
                    padding: '0.6rem 1.3rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.borderHover;
                    e.currentTarget.style.color = colors.textPrimary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.border;
                    e.currentTarget.style.color = colors.textSecondary;
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: '#fff',
                  background: gradient,
                  border: 'none',
                  borderRadius: '999px',
                  padding: '0.65rem 1.5rem',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= HERO ================= */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          padding: '0 5vw',
          boxSizing: 'border-box',
          paddingTop: 'clamp(4rem, 12vh, 8rem)',
          paddingBottom: 'clamp(4rem, 12vh, 7rem)',
          overflow: 'hidden',
        }}
      >
        {/* glowing gradient orb */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(900px, 90vw)',
            height: 'min(900px, 90vw)',
            background:
              'radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(168,85,247,0.22) 35%, rgba(236,72,153,0.1) 55%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 20%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 20%, black, transparent)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div
          style={{
            ...wrapper,
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: 0,
          }}
        >
          <span
            style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              padding: '0.5rem 1.1rem',
              borderRadius: '999px',
              border: `1px solid ${colors.border}`,
              background: 'rgba(255,255,255,0.02)',
              color: colors.textSecondary,
              marginBottom: '2rem',
            }}
          >
            ✦ Now with 6 premium templates
          </span>

          <h1
            style={{
              fontSize: 'clamp(2.4rem, 6.4vw, 5rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: 0,
              maxWidth: '18ch',
            }}
          >
            Deploy Your Developer{' '}
            <span style={gradientText}>Portfolio</span> in Minutes, Not Days.
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.7vw, 1.25rem)',
              color: colors.textSecondary,
              lineHeight: 1.7,
              maxWidth: '58ch',
              margin: '1.75rem 0 2.75rem 0',
            }}
          >
            PortfolioBuilder turns your projects, skills, and experience into a
            polished, production-ready portfolio — no design skills, no CSS,
            no hosting setup. Just fill in your data and publish.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={handlePrimaryCta}
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#fff',
                background: gradient,
                border: 'none',
                borderRadius: '999px',
                padding: '0.95rem 2.1rem',
                cursor: 'pointer',
                boxShadow: '0 12px 30px -10px rgba(168,85,247,0.55)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 18px 40px -10px rgba(168,85,247,0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 30px -10px rgba(168,85,247,0.55)';
              }}
            >
              {token ? 'Go to Dashboard →' : 'Start Building Free →'}
            </button>
            <button
              onClick={() =>
                document.getElementById('pb-templates')?.scrollIntoView({ behavior: 'smooth' })
              }
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: colors.textPrimary,
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${colors.border}`,
                borderRadius: '999px',
                padding: '0.95rem 2.1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.borderHover;
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.border;
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              }}
            >
              View Templates
            </button>
          </div>
        </div>
      </div>

      {/* ================= HOW IT WORKS ================= */}
      <div style={{ ...wrapper, paddingTop: 'clamp(2rem, 6vh, 4rem)', paddingBottom: 'clamp(4rem, 10vh, 6rem)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 6vh, 4rem)' }}>
          <span style={{ ...eyebrow, textAlign: 'center' }}>How It Works</span>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 3.6vw, 2.7rem)',
              fontWeight: 800,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Three steps to a live portfolio
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.5rem',
            position: 'relative',
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.n}
              style={{
                background: colors.card,
                border: `1px solid ${colors.border}`,
                borderRadius: '20px',
                padding: 'clamp(1.75rem, 3vw, 2.25rem)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '-30%',
                  right: '-20%',
                  width: '60%',
                  height: '160%',
                  background: gradientSoft,
                  filter: 'blur(30px)',
                  borderRadius: '50%',
                }}
              />
              <span
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  ...gradientText,
                  position: 'relative',
                  display: 'block',
                  marginBottom: '1rem',
                }}
              >
                {step.n}
              </span>
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  margin: '0 0 0.6rem 0',
                  position: 'relative',
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: '0.92rem',
                  color: colors.textSecondary,
                  lineHeight: 1.7,
                  margin: 0,
                  position: 'relative',
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= BENTO FEATURE GRID ================= */}
      <div id="pb-templates" style={{ ...wrapper, paddingBottom: 'clamp(2.5rem, 6vh, 4rem)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 6vh, 4rem)' }}>
          <span style={{ ...eyebrow, textAlign: 'center' }}>Templates</span>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 3.6vw, 2.7rem)',
              fontWeight: 800,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Six premium, purpose-built designs
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.25rem',
          }}
        >
          {templates.map((tpl, i) => {
            const isHovered = hoveredTemplate === i;
            return (
              <div
                key={tpl.name}
                onMouseEnter={() => setHoveredTemplate(i)}
                onMouseLeave={() => setHoveredTemplate(null)}
                style={{
                  background: colors.card,
                  border: `1px solid ${isHovered ? colors.borderHover : colors.border}`,
                  borderRadius: '20px',
                  padding: '1.75rem',
                  transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  boxShadow: isHovered ? '0 20px 40px -20px rgba(99,102,241,0.35)' : 'none',
                  cursor: 'default',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: gradient,
                      opacity: isHovered ? 1 : 0.85,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'opacity 0.2s ease',
                    }}
                  >
                    <tpl.icon size={19} color="#fff" />
                  </span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: colors.textMuted,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '999px',
                      padding: '0.25rem 0.7rem',
                    }}
                  >
                    {tpl.tag}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{tpl.name}</h3>
                <p style={{ fontSize: '0.88rem', color: colors.textSecondary, lineHeight: 1.6, margin: 0 }}>
                  {tpl.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* feature bento (asymmetric) */}
      <div style={{ ...wrapper, paddingBottom: 'clamp(4rem, 9vh, 6rem)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gridAutoRows: 'minmax(160px, auto)',
            gap: '1.25rem',
          }}
        >
          {features.map((feat, i) => {
            const isHovered = hoveredFeature === i;
            return (
              <div
                key={feat.title}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={{
                  gridColumn: feat.big ? 'span 2' : 'span 1',
                  background: isHovered ? colors.cardAlt : colors.card,
                  border: `1px solid ${isHovered ? colors.borderHover : colors.border}`,
                  borderRadius: '20px',
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '3px',
                    background: gradient,
                  }}
                />
                <h3
                  style={{
                    fontSize: feat.big ? 'clamp(1.3rem, 2.4vw, 1.6rem)' : '1.05rem',
                    fontWeight: 800,
                    margin: 0,
                  }}
                >
                  {feat.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: colors.textSecondary, lineHeight: 1.6, margin: 0 }}>
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= FAQ ================= */}
      <div style={{ ...wrapper, paddingBottom: 'clamp(4rem, 9vh, 6rem)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 6vh, 3.5rem)' }}>
          <span style={{ ...eyebrow, textAlign: 'center' }}>FAQ</span>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 3.6vw, 2.7rem)',
              fontWeight: 800,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Frequently asked questions
          </h2>
        </div>

        <div
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
          }}
        >
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={faq.q}
                style={{
                  background: colors.card,
                  border: `1px solid ${isOpen ? colors.borderHover : colors.border}`,
                  borderRadius: '16px',
                  padding: '1.25rem 1.5rem',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease',
                }}
                onClick={() => setOpenFaq(isOpen ? -1 : i)}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                  }}
                >
                  <span style={{ fontSize: '1rem', fontWeight: 700 }}>{faq.q}</span>
                  <span
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: 400,
                      color: colors.textMuted,
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      flexShrink: 0,
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </div>
                <div
                  style={{
                    maxHeight: isOpen ? '200px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease, opacity 0.25s ease, margin-top 0.3s ease',
                    marginTop: isOpen ? '0.85rem' : '0px',
                  }}
                >
                  <p style={{ margin: 0, fontSize: '0.92rem', color: colors.textSecondary, lineHeight: 1.7 }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= FINAL CTA BAND ================= */}
      <div style={{ ...wrapper, paddingBottom: 'clamp(4rem, 9vh, 6rem)' }}>
        <div
          style={{
            position: 'relative',
            borderRadius: '28px',
            overflow: 'hidden',
            padding: 'clamp(2.5rem, 6vw, 4.5rem)',
            textAlign: 'center',
            border: `1px solid ${colors.border}`,
            background: colors.card,
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-40%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '70%',
              height: '180%',
              background: 'radial-gradient(circle, rgba(168,85,247,0.25), transparent 65%)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }}
          />
          <h2
            style={{
              fontSize: 'clamp(1.7rem, 3.6vw, 2.6rem)',
              fontWeight: 800,
              margin: '0 0 1rem 0',
              letterSpacing: '-0.02em',
              position: 'relative',
            }}
          >
            Your portfolio is one form away.
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: colors.textSecondary,
              margin: '0 0 2rem 0',
              position: 'relative',
            }}
          >
            Join developers and designers shipping polished portfolios in minutes.
          </p>
          <button
            onClick={handlePrimaryCta}
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: '#fff',
              background: gradient,
              border: 'none',
              borderRadius: '999px',
              padding: '0.95rem 2.4rem',
              cursor: 'pointer',
              position: 'relative',
              boxShadow: '0 12px 30px -10px rgba(168,85,247,0.55)',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {token ? 'Go to Dashboard →' : 'Start Building Free →'}
          </button>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div style={{ borderTop: `1px solid ${colors.border}` }}>
        <div
          style={{
            ...wrapper,
            padding: 'clamp(2rem, 5vh, 3rem) 5vw',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '6px',
                background: gradient,
                display: 'inline-block',
              }}
            />
            <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>PortfolioBuilder</span>
          </div>
          <span style={{ fontSize: '0.82rem', color: colors.textMuted }}>
            © {new Date().getFullYear()} PortfolioBuilder. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
}
