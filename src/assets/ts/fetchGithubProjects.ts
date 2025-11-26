export interface GithubProject {
  id: string;
  name: string;
  description: string;
  url: string;
  [key: string]: unknown;
}

import CONFIG from '../../../gitprofile.config';



export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage?: { name: string; color: string };
  isFork?: boolean;
  updatedAt?: string;
}


export async function fetchGithubProjects(): Promise<Project[]> {
  const username = CONFIG.github.username;
  const mode = CONFIG.projects.github.mode || 'automatic';
  const autoConfig = CONFIG.projects.github.automatic;
  const manualConfig = CONFIG.projects.github.manual;

  const response = await fetch('/.netlify/functions/github-projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, mode, autoConfig, manualConfig })
  });
  const data = await response.json();
  if (mode === 'manual' && manualConfig.projects && manualConfig.projects.length > 0) {
    // Manual mode: flatten repos from root-level keys (repo0, repo1, ...)
    const repos: Project[] = Object.values(data.data)
      .filter((repo: unknown): repo is Project => {
        return (
          typeof repo === 'object' &&
          repo !== null &&
          'id' in repo &&
          'name' in repo &&
          'description' in repo &&
          'url' in repo &&
          'stargazerCount' in repo &&
          'forkCount' in repo
        );
      })
      .map((repo) => ({
        id: (repo as Project).id,
        name: (repo as Project).name,
        description: (repo as Project).description,
        url: (repo as Project).url,
        stargazerCount: (repo as Project).stargazerCount,
        forkCount: (repo as Project).forkCount,
        primaryLanguage: (repo as Project).primaryLanguage,
        isFork: (repo as Project).isFork,
        updatedAt: (repo as Project).updatedAt,
      }));
    return repos;
  } else {
    // Automatic mode: get from user.repositories.nodes
    return (data.data.user.repositories.nodes as Project[]);
  }
}
