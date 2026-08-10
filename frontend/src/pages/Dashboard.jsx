import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import BuilderForm from '../components/BuilderForm';
import React, { useState, useEffect } from 'react';

// ALL 6 TEMPLATES IMPORTED
import SoftwareEngineer from '../templates/SoftwareEngineer';
import FrontendDeveloper from '../templates/FrontendDeveloper';
import UIUXDesigner from '../templates/UIUXDesigner';
import EmbeddedSystems from '../templates/EmbeddedSystems';
import DataAnalyst from '../templates/DataAnalyst';
import FullStack from '../templates/FullStack';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ---------- shared design tokens (matches the landing page) ----------
const colors = {
  bg: '#0f0f11',
  bgDeep: '#0a0a0c',
  panel: '#1e1e24',
  panelBorder: 'rgba(255, 255, 255, 0.1)',
  textWhite: '#ffffff',
  textLabel: '#a1a1aa',
  textHelper: '#9ca3af',
  indigo: '#6366f1',
  purple: '#a855f7',
  pink: '#ec4899',
  danger: '#ef4444',
  dangerHover: '#dc2626',
  success: '#10b981',
};

const sans = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const gradient = 'linear-gradient(135deg, #8b5cf6, #ec4899)';

// ---------- per-template minimalist SVG icons ----------
// Each icon is a small inline-styled functional component so it can be
// dropped next to a template's title with a distinct, domain-matched shape.
const iconBaseStyle = (color) => ({ color, display: 'block' });

