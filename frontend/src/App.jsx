import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';

// Import your pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import PublicPortfolio from './pages/PublicPortfolio';

function App() {
  // 1. We removed 'isBuilderOpen' because React Router handles navigation now.
  
  // 2. Your state stays exactly the same so the Dashboard works perfectly
  const [portfolioData, setPortfolioData] = useState({
    personal: { name: "Akash V", role: "", bio: "" },
    selectedTemplate: "Software Engineer Portfolio",
    projects: [
      {
        id: 1,
        title: "Student Management System",
        description: "A comprehensive system for tracking student data.",
        techStack: ["React", "Node.js"]
      },
      {
        id: 2,
        title: "Income Prediction Model",
        description: "Machine learning model predicting income brackets based on demographic data.",
        techStack: ["Python", "Machine Learning"]
      }
    ],
    education: [
      {
        id: 1,
        institution: "Government College of Engineering, Bodinayakanur",
        degree: "B.E. Computer Science and Engineering",
        score: "8.48 CGPA"
      }
    ],
    skills: ["React", "Node.js", "Machine Learning", "Python", "SQL"],
    socials: {
      github: "https://github.com/Akashv-deve",
      linkedin: "https://linkedin.com/in/yourprofile",
      email: "hello@example.com"
    }
  });

  // 3. React Router takes over!
  return (
    <Router>
      <Routes>
        {/* Route 1: The Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Route 2: The Builder Workspace */}
        <Route 
          path="/dashboard" 
          element={
            <Dashboard 
              portfolioData={portfolioData} 
              setPortfolioData={setPortfolioData} 
              // Notice we removed setIsBuilderOpen here!
            />
          } 
        />
        <Route path="/auth" element={<Auth />} />
        
        {/* Route 3: The NEW Live Public Portfolio Route */}
        {/* The :slug means it will dynamically match anything like /akash-v */}
        <Route path="/:slug" element={<PublicPortfolio />} /> 
      </Routes>
    </Router>
  );
}

export default App;