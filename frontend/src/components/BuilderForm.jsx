import React from 'react';

const BuilderForm = ({ portfolioData, setPortfolioData }) => {
  
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
    <div className="builder-form-container">
      {/* Premium CSS for Focus States & Animations */}
      <style>{`
        .builder-form-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .form-section {
          background: #ffffff;
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid #e4e4e7;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .form-section:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .section-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #18181b;
          margin-top: 0;
          margin-bottom: 1.5rem;
          border-bottom: 2px solid #f4f4f5;
          padding-bottom: 0.75rem;
        }
        .input-group {
          margin-bottom: 1.25rem;
        }
        .input-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #3f3f46;
          margin-bottom: 0.5rem;
        }
        .premium-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background-color: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-family: inherit;
          font-size: 0.95rem;
          color: #0f172a;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }
        .premium-input:focus {
          outline: none;
          background-color: #ffffff;
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
        }
        .premium-textarea {
          min-height: 100px;
          resize: vertical;
        }
        .btn-add {
          width: 100%;
          padding: 0.75rem;
          background-color: #f1f5f9;
          color: #334155;
          border: 2px dashed #cbd5e1;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-add:hover {
          background-color: #e2e8f0;
          border-color: #94a3b8;
          color: #0f172a;
        }
        .item-card {
          padding: 1rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          margin-bottom: 1rem;
        }
      `}</style>

      {/* Personal Info */}
      <div className="form-section">
        <h3 className="section-title">Personal Information</h3>
        <div className="input-group">
          <label className="input-label">Full Name</label>
          <input 
            className="premium-input"
            type="text" 
            placeholder="Enter your name"
            value={portfolioData.personal.name || ''}
            onChange={(e) => setPortfolioData({
              ...portfolioData, 
              personal: { ...portfolioData.personal, name: e.target.value }
            })}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Professional Role</label>
          <input 
            className="premium-input"
            type="text" 
            placeholder="e.g. Full-Stack Developer"
            value={portfolioData.personal.role || ''}
            onChange={(e) => setPortfolioData({
              ...portfolioData, 
              personal: { ...portfolioData.personal, role: e.target.value }
            })}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Short Bio</label>
          <textarea 
            className="premium-input premium-textarea"
            placeholder="Tell your story..."
            value={portfolioData.personal.bio || ''}
            onChange={(e) => setPortfolioData({
              ...portfolioData, 
              personal: { ...portfolioData.personal, bio: e.target.value }
            })}
          />
        </div>
      </div>

      {/* Projects */}
      <div className="form-section">
        <h3 className="section-title">Projects</h3>
        {portfolioData.projects && portfolioData.projects.map((project, index) => (
          <div key={project.id} className="item-card">
            <div className="input-group">
              <label className="input-label">Project Title</label>
              <input 
                className="premium-input"
                type="text" 
                value={project.title}
                onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
              />
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label className="input-label">Description</label>
              <textarea 
                className="premium-input premium-textarea"
                style={{ minHeight: '80px' }}
                value={project.description}
                onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button 
          className="btn-add"
          onClick={() => {
            setPortfolioData({
              ...portfolioData,
              projects: [
                ...(portfolioData.projects || []), 
                { id: Date.now(), title: "New Project", description: "", techStack: [] }
              ]
            });
          }}
        >
          + Add Another Project
        </button>
      </div>

      {/* Education */}
      <div className="form-section">
        <h3 className="section-title">Education</h3>
        {portfolioData.education && portfolioData.education.map((edu, index) => (
          <div key={edu.id} className="item-card">
            <div className="input-group">
              <label className="input-label">Institution</label>
              <input 
                className="premium-input"
                type="text" 
                value={edu.institution}
                onChange={(e) => handleEduChange(index, 'institution', e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="input-group" style={{ flex: 2, marginBottom: 0 }}>
                <label className="input-label">Degree</label>
                <input 
                  className="premium-input"
                  type="text" 
                  value={edu.degree}
                  onChange={(e) => handleEduChange(index, 'degree', e.target.value)}
                />
              </div>
              <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
                <label className="input-label">Score/CGPA</label>
                <input 
                  className="premium-input"
                  type="text" 
                  value={edu.score}
                  onChange={(e) => handleEduChange(index, 'score', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
        <button 
          className="btn-add"
          onClick={() => {
            setPortfolioData({
              ...portfolioData,
              education: [
                ...(portfolioData.education || []), 
                { id: Date.now(), institution: "New Institution", degree: "", score: "" }
              ]
            });
          }}
        >
          + Add Education
        </button>
      </div>

      {/* Skills */}
      <div className="form-section">
        <h3 className="section-title">Core Skills</h3>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">Comma Separated List</label>
          <input 
            className="premium-input"
            type="text" 
            value={(portfolioData.skills || []).join(', ')}
            placeholder="e.g. React, Node.js, Python"
            onChange={(e) => {
              const skillsArray = e.target.value.split(',').map(skill => skill.trim());
              setPortfolioData({ ...portfolioData, skills: skillsArray });
            }}
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="form-section">
        <h3 className="section-title">Social Links</h3>
        <div className="input-group">
          <label className="input-label">GitHub URL</label>
          <input 
            className="premium-input"
            type="text" 
            value={portfolioData.socials?.github || ''}
            onChange={(e) => setPortfolioData({
              ...portfolioData, 
              socials: { ...portfolioData.socials, github: e.target.value }
            })}
          />
        </div>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">Email Address</label>
          <input 
            className="premium-input"
            type="email" 
            value={portfolioData.socials?.email || ''}
            onChange={(e) => setPortfolioData({
              ...portfolioData, 
              socials: { ...portfolioData.socials, email: e.target.value }
            })}
          />
        </div>
      </div>

    </div>
  );
};

export default BuilderForm;