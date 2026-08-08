import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import BuilderForm from '../components/BuilderForm';

// ALL 6 TEMPLATES IMPORTED
import SoftwareEngineer from '../templates/SoftwareEngineer';
import FrontendDeveloper from '../templates/FrontendDeveloper';
import UIUXDesigner from '../templates/UIUXDesigner';
import EmbeddedSystems from '../templates/EmbeddedSystems';
import DataAnalyst from '../templates/DataAnalyst';
import FullStack from '../templates/FullStack';

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

const Dashboard = ({ portfolioData, setPortfolioData }) => {
  const navigate = useNavigate();
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const [publishModal, setPublishModal] = useState({ isOpen: false, url: '' });

  // GRAB THE USER EMAIL
  const userEmail = localStorage.getItem('userEmail') || 'Guest';

  // LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/auth');
  };

  // THE DYNAMIC ZIP EXPORT ENGINE
  const handleExport = async () => {
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
        },
        projects: Array.isArray(portfolioData.projects) ? portfolioData.projects : [],
        education: Array.isArray(portfolioData.education) ? portfolioData.education : [],
        skills: normalizedSkills,
        socials: normalizedSocials,
      };

      const response = await fetch('http://localhost:5000/api/portfolio', {
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
    }
  };

  const availableTemplates = [
    {
      title: 'Software Engineer Portfolio',
      description: 'A clean, code-focused template designed for backend and systems engineers.',
      tags: ['Java', 'C++', 'System Design'],
      placeholderTitle: 'Software Eng UI',
    },
    {
      title: 'Frontend Developer Portfolio',
      description: 'A highly interactive, visually striking template built to showcase UI components.',
      tags: ['React', 'CSS', 'Animations'],
      placeholderTitle: 'Frontend UI',
    },
    {
      title: 'UI/UX Designer Portfolio',
      description: 'A minimalist, visually-driven layout tailored for high-resolution case studies.',
      tags: ['Figma', 'Design Systems', 'UX'],
      placeholderTitle: 'UI/UX Layout',
    },
    {
      title: 'Embedded Systems Engineer Portfolio',
      description:
        'A technical template structured to present hardware integrations, microcontroller programming, and architectural diagrams.',
      tags: ['C', 'IoT', 'Microcontrollers'],
      placeholderTitle: 'Embedded UI',
    },
    {
      title: 'Data Analyst Portfolio',
      description:
        'A data-driven template perfect for embedding interactive charts, dashboards, and detailed statistical analysis case studies.',
      tags: ['Python', 'SQL', 'Tableau'],
      placeholderTitle: 'Data Dashboard',
    },
    {
      title: 'Full Stack Developer Portfolio',
      description:
        'A comprehensive, balanced template designed to exhibit both rich client-side interfaces and robust backend architecture.',
      tags: ['Node.js', 'React', 'Databases'],
      placeholderTitle: 'Full Stack UI',
    },
  ];

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
      {/* Exception: ::-webkit-scrollbar cannot be targeted via inline
          style objects, so this narrow cosmetic rule is injected here. */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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

      {/* MAIN BUILDER AREA */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* LEFT PANE: Builder Controls */}
        <div
          className="pb-dark-scroll"
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
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.09)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.borderColor = colors.panelBorder;
              }}
            >
              💾 Export HTML/CSS
            </button>

            <button
              onClick={handlePublish}
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
                cursor: 'pointer',
                boxShadow: '0 12px 26px -10px rgba(168, 85, 247, 0.55)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 18px 34px -10px rgba(168, 85, 247, 0.7)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 26px -10px rgba(168, 85, 247, 0.55)';
              }}
            >
              🚀 Publish to Web
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
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredTemplate(tmpl)}
                    onMouseLeave={() => setHoveredTemplate(null)}
                    onClick={() => setPortfolioData({ ...portfolioData, selectedTemplate: tmpl.title })}
                    style={{
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
            {(hoveredTemplate || availableTemplates.find((t) => t.title === portfolioData.selectedTemplate)) && (
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
                {(() => {
                  const displayTmpl =
                    hoveredTemplate || availableTemplates.find((t) => t.title === portfolioData.selectedTemplate);
                  return (
                    <>
                      <div
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          marginBottom: '0.35rem',
                          color: '#c4b5fd',
                        }}
                      >
                        {displayTmpl.placeholderTitle}
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
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANE: Live Preview */}
        <div
          style={{
            flex: 1.5,
            padding: '2rem',
            backgroundColor: colors.bgDeep,
            borderLeft: `1px solid ${colors.panelBorder}`,
            boxSizing: 'border-box',
            display: 'flex',         // <-- Added to control internal height
            flexDirection: 'column', // <-- Added to stack header and preview
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
              flexShrink: 0, // <-- Prevents the header from shrinking when content grows
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
            className="pb-dark-scroll" // <-- Moved the custom scrollbar class here
            style={{
              width: '100%',
              flex: 1, // <-- Forces the preview box to fill all remaining height
              borderRadius: '16px',
              overflowY: 'auto', // <-- Changed from 'hidden' so the template can scroll
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
