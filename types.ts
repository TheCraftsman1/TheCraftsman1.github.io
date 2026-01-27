
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  fullDetails: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export enum SectionId {
  HERO = 'hero',
  ABOUT = 'about',
  PROJECTS = 'projects',
  STATS = 'stats',
  OFF_TRACK = 'off-track',
  CONTACT = 'contact'
}
