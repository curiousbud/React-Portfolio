// netlify/functions/github-projects.ts
import type { Handler } from '@netlify/functions';

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';

export const handler: Handler = async (event) => {
  const token = process.env.VITE_GITHUB_TOKEN;
  if (!token) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'GitHub token not set in environment.' })
    };
  }

  const {
    username,
    mode,
    manualConfig,
    automaticConfig,
    display = true,
  } = JSON.parse(event.body || '{}');

  let query = '';
  if (!display) {
    return {
      statusCode: 200,
      body: JSON.stringify({ data: { user: { repositories: { nodes: [] } } } }),
    };
  }

  if (mode === 'manual' && manualConfig?.projects?.length > 0) {
    const repoNames = manualConfig.projects;
    const queries = repoNames.map((fullName: string, i: number) => {
      const [owner, name] = fullName.split('/');
      return `repo${i}: repository(owner: "${owner}", name: "${name}") {
        id
        name
        description
        url
        stargazerCount
        forkCount
        primaryLanguage { name color }
        isFork
        updatedAt
      }`;
    });
    query = `query { ${queries.join('\n')} }`;
  } else {
    // Automatic mode: use config for sort, limit, exclude
    const sortBy = automaticConfig?.sortBy === 'updated' ? 'UPDATED_AT' : 'STARGAZERS';
    const limit = automaticConfig?.limit || 100;
    query = `query {
      user(login: "${username}") {
        repositories(first: ${limit}, orderBy: {field: ${sortBy}, direction: DESC}) {
          nodes {
            id
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage { name color }
            isFork
            updatedAt
          }
        }
      }
    }`;
  }

  const response = await fetch(GITHUB_GRAPHQL_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();

  // Post-process results for exclude.forks and exclude.projects in automatic mode
  if (mode !== 'manual' && automaticConfig) {
    type RepoNode = {
      id: string;
      name: string;
      description: string;
      url: string;
      stargazerCount: number;
      forkCount: number;
      primaryLanguage?: { name: string; color: string };
      isFork?: boolean;
      updatedAt?: string;
    };
    let nodes: RepoNode[] = data?.data?.user?.repositories?.nodes || [];
    // Exclude forks if set
    if (automaticConfig.exclude?.forks) {
      nodes = nodes.filter((repo: RepoNode) => !repo.isFork);
    }
    // Exclude specific projects
    if (automaticConfig.exclude?.projects?.length) {
      const excludeSet = new Set(automaticConfig.exclude.projects.map((p: string) => p.toLowerCase()));
      nodes = nodes.filter((repo: RepoNode) => !excludeSet.has(`${username.toLowerCase()}/${repo.name.toLowerCase()}`));
    }
    // Limit to config limit
    if (automaticConfig.limit && nodes.length > automaticConfig.limit) {
      nodes = nodes.slice(0, automaticConfig.limit);
    }
    data.data.user.repositories.nodes = nodes;
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
