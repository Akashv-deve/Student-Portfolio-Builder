import React, { useState } from 'react';

// ---------- shared design tokens ----------
const colors = {
  bg: '#131316',
  panel: '#1e1e24',
  panelBorder: 'rgba(255, 255, 255, 0.1)',
  inputBg: 'rgba(0, 0, 0, 0.3)',
  inputBorder: '#3f3f46',
  focusPurple: '#a855f7',
  textWhite: '#ffffff',
  textLabel: '#a1a1aa',
  textHelper: '#9ca3af',
  dashedBorder: 'rgba(255, 255, 255, 0.18)',
  dashedBorderHover: '#a855f7',
};

const sans = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.75rem',
    fontFamily: sans,
  },
  section: {
    background: colors.panel,
    padding: '1.5rem',
    borderRadius: '16px',
    border: `1px solid ${colors.panelBorder}`,
    boxShadow: '0 8px 24px -12px rgba(0, 0, 0, 0.5)',
    boxSizing: 'border-box',
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: colors.textWhite,
    margin: '0 0 1.35rem 0',
    borderBottom: `1px solid ${colors.panelBorder}`,
    paddingBottom: '0.75rem',
    letterSpacing: '-0.01em',
  },
  inputGroup: {
    marginBottom: '1.15rem',
  },
  inputLabel: {
    display: 'block',
    fontSize: '0.82rem',
    fontWeight: 600,
    color: colors.textLabel,
    marginBottom: '0.5rem',
  },
  itemCard: {
    padding: '1.1rem',
    background: 'rgba(0, 0, 0, 0.2)',
    border: `1px solid ${colors.panelBorder}`,
    borderRadius: '12px',
    marginBottom: '1rem',
  },
};

const inputBaseStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  backgroundColor: colors.inputBg,
  border: `1px solid ${colors.inputBorder}`,
  borderRadius: '8px',
  fontFamily: 'inherit',
  fontSize: '0.95rem',
  color: colors.textWhite,
  boxSizing: 'border-box',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  outline: 'none',
};

const applyFocusStyle = (e) => {
  e.target.style.borderColor = colors.focusPurple;
  e.target.style.boxShadow = '0 0 0 4px rgba(168, 85, 247, 0.18)';
  e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.45)';
};

const removeFocusStyle = (e) => {
  e.target.style.borderColor = colors.inputBorder;
  e.target.style.boxShadow = 'none';
  e.target.style.backgroundColor = colors.inputBg;
};

function PremiumInput({ style, ...props }) {
  return (
    <input
      {...props}
      style={{ ...inputBaseStyle, ...style }}
      onFocus={applyFocusStyle}
      onBlur={removeFocusStyle}
    />
  );
}

function PremiumTextarea({ style, ...props }) {
  return (
    <textarea
      {...props}
      style={{ ...inputBaseStyle, minHeight: '100px', resize: 'vertical', ...style }}
      onFocus={applyFocusStyle}
      onBlur={removeFocusStyle}
    />
  );
}

function AddButton({ children, ...props }) {
  return (
    <button
      {...props}
      style={{
        width: '100%',
        padding: '0.75rem',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        color: colors.textLabel,
        border: `1.5px dashed ${colors.dashedBorder}`,
        borderRadius: '8px',
        fontWeight: 600,
        fontFamily: sans,
        fontSize: '0.9rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.08)';
        e.currentTarget.style.borderColor = colors.dashedBorderHover;
        e.currentTarget.style.color = colors.textWhite;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
        e.currentTarget.style.borderColor = colors.dashedBorder;
        e.currentTarget.style.color = colors.textLabel;
      }}
    >
      {children}
    </button>
  );
}

