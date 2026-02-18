
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  fullDetails: string;
  github?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export enum SectionId {
  HERO = 'hero',
  ABOUT = 'about',
  EXPERIENCE = 'experience',
  PROJECTS = 'projects',
  SKILLS = 'skills',
  TESTIMONIALS = 'testimonials',
  CONTACT = 'contact'
}
