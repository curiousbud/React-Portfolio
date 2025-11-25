// import { useState } from 'react'
import './assets/css/App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';


function App() {
  return (
    <div className="app-container min-h-screen flex flex-col m-1 p-1">
      <Navbar />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App
