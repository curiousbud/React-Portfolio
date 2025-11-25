// src/types/config.d.ts
// Global type definitions for config-driven portfolio

import type {
  Github,
  GitHubProjects,
  ExternalProjects,
  Projects,
  SEO,
  Social,
  Resume,
  Experience,
  Certification,
  Education,
  Publication,
  GoogleAnalytics,
  Hotjar,
  Blog,
  ThemeConfig,
  Config
} from '../../gitprofile/global.d';

declare global {
  type Github = Github;
  type GitHubProjects = GitHubProjects;
  type ExternalProjects = ExternalProjects;
  type Projects = Projects;
  type SEO = SEO;
  type Social = Social;
  type Resume = Resume;
  type Experience = Experience;
  type Certification = Certification;
  type Education = Education;
  type Publication = Publication;
  type GoogleAnalytics = GoogleAnalytics;
  type Hotjar = Hotjar;
  type Blog = Blog;
  type ThemeConfig = ThemeConfig;
  type Config = Config;
}

export {};
