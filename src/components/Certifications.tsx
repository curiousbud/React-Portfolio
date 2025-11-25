/**
 * Certifications Section
 * Renders a list of certifications from sanitized config.
 * Section is hidden (display: none) if no certifications are present.
 */
import React from 'react';
import CONFIG from '../utils/sanitizeConfig';

interface Certification {
  name: string;
  body: string;
  year: string;
  link: string;
}

const Certifications: React.FC = () => {
  const certifications: Certification[] = CONFIG.certifications || [];
  const sectionStyle = !certifications.length ? { display: 'none' } : undefined;
  return (
    <section id="certifications" className="certifications-section pt-4 pb-4" style={sectionStyle}>
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

Certifications.displayName = 'CertificationsSection';
export default Certifications;
