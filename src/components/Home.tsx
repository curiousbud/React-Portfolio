
import React from 'react';
import { useFadeInSection } from '../hooks/useFadeInSection';
import CONFIG from '../../gitprofile.config';
import '../assets/css/index.css';

const AboutMe: React.FC = () => {
  const { description, email, profileImage } = CONFIG.aboutMe || {};
  const intro = description || "Hi! I'm Areeb. A creative Frontend Developer with 3+ years of experience in building high-performance, scalable, and responsive web solutions.";
  // stats removed
  const contactEmail = email || 'akareeb662@gmail.com';
  const [ref, isVisible] = useFadeInSection<HTMLElement>();
  return (
    <section
      id="home"
      ref={ref}
      className={`about-me-section pt-4 pb-4 h-full flex items-center justify-center bg-(--background-color) fade-in-section${isVisible ? ' is-visible' : ''}`}
    >
      <div className="w-full  px-4 md:px-5 flex flex-row items-center justify-between gap-2 relative">
        {/* Email: left, flush to edge and fully visible */}
        <span
          className=" md:flex relative left-0 top-0 -rotate-270 origin-left text-(--icon-color) text-sm  whitespace-nowrap z-50 pl-2"
          style={{ letterSpacing: '0.1em' }}
        >
          {contactEmail}
        </span>
        {/* Left column: profile image */}
        <div className="hidden md:flex flex-col items-center justify-center min-w-[100px] ml-2 mr-10">
          {profileImage && (
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-full object-cover shadow-lg"
              style={{ minWidth: '10rem', minHeight: '10rem', width: '30rem', height: '30rem' }}
            />
          )}
        </div>
        {/* Center column: headline, intro, button */}
        <div className="flex-1 flex flex-col items-start justify-center min-w-[300px]">
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-4">
            <span className="block text-(--primary-color)">AREEB</span>
            <span className="block text-(--icon-color)">KHAN</span>
          </h1>
          <p className="text-lg text-(--icon-color) mb-8 max-w-xl text-left md:text-justify">
            {intro}
          </p>
          <a
            href="#contact"
            className="bg-(--primary-color) hover:bg-(--icon-color) hover:text-black text-(--icon-color) font-bold py-3 px-8 rounded transition-colors duration-200 shadow-lg text-lg "
          >
            HIRE ME
          </a>
        </div>
        {/* Right column removed */}
      </div>
    </section>
  );
};

export default AboutMe;
// ...existing code...
