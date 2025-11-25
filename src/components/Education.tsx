import React from 'react';
import CONFIG from '../../gitprofile.config';

const Education: React.FC = () => {
  const educations = CONFIG.educations || [];
  if (!educations.length) return null;
  return (
    <section id="education" className="education-section pt-4 pb-4">
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

export default Education;
