/**
 * About Me Section
 * Renders the About Me section using sanitized config.
 * Section is hidden (display: none) if both header and description are empty.
 */
import React from 'react';

import CONFIG from '../utils/sanitizeConfig';
const AboutMe: React.FC = () => {
  const { header, description } = CONFIG.aboutMe || {};
  const isEmpty = !header && !description;
  if (isEmpty) return null;
  return (
    <section id="about" data-section="AboutMeSection" className="about-me pt-4 pb-4 flex flex-col justify-center items-center snap-start px-4 md:px-0">
      <div className="">
        {header && <h1 className='border-b border-(--clr) text-4xl'>{header}</h1>}
        {description && (
          <h2 className="text-2xl md:text-xl font-light text-left mb-8 text-(--icon-color)" style={{lineHeight: '1.1'}}>
            {description}
          </h2>
        )}
      </div>
    </section>
  );
};

export default AboutMe;