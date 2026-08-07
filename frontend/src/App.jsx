import { useState } from 'react';

// Import your brand new pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

function App() {
  // 1. The state stays here so we can pass it down to both pages
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

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

  // 2. The Traffic Cop: If the builder is open, render the Dashboard view.
  if (isBuilderOpen) {
    return (
      <Dashboard 
        portfolioData={portfolioData} 
        setPortfolioData={setPortfolioData} 
        setIsBuilderOpen={setIsBuilderOpen} 
      />
    );
  }

  // 3. Otherwise, render the Landing Page by default!
  return (
    <LandingPage setIsBuilderOpen={setIsBuilderOpen} />
  );
}

export default App;