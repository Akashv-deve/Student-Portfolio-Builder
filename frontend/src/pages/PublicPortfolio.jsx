import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SoftwareEngineer from '../templates/SoftwareEngineer';

const PublicPortfolio = () => {
  // 1. Grab the custom slug from the URL (e.g., 'akash-v')
  const { slug } = useParams(); 
  
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 2. Fetch the data from your backend when the page loads
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/portfolio/${slug}`);
        
        if (!response.ok) {
          throw new Error('Portfolio not found');
        }

        const dbData = await response.json();

        // 3. Map the database structure back to what the template expects
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
          } : {}
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

  // 4. Handle Loading and Error states gracefully
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

  // 5. Render the template fullscreen!
  return (
    <div style={{ height: '100vh', width: '100vw', overflowY: 'auto', backgroundColor: '#1e1e1e' }}>
      <SoftwareEngineer data={portfolioData} />
    </div>
  );
};

export default PublicPortfolio;