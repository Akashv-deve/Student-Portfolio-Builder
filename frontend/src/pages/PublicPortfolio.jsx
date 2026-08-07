import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SoftwareEngineer from '../templates/SoftwareEngineer';
import FrontendDeveloper from '../templates/FrontendDeveloper';
import UIUXDesigner from '../templates/UIUXDesigner';

const PublicPortfolio = () => {
  const { slug } = useParams(); 
  
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/portfolio/${slug}`);
        
        if (!response.ok) {
          throw new Error('Portfolio not found');
        }

        const dbData = await response.json();

        // 👇 WE JUST ADD THE TEMPLATE LINE TO YOUR EXISTING mappedData OBJECT
        const mappedData = {
          personal: {
            name: dbData.personalInfo?.fullName || '',
            role: dbData.personalInfo?.role || '',
            bio: dbData.personalInfo?.bio || '',
          },
          projects: Array.isArray(dbData.projects) ? dbData.projects : [],
          education: Array.isArray(dbData.education) ? dbData.education : [],
          skills: Array.isArray(dbData.skills) ? dbData.skills.filter(Boolean) : [],
          socials: dbData.socials && typeof dbData.socials === 'object' ? {
            github: dbData.socials.github || '',
            linkedin: dbData.socials.linkedin || '',
            email: dbData.socials.email || ''
          } : {},
          template: dbData.template || "Software Engineer Portfolio" // 👈 Added this line!
        };

        setPortfolioData(mappedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1e1e1e', color: '#fff' }}>
        <h2>Loading portfolio...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1e1e1e', color: '#f07178' }}>
        <h2>Error: {error}. Are you sure this URL is correct?</h2>
      </div>
    );
  }

  // 👇 UPDATE THIS TO USE YOUR portfolioData STATE
  return (
    <>
      {portfolioData.template === "Frontend Developer Portfolio" ? (
        <FrontendDeveloper data={portfolioData} />
        ) : portfolioData.template === "UI/UX Designer Portfolio" ? (
        <UIUXDesigner portfolioData={portfolioData} />
      ) : (
        <SoftwareEngineer data={portfolioData} />
      )}
    </>
  );
};

export default PublicPortfolio;