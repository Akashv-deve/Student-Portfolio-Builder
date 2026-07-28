import { useState } from 'react'

function App() {
  // This is the "Brain" of your builder. 
  // It holds the default state of the user's portfolio.
  const [portfolioData, setPortfolioData] = useState({
    personal: {
      name: "Akash V",
      role: "Full-Stack Developer",
      bio: "I build scalable web applications and hardware integrations."
    },
    socials: {
      github: "https://github.com/Akashv-deve",
      linkedin: "",
      email: ""
    },
    projects: [
      {
        id: 1,
        title: "Student Management System",
        description: "A comprehensive system for tracking student data.",
        techStack: ["React", "Node.js"]
      }
    ]
  });

  return (
    // The main container taking up the full screen height
    <div style={{ display: 'flex', height: '100vh', width: '100vw', fontFamily: 'sans-serif' }}>
      
      {/* LEFT PANE: The Builder Controls */}
      <div style={{ flex: 1, padding: '2rem', backgroundColor: '#f4f4f5', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Builder Controls</h2>
        <p>This is where our input forms will go.</p>
        
        {/* Quick test to show data binding */}
        <div style={{ marginTop: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
          <input 
            type="text" 
            value={portfolioData.personal.name}
            onChange={(e) => setPortfolioData({
              ...portfolioData, 
              personal: { ...portfolioData.personal, name: e.target.value }
            })}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
      </div>

      {/* RIGHT PANE: The Live Preview */}
      <div style={{ flex: 1, padding: '2rem', backgroundColor: '#ffffff', overflowY: 'auto', borderLeft: '2px solid #e4e4e7' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Live Preview</h2>
        
        {/* This side just reads the data from the state */}
        <div style={{ padding: '2rem', border: '1px dashed #ccc', borderRadius: '8px' }}>
          <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{portfolioData.personal.name}</h1>
          <h3 style={{ fontSize: '1.25rem', color: '#666', marginTop: '0.5rem' }}>{portfolioData.personal.role}</h3>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>{portfolioData.personal.bio}</p>
        </div>
      </div>

    </div>
  )
}

export default App