/**
 * Experience Section
 * Renders a list of experience entries from sanitized config.
 * Section is hidden (display: none) if no experiences are present.
 */
import React from 'react';
import CONFIG from '../utils/sanitizeConfig';

interface ExperienceType {
  company: string;
  companyLink: string;
  position: string;
  from: string;
  to: string;
}

const Experience: React.FC = () => {
  const experiences: ExperienceType[] = CONFIG.experiences || [];
  const sectionStyle = !experiences.length ? { display: 'none' } : undefined;
  return (
    <section id="experience" className="experience-section pt-4 pb-4" style={sectionStyle}>
      <h2 className="text-2xl font-bold text-(--icon-color) mb-2 border-b border-(--icon-color) pb-1 text-center">Experience</h2>
      <div className="flex flex-col gap-4 mt-4">
        {experiences.map((exp, idx) => (
          <div key={idx} className="bg-gray-800 rounded p-4 shadow">
            <a href={exp.companyLink} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-(--primary-color)">{exp.company}</a>
            <div className="text-sm text-(--icon-color)">{exp.position} &bull; {exp.from} - {exp.to}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

Experience.displayName = 'ExperienceSection';
export default Experience;
