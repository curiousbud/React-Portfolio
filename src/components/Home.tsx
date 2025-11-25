/**
 * Home Section
 * Renders the home/intro section using sanitized config.
 * Section is hidden (display: none) if all fields are empty.
 */

import React from 'react';
import { useFadeInSection } from '../hooks/useFadeInSection';
import CONFIG from '../utils/sanitizeConfig';
import '../assets/css/index.css';


const Home: React.FC = () => {
  const { firstName, lastName, headline, description, email, profileImage } = CONFIG.home || {};
  const displayFirstName = firstName || '';
  const displayLastName = lastName || '';
  const displayHeadline = headline || '';
  const intro = description || '';
  const contactEmail = email || '';
  const [ref, isVisible] = useFadeInSection<HTMLElement>();
  // If all fields are empty, hide the section
  const isEmpty = !displayFirstName && !displayLastName && !displayHeadline && !intro && !contactEmail && !profileImage;
  const sectionStyle = isEmpty ? { display: 'none' } : undefined;
  return (
    <section
      id="home"
      ref={ref}
      className={`about-me-section pt-4 pb-4 h-full flex items-center justify-center bg-(--background-color) fade-in-section${isVisible ? ' is-visible' : ''}`}
      style={sectionStyle}
    >
      <div className="w-full  px-4 md:px-5 flex flex-row items-center justify-between gap-2 relative">
        {/* Email: left, flush to edge and fully visible */}
        {contactEmail && (
          <span
            className=" md:flex relative left-0 top-0 -rotate-270 origin-left text-(--icon-color) text-sm  whitespace-nowrap z-50 pl-2"
            style={{ letterSpacing: '0.1em' }}
          >
            {contactEmail}
          </span>
        )}
        {/* Left column: profile image */}
        {profileImage && (
          <div className="hidden md:flex flex-col items-center justify-center min-w-[100px] ml-2 mr-10">
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-full object-cover shadow-lg"
              style={{ minWidth: '10rem', minHeight: '10rem', width: '30rem', height: '30rem' }}
            />
          </div>
        )}
        {/* Center column: headline, intro, button */}
        <div className="flex-1 flex flex-col items-start justify-center min-w-[300px]">
          {(displayFirstName || displayLastName) && (
            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-2">
              {displayFirstName && <span className="block text-(--primary-color)">{displayFirstName}</span>}
              {displayLastName && <span className="block text-(--icon-color)">{displayLastName}</span>}
            </h1>
          )}
          {displayHeadline && <h2 className="text-2xl font-semibold text-(--icon-color) mb-4">{displayHeadline}</h2>}
          {intro && (
            <p className="text-lg text-(--icon-color) mb-8 max-w-xl text-left md:text-justify">
              {intro}
            </p>
          )}
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

Home.displayName = 'HomeSection';
export default Home;
// ...existing code...