const BuilderForm = ({ portfolioData, setPortfolioData }) => {
  // Upload UI tracking states
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingProjects, setUploadingProjects] = useState({});

  // Unified File Upload Handler to Cloudinary
  const handleImageUpload = async (file, onUploadSuccess, setUploadingStatus) => {
    if (!file) return;
    setUploadingStatus(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const token = localStorage.getItem('token');
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

      const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        onUploadSuccess(data.url);
      } else {
        alert(`Upload failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred during upload.');
    } finally {
      setUploadingStatus(false);
    }
  };

  const handleProjectChange = (index, field, value) => {
    const updated = [...portfolioData.projects];
    updated[index][field] = value;
    setPortfolioData({ ...portfolioData, projects: updated });
  };

  const handleEduChange = (index, field, value) => {
    const updated = [...portfolioData.education];
    updated[index][field] = value;
    setPortfolioData({ ...portfolioData, education: updated });
  };

  return (
    <div style={styles.container}>
      <style>{`
        .pb-form-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
        .pb-form-scroll::-webkit-scrollbar-track { background: transparent; }
        .pb-form-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.12);
          border-radius: 999px;
        }
        .pb-form-scroll::-webkit-scrollbar-thumb:hover {
          background-color: rgba(168, 85, 247, 0.4);
        }
      `}</style>

      {/* Personal Info */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Personal Information</h3>
        
        {/* NEW: Avatar Upload UI */}
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Profile Picture (Avatar)</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            {portfolioData.personal.avatar && (
              <img 
                src={portfolioData.personal.avatar} 
                alt="Avatar" 
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${colors.panelBorder}` }} 
              />
            )}
            <input
              type="file"
              accept="image/*"
              disabled={uploadingAvatar}
              onChange={(e) => handleImageUpload(
                e.target.files[0],
                (url) => setPortfolioData({ ...portfolioData, personal: { ...portfolioData.personal, avatar: url } }),
                setUploadingAvatar
              )}
              style={{ color: colors.textHelper, fontSize: '0.85rem' }}
            />
            {uploadingAvatar && <span style={{ color: colors.focusPurple, fontSize: '0.85rem', fontWeight: 'bold' }}>⏳ Uploading...</span>}
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Full Name</label>
          <PremiumInput
            type="text"
            placeholder="Enter your name"
            value={portfolioData.personal.name || ''}
            onChange={(e) =>
              setPortfolioData({
                ...portfolioData,
                personal: { ...portfolioData.personal, name: e.target.value },
              })
            }
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Professional Role</label>
          <PremiumInput
            type="text"
            placeholder="e.g. Full-Stack Developer"
            value={portfolioData.personal.role || ''}
            onChange={(e) =>
              setPortfolioData({
                ...portfolioData,
                personal: { ...portfolioData.personal, role: e.target.value },
              })
            }
          />
        </div>
        <div style={{ ...styles.inputGroup, marginBottom: 0 }}>
          <label style={styles.inputLabel}>Short Bio</label>
          <PremiumTextarea
            placeholder="Tell your story..."
            value={portfolioData.personal.bio || ''}
            onChange={(e) =>
              setPortfolioData({
                ...portfolioData,
                personal: { ...portfolioData.personal, bio: e.target.value },
              })
            }
          />
        </div>
      </div>

      {/* Projects */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Projects</h3>
        {portfolioData.projects &&
          portfolioData.projects.map((project, index) => (
            <div key={project.id} style={styles.itemCard}>
              
              {/* NEW: Project Thumbnail Upload UI */}
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Project Thumbnail</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                  {project.image && (
                    <img 
                      src={project.image} 
                      alt="Project Thumbnail" 
                      style={{ width: '80px', height: '45px', borderRadius: '6px', objectFit: 'cover', border: `1px solid ${colors.panelBorder}` }} 
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingProjects[index]}
                    onChange={(e) => handleImageUpload(
                      e.target.files[0],
                      (url) => handleProjectChange(index, 'image', url),
                      (status) => setUploadingProjects(prev => ({ ...prev, [index]: status }))
                    )}
                    style={{ color: colors.textHelper, fontSize: '0.85rem' }}
                  />
                  {uploadingProjects[index] && <span style={{ color: colors.focusPurple, fontSize: '0.85rem', fontWeight: 'bold' }}>⏳ Uploading...</span>}
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Project Title</label>
                <PremiumInput
                  type="text"
                  placeholder="e.g. Student Management System" 
                  value={project.title}
                  onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                />
              </div>
              <div style={{ ...styles.inputGroup, marginBottom: 0 }}>
                <label style={styles.inputLabel}>Description</label>
                <PremiumTextarea
                  style={{ minHeight: '80px' }}
                  placeholder="e.g. A comprehensive system for tracking student data built with React and Node.js..."
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                />
              </div>
            </div>
          ))}
        <AddButton
          onClick={() => {
            setPortfolioData({
              ...portfolioData,
              projects: [
                ...(portfolioData.projects || []),
                { id: Date.now(), title: 'New Project', description: '', techStack: [], image: '' },
              ],
            });
          }}
        >
          + Add Another Project
        </AddButton>
      </div>

      {/* Education */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Education</h3>
        {portfolioData.education &&
          portfolioData.education.map((edu, index) => (
            <div key={edu.id} style={styles.itemCard}>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Institution</label>
                <PremiumInput
                  type="text"
                  placeholder="e.g. Government College of Engineering, Bodinayakanur"
                  value={edu.institution}
                  onChange={(e) => handleEduChange(index, 'institution', e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ ...styles.inputGroup, flex: 2, minWidth: '140px', marginBottom: 0 }}>
                  <label style={styles.inputLabel}>Degree</label>
                  <PremiumInput
                    type="text"
                    placeholder="e.g. B.E. Computer Science and Engineering"
                    value={edu.degree}
                    onChange={(e) => handleEduChange(index, 'degree', e.target.value)}
                  />
                </div>
                <div style={{ ...styles.inputGroup, flex: 1, minWidth: '100px', marginBottom: 0 }}>
                  <label style={styles.inputLabel}>Score/CGPA</label>
                  <PremiumInput
                    type="text"
                    placeholder="e.g. 8.48 CGPA"
                    value={edu.score}
                    onChange={(e) => handleEduChange(index, 'score', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        <AddButton
          onClick={() => {
            setPortfolioData({
              ...portfolioData,
              education: [
                ...(portfolioData.education || []),
                { id: Date.now(), institution: 'New Institution', degree: '', score: '' },
              ],
            });
          }}
        >
          + Add Education
        </AddButton>
      </div>

      {/* Skills */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Core Skills</h3>
        <div style={{ ...styles.inputGroup, marginBottom: 0 }}>
          <label style={styles.inputLabel}>Comma Separated List</label>
          <PremiumInput
            type="text"
            value={(portfolioData.skills || []).join(', ')}
            placeholder="e.g. React, Node.js, Python"
            onChange={(e) => {
              const skillsArray = e.target.value.split(',').map((skill) => skill.trim());
              setPortfolioData({ ...portfolioData, skills: skillsArray });
            }}
          />
        </div>
      </div>

      {/* Social Links */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Social Links</h3>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>GitHub URL</label>
          <PremiumInput
            type="text"
            placeholder="https://github.com/username"
            value={portfolioData.socials?.github || ''}
            onChange={(e) =>
              setPortfolioData({
                ...portfolioData,
                socials: { ...portfolioData.socials, github: e.target.value },
              })
            }
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>LinkedIn URL</label>
          <PremiumInput
            type="text"
            placeholder="https://linkedin.com/in/username"
            value={portfolioData.socials?.linkedin || ''}
            onChange={(e) =>
              setPortfolioData({
                ...portfolioData,
                socials: { ...portfolioData.socials, linkedin: e.target.value },
              })
            }
          />
        </div>
        <div style={{ ...styles.inputGroup, marginBottom: 0 }}>
          <label style={styles.inputLabel}>Email Address</label>
          <PremiumInput
            type="email"
            placeholder="you@example.com"
            value={portfolioData.socials?.email || ''}
            onChange={(e) =>
              setPortfolioData({
                ...portfolioData,
                socials: { ...portfolioData.socials, email: e.target.value },
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BuilderForm;