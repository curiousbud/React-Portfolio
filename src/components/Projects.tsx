import React, { useEffect, useState } from 'react';
import { useFadeInSection } from '../hooks/useFadeInSection';

import { fetchGithubProjects } from '../assets/ts/fetchGithubProjects';
import type { Project } from '../assets/ts/fetchGithubProjects';

const Projects: React.FC = () => {
    const [ref, isVisible] = useFadeInSection<HTMLElement>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGithubProjects()
      .then(setProjects)
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message || 'Failed to fetch projects');
        } else {
          setError('Failed to fetch projects');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" ref={ref} className={`projects-section py-16 fade-in-section${isVisible ? ' is-visible' : ''}`}>
      <h2 className="text-2xl font-bold text-(--icon-color) mb-2 border-b border-(--icon-color) pb-1 text-center">
        Projects
      </h2>
      {loading ? (
        <div>Loading projects...</div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 border rounded-lg shadow hover:shadow-lg transition bg-white dark:bg-gray-800"
            >
              <h3 className="font-semibold text-lg mb-1">{project.name}</h3>
              <p className="text-sm mb-2 text-gray-600 dark:text-gray-300">{project.description}</p>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <span className="mr-4">⭐ {project.stargazerCount}</span>
                <span className="mr-4">🍴 {project.forkCount}</span>
                {project.primaryLanguage && (
                  <span className="flex items-center">
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-1"
                      style={{ backgroundColor: project.primaryLanguage.color }}
                    ></span>
                    {project.primaryLanguage.name}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;