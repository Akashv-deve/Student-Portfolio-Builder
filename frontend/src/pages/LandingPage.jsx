import React from 'react';
// Importing your layout components
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Footer from '../components/Footer';

const LandingPage = () => { 
  return (
    <div className="landing-page-container" style={{ backgroundColor: '#f4f4f5', minHeight: '100vh' }}>
      <Navbar />
      
      {/* Just render the Hero directly, it handles its own button now! */}
      <Hero /> 

      <Skills />
      <Projects />
      <Education />
      <Footer />
    </div>
  );
};

export default LandingPage;