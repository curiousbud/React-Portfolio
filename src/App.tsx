// import { useState } from 'react'
import './assets/css/App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/ContactMe';
import AboutMe from './components/AboutMe';


function App() {
  return (
    <div className="app-container min-h-screen flex flex-col m-1 p-1">
      <Navbar />
      <main className="flex-1 pt-16 overflow-y-auto h-screen">
        <section>
          <Home />
        </section>
        <section>
          <AboutMe />
        </section>
        <section className="min-h-screen flex items-center justify-center">
          <Skills />
        </section>
        <section className="min-h-screen flex items-center justify-center">
          <Projects />
        </section>
        <section className="min-h-screen flex items-center justify-center">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App
