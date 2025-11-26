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

  const { username, mode, manualConfig } = JSON.parse(event.body || '{}');

  let query = '';
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
    query = `query {
      user(login: "${username}") {
        repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
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
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
