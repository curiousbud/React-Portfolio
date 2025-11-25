import CONFIG from '../../../gitprofile.config';

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

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

  if (mode === 'manual' && manualConfig.projects && manualConfig.projects.length > 0) {
    // Manual mode: fetch only the listed repos
    const repoNames: string[] = manualConfig.projects;
    const queries = repoNames.map((fullName, i) => {
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
    const query = `query { ${queries.join('\n')} }`;
    const res = await fetch(GITHUB_GRAPHQL_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });
    const json = await res.json();
    if (json.errors) throw new Error(json.errors[0].message);
    // Flatten the repos from the response
    const repos: Project[] = Object.values(json.data);
    return repos;
  } else {
    // Automatic mode
    const limit = autoConfig.limit || 8;
    const sortBy = autoConfig.sortBy || 'stars';
    const excludeForks = autoConfig.exclude?.forks;
    const excludeProjects: string[] = autoConfig.exclude?.projects || [];

    // Determine orderBy field based on sortBy
    const orderByField = sortBy === 'updated' ? 'UPDATED_AT' : 'STARGAZERS';
    const query = `
      query($login: String!, $limit: Int!) {
        user(login: $login) {
          repositories(first: $limit, orderBy: {field: ${orderByField}, direction: DESC}, privacy: PUBLIC) {
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
              owner { login }
            }
          }
        }
      }
    `;

    const res = await fetch(GITHUB_GRAPHQL_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables: { login: username, limit },
      }),
    });
    const json = await res.json();
    if (json.errors) throw new Error(json.errors[0].message);
    let repos: Project[] = json.data.user.repositories.nodes;
    // Exclude forks if needed
    if (excludeForks) {
      repos = repos.filter((repo: Project & { owner?: { login?: string } }) => !repo.isFork);
    }
    // Exclude by name (owner/name)
    if (excludeProjects.length > 0) {
      repos = repos.filter((repo: Project & { owner?: { login?: string } }) => {
        const fullName = `${repo.owner?.login || username}/${repo.name}`;
        return !excludeProjects.includes(fullName);
      });
    }
    // No need to sort locally, as the API already returns the correct order
    return repos;
  }
}