function IconSoftwareEngineer({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconBaseStyle(color)}>
      <path d="M9 6L3 12L9 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 6L21 12L15 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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

function IconFullStack({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconBaseStyle(color)}>
      <path d="M12 3L3 8L12 13L21 8L12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M3 12L12 17L21 12" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M3 16L12 21L21 16" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

const Dashboard = ({ portfolioData, setPortfolioData }) => {
  const navigate = useNavigate();
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const [publishModal, setPublishModal] = useState({ isOpen: false, url: '' });

  // 👇 ADD THIS NEW STATE:
  const [isPublishing, setIsPublishing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Which pane is visible on mobile: 'form' (Builder Controls) or 'preview' (Live Preview).
  // Ignored on desktop — both panes are always shown side by side there via the
  // media query below, which only hides panes under 768px.
  const [mobileView, setMobileView] = useState('form');

  // GRAB THE USER EMAIL
  const userEmail = localStorage.getItem('userEmail') || 'Guest';

  // 👇 FETCH SAVED DATA ON LOAD
  useEffect(() => {
    const fetchMyPortfolio = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch(`${API_BASE_URL}/api/portfolio/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const dbData = await response.json();
          
          // Overwrite the App.jsx defaults with the user's actual saved data
          setPortfolioData(prevData => ({
            ...prevData,
            slug: dbData.userSlug || '',
            selectedTemplate: dbData.template || 'Software Engineer Portfolio',
            personal: {
              name: dbData.personalInfo?.fullName || '',
              role: dbData.personalInfo?.role || '',
              bio: dbData.personalInfo?.bio || '',
              avatar: dbData.personalInfo?.avatar || ''
            },
            // Fallback to the default arrays if the database arrays are empty
            projects: Array.isArray(dbData.projects) && dbData.projects.length > 0 ? dbData.projects : prevData.projects,
            education: Array.isArray(dbData.education) && dbData.education.length > 0 ? dbData.education : prevData.education,
            skills: Array.isArray(dbData.skills) && dbData.skills.length > 0 ? dbData.skills : prevData.skills,
            socials: dbData.socials || prevData.socials
          }));
        }
      } catch (error) {
        console.error('Failed to fetch saved portfolio data:', error);
      }
    };

    fetchMyPortfolio();
  }, []); // The empty array ensures this only runs exactly once when the dashboard opens

  // LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/auth');
  };

  const handleExport = async () => {
    // 👇 START THE LOADING STATE
    setIsExporting(true);
    
    try {
      const previewElement = document.getElementById('portfolio-preview');
      if (!previewElement) {
        alert('Could not find the preview element to export!');
        return;
      }

      const templateHTML = previewElement.innerHTML;
      const zip = new JSZip();

      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${portfolioData.personal?.name || 'Developer'} | Portfolio</title>
  <style>
    body, html { margin: 0; padding: 0; box-sizing: border-box; width: 100%; min-height: 100vh; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    *, *:before, *:after { box-sizing: inherit; }
  </style>
</head>
<body>
  ${templateHTML}
</body>
</html>`;

      zip.file('index.html', htmlContent);
      const blob = await zip.generateAsync({ type: 'blob' });
      const fileName = portfolioData.personal?.name
        ? `${portfolioData.personal.name.replace(/\s+/g, '_')}_Portfolio.zip`
        : 'Portfolio.zip';

      saveAs(blob, fileName);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to generate export file. Check your console, bro.');
    } finally {
      // 👇 STOP THE LOADING STATE
      setIsExporting(false);
    }
  };

  const handlePublish = async () => {
    console.log('Current Slug in State:', portfolioData.slug);

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to publish! Redirecting to login...');
      navigate('/auth');
      return;
    }

    if (!portfolioData.personal?.name) {
      alert('Please enter your Full Name before publishing!');
      return;
    }

    // 👇 START THE LOADING STATE
    setIsPublishing(true);

    try {
      const normalizedSkills = Array.isArray(portfolioData.skills)
        ? portfolioData.skills.filter(Boolean)
        : [];
      const normalizedSocials = {
        github: portfolioData.socials?.github || '',
        linkedin: portfolioData.socials?.linkedin || '',
        email: portfolioData.socials?.email || '',
      };

      const payload = {
        slug: portfolioData.slug || '',
        template: portfolioData.selectedTemplate || 'Software Engineer Portfolio',
        personalInfo: {
          fullName: portfolioData.personal.name,
          role: portfolioData.personal.role,
          bio: portfolioData.personal.bio,
          avatar: portfolioData.personal.avatar || '',
        },
        projects: Array.isArray(portfolioData.projects) ? portfolioData.projects : [],
        education: Array.isArray(portfolioData.education) ? portfolioData.education : [],
        skills: normalizedSkills,
        socials: normalizedSocials,
      };

      const response = await fetch(`${API_BASE_URL}/api/portfolio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      let data = null;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Failed to parse publish response:', parseError);
        data = { message: 'Invalid server response.' };
      }

      if (response.ok) {
        const nextSlug = data?.slug || portfolioData.slug || '';
        setPortfolioData({ ...portfolioData, slug: nextSlug });
        setPublishModal({ isOpen: true, url: data?.url || 'N/A' });
        console.log('Saved Data:', data);
      } else {
        console.error('Publish failed with server response:', data);
        alert(`Error: ${data?.message || 'Unknown error while publishing.'}`);
      }
    } catch (error) {
      console.error('Publishing error:', error);
      alert('Failed to publish. Check your console, bro.');
    } finally {
      // 👇 STOP THE LOADING STATE
      setIsPublishing(false);
    }
  };

  const availableTemplates = [
    {
      title: 'Software Engineer Portfolio',
      description: 'A clean, code-focused template designed for backend and systems engineers.',
      tags: ['Java', 'C++', 'System Design'],
      placeholderTitle: 'Software Eng UI',
      icon: IconSoftwareEngineer,
    },
    {
      title: 'Frontend Developer Portfolio',
      description: 'A highly interactive, visually striking template built to showcase UI components.',
      tags: ['React', 'CSS', 'Animations'],
      placeholderTitle: 'Frontend UI',
      icon: IconFrontendDeveloper,
    },
    {
      title: 'UI/UX Designer Portfolio',
      description: 'A minimalist, visually-driven layout tailored for high-resolution case studies.',
      tags: ['Figma', 'Design Systems', 'UX'],
      placeholderTitle: 'UI/UX Layout',
      icon: IconUIUXDesigner,
    },
    {
      title: 'Embedded Systems Engineer Portfolio',
      description:
        'A technical template structured to present hardware integrations, microcontroller programming, and architectural diagrams.',
      tags: ['C', 'IoT', 'Microcontrollers'],
      placeholderTitle: 'Embedded UI',
      icon: IconEmbeddedSystems,
    },
    {
      title: 'Data Analyst Portfolio',
      description:
        'A data-driven template perfect for embedding interactive charts, dashboards, and detailed statistical analysis case studies.',
      tags: ['Python', 'SQL', 'Tableau'],
      placeholderTitle: 'Data Dashboard',
      icon: IconDataAnalyst,
    },
    {
      title: 'Full Stack Developer Portfolio',
      description:
        'A comprehensive, balanced template designed to exhibit both rich client-side interfaces and robust backend architecture.',
      tags: ['Node.js', 'React', 'Databases'],
      placeholderTitle: 'Full Stack UI',
      icon: IconFullStack,
    },
  ];

  const displayTmpl = hoveredTemplate || availableTemplates.find((t) => t.title === portfolioData.selectedTemplate);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        fontFamily: sans,
        background: colors.bg,
      }}
    >
      {/* Exceptions permitted for things inline styles cannot express:
          ::-webkit-scrollbar cosmetics, and the mobile breakpoint that
          switches the builder from a side-by-side layout to a tabbed,
          stacked one under 768px. */}
      <style>{`
        .pb-dark-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
        .pb-dark-scroll::-webkit-scrollbar-track { background: transparent; }
        .pb-dark-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.12);
          border-radius: 999px;
        }
        .pb-dark-scroll::-webkit-scrollbar-thumb:hover {
          background-color: rgba(168, 85, 247, 0.45);
        }

        .pb-mobile-tabs { display: none; }

        @media (max-width: 768px) {
          .pb-builder-main { flex-direction: column; }
          .pb-hide-mobile { display: none !important; }
          .pb-mobile-tabs { display: flex !important; }
          /* CHANGED: flex: 1 1 0 forces the pane to respect the screen height, enabling the inner scroll */
          .pb-pane-left, .pb-pane-right { flex: 1 1 0 !important; width: 100% !important; height: 100% !important; }
          .pb-pane-left { padding: 1.25rem !important; }
          /* CHANGED: added overflow: hidden so the scroll stays strictly inside the preview window */
          .pb-pane-right { padding: 1.25rem !important; overflow: hidden !important; }
          .pb-topnav-email { display: none !important; }
        }
      `}</style>

      {/* PREMIUM TOP NAV BAR */}
      <div
        style={{
          height: '64px',
          backgroundColor: colors.bgDeep,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 2rem',
          color: colors.textWhite,
          flexShrink: 0,
          borderBottom: `1px solid ${colors.panelBorder}`,
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '0.55rem 1.1rem',
            cursor: 'pointer',
            borderRadius: '999px',
            border: `1px solid ${colors.panelBorder}`,
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            color: colors.textWhite,
            fontSize: '0.85rem',
            fontWeight: 700,
            fontFamily: sans,
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
            e.currentTarget.style.borderColor = colors.panelBorder;
          }}
        >
          ← Back to Home
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div className="pb-topnav-email" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: colors.success,
                boxShadow: `0 0 8px ${colors.success}`,
              }}
            />
            <span style={{ fontSize: '0.88rem', color: colors.textLabel }}>
              Logged in as: <strong style={{ color: colors.textWhite }}>{userEmail}</strong>
            </span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1.2rem',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              color: '#fca5a5',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              borderRadius: '999px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 700,
              fontFamily: sans,
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = colors.danger;
              e.currentTarget.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.12)';
              e.currentTarget.style.color = '#fca5a5';
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* MOBILE TAB BAR — hidden on desktop, shown only under 768px */}
      <div
        className="pb-mobile-tabs"
        style={{
          flexShrink: 0,
          backgroundColor: colors.bgDeep,
          borderBottom: `1px solid ${colors.panelBorder}`,
          padding: '0.6rem 1rem',
          gap: '0.5rem',
        }}
      >
        <button
          onClick={() => setMobileView('form')}
          style={{
            flex: 1,
            padding: '0.6rem',
            borderRadius: '999px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 700,
            fontFamily: sans,
            background: mobileView === 'form' ? gradient : 'rgba(255, 255, 255, 0.05)',
            color: mobileView === 'form' ? '#fff' : colors.textLabel,
            transition: 'all 0.2s ease',
          }}
        >
          📝 Edit
        </button>
        <button
          onClick={() => setMobileView('preview')}
          style={{
            flex: 1,
            padding: '0.6rem',
            borderRadius: '999px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 700,
            fontFamily: sans,
            background: mobileView === 'preview' ? gradient : 'rgba(255, 255, 255, 0.05)',
            color: mobileView === 'preview' ? '#fff' : colors.textLabel,
            transition: 'all 0.2s ease',
          }}
        >
          👁 Preview
        </button>
      </div>

      {/* MAIN BUILDER AREA */}
      <div className="pb-builder-main" style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* LEFT PANE: Builder Controls */}
        <div
          className={`pb-dark-scroll pb-pane-left${mobileView === 'preview' ? ' pb-hide-mobile' : ''}`}
          style={{
            flex: 1,
            padding: '2rem',
            backgroundColor: colors.bg,
            overflowY: 'scroll',
            position: 'relative',
            boxSizing: 'border-box',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              marginBottom: '1.5rem',
              color: colors.textWhite,
              letterSpacing: '-0.01em',
            }}
          >
            Builder Controls
          </h2>

          {/* INJECTED MODULAR FORM COMPONENT */}
          <BuilderForm portfolioData={portfolioData} setPortfolioData={setPortfolioData} />

          {/* --- CUSTOM URL SLUG INPUT --- */}
          <div style={{ marginTop: '2.5rem' }}>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Custom URL Slug
            </label>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#0f172a', borderRadius: '8px', border: '1px solid #475569', padding: '0.75rem 1rem' }}>
              <span style={{ color: '#64748b', marginRight: '0.25rem', fontSize: '0.85rem' }}>
                student-portfolio-builder-eta.vercel.app/
              </span>
              <input 
                type="text" 
                value={portfolioData.slug || ''}
                onChange={(e) => {
                  const formattedSlug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
                  setPortfolioData({ ...portfolioData, slug: formattedSlug });
                }}
                style={{ width: '100%', backgroundColor: 'transparent', color: '#f8fafc', fontSize: '0.95rem', border: 'none', outline: 'none' }}
                placeholder="my-cool-name"
              />
            </div>
          </div>

          {/* EXPORT & PUBLISH BUTTONS */}
          <div
            style={{
              marginTop: '3rem',
              borderTop: `1px solid ${colors.panelBorder}`,
              paddingTop: '2rem',
              marginBottom: '2rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <button
              onClick={handleExport}
              disabled={isExporting} // 👈 Prevents double clicks
              style={{
                flex: 1,
                minWidth: '180px',
                padding: '1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                color: colors.textWhite,
                border: `1px solid ${colors.panelBorder}`,
                borderRadius: '999px',
                fontSize: '1rem',
                fontWeight: 700,
                fontFamily: sans,
                cursor: isExporting ? 'wait' : 'pointer', // 👈 Changes cursor
                opacity: isExporting ? 0.75 : 1, // 👈 Dims button while loading
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                // 👇 Only apply hover effects if NOT loading
                if (!isExporting) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.09)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                }
              }}
              onMouseOut={(e) => {
                if (!isExporting) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.borderColor = colors.panelBorder;
                }
              }}
            >
              {/* 👇 Dynamically switch the text/icon */}
              {isExporting ? '⏳ Exporting...' : '💾 Export HTML/CSS'}
            </button>

            <button
              onClick={handlePublish}
              disabled={isPublishing} // 👈 Prevents double clicks
              style={{
                flex: 1,
                minWidth: '180px',
                padding: '1rem',
                background: gradient,
                color: '#fff',
                border: 'none',
                borderRadius: '999px',
                fontSize: '1rem',
                fontWeight: 700,
                fontFamily: sans,
                cursor: isPublishing ? 'wait' : 'pointer', // 👈 Changes cursor
                opacity: isPublishing ? 0.75 : 1, // 👈 Dims button while loading
                boxShadow: '0 12px 26px -10px rgba(168, 85, 247, 0.55)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
              }}
              onMouseOver={(e) => {
                if (!isPublishing) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 18px 34px -10px rgba(168, 85, 247, 0.7)';
                }
              }}
              onMouseOut={(e) => {
                if (!isPublishing) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 12px 26px -10px rgba(168, 85, 247, 0.55)';
                }
              }}
            >
              {/* 👇 Dynamically switch the text/icon */}
              {isPublishing ? '⏳ Publishing...' : '🚀 Publish to Web'}
            </button>
          </div>

          {/* Template Selection Section */}
          <div style={{ paddingBottom: '2rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.75rem',
                fontWeight: 700,
                color: colors.textWhite,
                fontSize: '0.95rem',
              }}
            >
              Choose Template
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {availableTemplates.map((tmpl, idx) => {
                const isSelected = portfolioData.selectedTemplate === tmpl.title;
                const TmplIcon = tmpl.icon;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredTemplate(tmpl)}
                    onMouseLeave={() => setHoveredTemplate(null)}
                    onClick={() => setPortfolioData({ ...portfolioData, selectedTemplate: tmpl.title })}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: isSelected ? `1.5px solid ${colors.purple}` : `1px solid ${colors.panelBorder}`,
                      backgroundColor: isSelected ? 'rgba(168, 85, 247, 0.1)' : colors.panel,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 0 0 4px rgba(168, 85, 247, 0.12)' : 'none',
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        width: '34px',
                        height: '34px',
                        borderRadius: '9px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isSelected ? gradient : 'rgba(255, 255, 255, 0.06)',
                        transition: 'background 0.2s ease',
                      }}
                    >
                      <TmplIcon size={18} color={isSelected ? '#fff' : colors.textLabel} />
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: '0.92rem',
                        color: isSelected ? '#e9d5ff' : colors.textWhite,
                      }}
                    >
                      {tmpl.title}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* STABLE INFO BOX WITH FIXED MIN-HEIGHT */}
            {displayTmpl && (
              <div
                style={{
                  marginTop: '1rem',
                  padding: '1.1rem',
                  backgroundColor: colors.panel,
                  border: `1px solid ${colors.panelBorder}`,
                  color: colors.textWhite,
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px -12px rgba(0, 0, 0, 0.5)',
                  transition: 'all 0.2s ease',
                  minHeight: '160px',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: gradient,
                      flexShrink: 0,
                    }}
                  >
                    <displayTmpl.icon size={16} color="#fff" />
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#c4b5fd' }}>
                    {displayTmpl.placeholderTitle}
                  </div>
                </div>
                <p
                  style={{
                    fontSize: '0.83rem',
                    color: colors.textHelper,
                    marginBottom: '0.85rem',
                    lineHeight: 1.5,
                  }}
                >
                  {displayTmpl.description}
                </p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {displayTmpl.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: '0.72rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        border: `1px solid ${colors.panelBorder}`,
                        color: colors.textLabel,
                        padding: '3px 8px',
                        borderRadius: '999px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANE: Live Preview */}
        <div
          className={`pb-pane-right${mobileView === 'form' ? ' pb-hide-mobile' : ''}`}
          style={{
            flex: 1.5,
            padding: '2rem',
            backgroundColor: colors.bgDeep,
            borderLeft: `1px solid ${colors.panelBorder}`,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.25rem',
              flexShrink: 0,
            }}
          >
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                margin: 0,
                color: colors.textWhite,
                letterSpacing: '-0.01em',
              }}
            >
              Live Preview
            </h2>
            <span
              style={{
                fontSize: '0.8rem',
                padding: '5px 10px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: `1px solid ${colors.panelBorder}`,
                color: colors.textLabel,
                borderRadius: '999px',
                fontWeight: 600,
              }}
            >
              Active Template: {portfolioData.selectedTemplate || 'None selected'}
            </span>
          </div>

          {/* DYNAMIC TEMPLATE RENDERING ENGINE */}
          <div
            id="portfolio-preview"
            className="pb-dark-scroll"
            style={{
              width: '100%',
              flex: 1,
              borderRadius: '16px',
              overflowY: 'auto',
              overflowX: 'hidden',
              border: `1px solid ${colors.panelBorder}`,
            }}
          >
            {portfolioData.selectedTemplate === 'Software Engineer Portfolio' ? (
              <SoftwareEngineer data={portfolioData} portfolioData={portfolioData} />
            ) : portfolioData.selectedTemplate === 'Frontend Developer Portfolio' ? (
              <FrontendDeveloper data={portfolioData} portfolioData={portfolioData} />
            ) : portfolioData.selectedTemplate === 'UI/UX Designer Portfolio' ? (
              <UIUXDesigner data={portfolioData} portfolioData={portfolioData} />
            ) : portfolioData.selectedTemplate === 'Embedded Systems Engineer Portfolio' ? (
              <EmbeddedSystems data={portfolioData} portfolioData={portfolioData} />
            ) : portfolioData.selectedTemplate === 'Data Analyst Portfolio' ? (
              <DataAnalyst data={portfolioData} portfolioData={portfolioData} />
            ) : portfolioData.selectedTemplate === 'Full Stack Developer Portfolio' ? (
              <FullStack data={portfolioData} portfolioData={portfolioData} />
            ) : (
              <div
                style={{
                  padding: '3rem',
                  textAlign: 'center',
                  color: colors.textHelper,
                  border: `2px dashed ${colors.panelBorder}`,
                  borderRadius: '12px',
                  backgroundColor: colors.bg,
                }}
              >
                <h3 style={{ color: colors.textWhite, margin: '0 0 0.5rem 0' }}>Preview not available yet.</h3>
                <p style={{ margin: 0 }}>
                  Select a template on the left to preview {portfolioData.selectedTemplate || 'your portfolio'}.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PREMIUM SUCCESS MODAL OVERLAY */}
      {publishModal.isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '1rem',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              backgroundColor: colors.panel,
              border: `1px solid ${colors.panelBorder}`,
              padding: '2.5rem',
              borderRadius: '20px',
              maxWidth: '450px',
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.6)',
              boxSizing: 'border-box',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '-40%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '160%',
                background: 'radial-gradient(circle, rgba(168,85,247,0.28), transparent 65%)',
                filter: 'blur(30px)',
                pointerEvents: 'none',
              }}
            />
            <div style={{ fontSize: '3rem', marginBottom: '1rem', position: 'relative' }}>🎉</div>
            <h2
              style={{
                margin: '0 0 0.5rem 0',
                color: colors.textWhite,
                fontSize: '1.7rem',
                fontWeight: 800,
                position: 'relative',
              }}
            >
              Published Successfully!
            </h2>
            <p
              style={{
                margin: '0 0 1.5rem 0',
                color: colors.textHelper,
                fontSize: '0.98rem',
                position: 'relative',
              }}
            >
              Your portfolio is live and ready to share with the world.
            </p>

            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.35)',
                border: `1px solid ${colors.panelBorder}`,
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '1.5rem',
                wordBreak: 'break-all',
                position: 'relative',
              }}
            >
              <a
                href={publishModal.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: '#c4b5fd',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  textDecoration: 'none',
                }}
              >
                {publishModal.url}
              </a>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', position: 'relative' }}>
              <button
                onClick={() => navigator.clipboard.writeText(publishModal.url)}
                style={{
                  flex: 1,
                  padding: '0.8rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  color: colors.textWhite,
                  border: `1px solid ${colors.panelBorder}`,
                  borderRadius: '999px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  fontFamily: sans,
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)')}
              >
                📋 Copy Link
              </button>

              <button
                onClick={() => setPublishModal({ isOpen: false, url: '' })}
                style={{
                  flex: 1,
                  padding: '0.8rem',
                  background: gradient,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  fontFamily: sans,
                  transition: 'opacity 0.2s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '0.88')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
