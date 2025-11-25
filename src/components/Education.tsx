/**
 * Education Section
 * Renders a list of education entries from sanitized config.
 * Section is hidden (display: none) if no educations are present.
 */
import React from 'react';
import CONFIG from '../utils/sanitizeConfig';

interface EducationType {
  institution: string;
  degree: string;
  year: string;
  details?: string;
}

const Education: React.FC = () => {
  const educations: EducationType[] = CONFIG.educations || [];
  const sectionStyle = !educations.length ? { display: 'none' } : undefined;
  return (
    <section id="education" className="education-section pt-4 pb-4" style={sectionStyle}>
      <h2 className="text-2xl font-bold text-(--icon-color) mb-2 border-b border-(--icon-color) pb-1 text-center">Education</h2>
      <div className="flex flex-col gap-4 mt-4">
        {educations.map((edu, idx) => (
          <div key={idx} className="bg-gray-800 rounded p-4 shadow">
            <div className="text-lg font-semibold text-(--primary-color)">{edu.institution}</div>
            <div className="text-sm text-(--icon-color)">{edu.degree} &bull; {edu.year}</div>
            {edu.details && <div className="text-xs text-gray-400 mt-1">{edu.details}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

Education.displayName = 'EducationSection';
export default Education;
