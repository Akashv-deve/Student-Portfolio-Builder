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
    personal: { name: "", role: "", bio: "", avatar: "" },
    selectedTemplate: "Software Engineer Portfolio",
    projects: [],
    education: [],
    skills: [],
    socials: {
      github: "",
      linkedin: "",
      email: ""
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