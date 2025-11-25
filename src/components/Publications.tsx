import React from 'react';
import CONFIG from '../../gitprofile.config';

const Publications: React.FC = () => {
  const publications = CONFIG.publications || [];
  if (!publications.length) return null;
  return (
    <section id="publications" className="publications-section pt-4 pb-4">
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

export default Publications;
