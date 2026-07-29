// Master Portfolio State
  const [portfolioData, setPortfolioData] = useState({
    personal: { name: "", role: "", bio: "" },
    selectedTemplate: "Software Engineer Portfolio",
    projects: [
      {
        id: 1,
        title: "Student Management System",
        description: "A comprehensive system for tracking student data.",
        techStack: ["React", "Node.js"]
      }
    ],
    // ADD THIS NEW EDUCATION ARRAY
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

  // State to track which template is currently being hovered for the preview
  const [hoveredTemplate, setHoveredTemplate] = useState(null);