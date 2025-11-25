// import { useState } from 'react'
import './assets/css/App.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/ContactMe';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Publications from './components/Publications';
import { SystemTerminal } from './components/SystemTerminal';
// import AboutMe from './components/AboutMe';



function App() {
  const [showStartup, setShowStartup] = useState(false);
  const navigate = useNavigate();

  const handlePowerClick = () => {
    setShowStartup(true);
  };

  const handleStartupComplete = () => {
    setShowStartup(false);
    navigate('/terminal');
  };

  return (
    <div className="app-container min-h-screen flex flex-col m-1 p-1">
      <Navbar />
      <main className="flex-1 pt-16 overflow-y-auto h-screen">
        <section>
          <Home />
        </section>
        {/* <section className="min-h-screen flex items-center justify-center>
          <AboutMe />
        </section> */}
        <section>
          <Education />
        </section>
        <section>
          <Certifications />
        </section>
        <section>
          <Skills />
        </section>
        <section>
          <Projects />
        </section>
        <section>
          <Experience />
        </section>
        <section>
          <Publications />
        </section>
        <section>
          <Contact />
        </section>
      </main>
      <Footer onPowerClick={handlePowerClick} />
      {showStartup && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
          <SystemTerminal initialMode="startup" onStartupComplete={handleStartupComplete} />
        </div>
      )}
    </div>
  );
}

export default App
