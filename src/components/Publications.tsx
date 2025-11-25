/**
 * Publications Section
 * Renders a list of publications from sanitized config.
 * Section is hidden (display: none) if no publications are present.
 */
import React from 'react';
import CONFIG from '../utils/sanitizeConfig';

interface Publication {
  title: string;
  link: string;
  journal: string;
  year: string;
}

const Publications: React.FC = () => {
  const publications: Publication[] = CONFIG.publications || [];
  const sectionStyle = !publications.length ? { display: 'none' } : undefined;
  return (
    <section id="publications" className="publications-section pt-4 pb-4" style={sectionStyle}>
      <h2 className="text-2xl font-bold text-(--icon-color) mb-2 border-b border-(--icon-color) pb-1 text-center">Publications</h2>
      <div className="flex flex-col gap-4 mt-4">
        {publications.map((pub, idx) => (
          <div key={idx} className="bg-gray-800 rounded p-4 shadow">
            <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-(--primary-color)">{pub.title}</a>
            <div className="text-sm text-(--icon-color)">{pub.journal} &bull; {pub.year}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

Publications.displayName = 'PublicationsSection';
export default Publications;
