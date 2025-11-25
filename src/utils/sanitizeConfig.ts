// src/utils/sanitizeConfig.ts
// Utility to sanitize and normalize the CONFIG object for safe, consistent use in all components.
import rawConfig from '../../gitprofile.config';


// Deep clone and sanitize the config object
function sanitizeConfig(config: any): any {
  // Provide defaults for all optional fields and filter empty arrays/objects
  return {
    ...config,
    projects: config.projects || {},
    skills: Array.isArray(config.skills) ? config.skills.filter(Boolean) : [],
    experiences: Array.isArray(config.experiences) ? config.experiences.filter(Boolean) : [],
    certifications: Array.isArray(config.certifications) ? config.certifications.filter(Boolean) : [],
    educations: Array.isArray(config.educations) ? config.educations.filter(Boolean) : [],
    publications: Array.isArray(config.publications) ? config.publications.filter(Boolean) : [],
    social: config.social || {},
    seo: config.seo || {},
    resume: config.resume || {},
    googleAnalytics: config.googleAnalytics || {},
    hotjar: config.hotjar || {},
    blog: config.blog || {},
    themeConfig: config.themeConfig || {},
    home: config.home || {},
    aboutMe: config.aboutMe || {},
    footer: config.footer || '',
    enablePWA: typeof config.enablePWA === 'boolean' ? config.enablePWA : false,
  };
}

const CONFIG = sanitizeConfig(rawConfig);
export default CONFIG;
