import React from 'react';
// Fix the import paths to go up one folder to reach components
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Footer from '../components/Footer';

const LandingPage = ({ setIsBuilderOpen }) => {

  // --- VIEW 2: THE LANDING PAGE ---
  return (
    <div className="landing-page">
      <Navbar />
      <Hero onGetStarted={() => setIsBuilderOpen(true)} />
      <Skills />
      <Projects />
      <Education />
      <Footer />
    </div>
  );
  
};

export default LandingPage;