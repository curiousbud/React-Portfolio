import React from 'react';
import CONFIG from '../../gitprofile.config';

const Certifications: React.FC = () => {
  const certifications = CONFIG.certifications || [];
  if (!certifications.length) return null;
  return (
    <section id="certifications" className="certifications-section pt-4 pb-4">
      <h2 className="text-2xl font-bold text-(--icon-color) mb-2 border-b border-(--icon-color) pb-1 text-center">Certifications</h2>
      <div className="flex flex-col gap-4 mt-4">
        {certifications.map((cert, idx) => (
          <div key={idx} className="bg-gray-800 rounded p-4 shadow">
            <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-(--primary-color)">{cert.name}</a>
            <div className="text-sm text-(--icon-color)">{cert.body} &bull; {cert.year}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
