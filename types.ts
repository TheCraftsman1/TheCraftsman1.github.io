import React from 'react';
import type { FolderFile, ArtPreset } from './components/ui/glass-folder-cards';

/**
 * Strict Project Interface with full architectural and pipeline metadata
 */
export interface ProjectItem {
  readonly id: string;
  readonly number: string;
  readonly name: string;
  readonly type: string;
  readonly metrics: string;
  readonly image: string;
  readonly href: string;
  readonly architecture: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly folderImage?: string;
  readonly art?: ArtPreset;
  readonly seed?: number;
  readonly files?: readonly FolderFile[];
  readonly tagline?: string;
  readonly problem?: string;
  readonly solution?: string;
  readonly category?: string;
  readonly year?: string;
  readonly techStack?: readonly string[];
  readonly systemStack?: readonly { category: string; items: string }[];
  readonly artifactBadge?: string;
  readonly detailedMetrics?: readonly { label: string; value: string }[];
  readonly heroAspectRatio?: 'mobile' | 'landscape';
  readonly media?: readonly {
    type: 'image' | 'video';
    url: string;
    caption: string;
    tag?: string;
    aspectRatio?: 'mobile' | 'landscape';
  }[];
  readonly backgroundImage?: string;
  readonly slides?: readonly {
    title: string;
    subtitle?: string;
    desc: string;
    image?: string;
    tag?: string;
  }[];
}

/**
 * System and Creative Technology definition
 */
export interface TechItem {
  readonly name: string;
  readonly category: string;
  readonly icon: string;
  readonly accent: string;
  readonly tag?: string;
  readonly context?: string;
  readonly experience?: string;
}

/**
 * Shipped Archive Category discriminated union
 */
export type ArchiveCategory =
  | 'ALL'
  | 'Mobile & AI'
  | 'Core DSA'
  | 'DevSecOps Utility'
  | 'ML Tooling';

/**
 * Engineering Lab Archive item
 */
export interface ArchiveItem {
  readonly year: string;
  readonly title: string;
  readonly category: Exclude<ArchiveCategory, 'ALL'>;
  readonly description: string;
  readonly stack: readonly string[];
  readonly link: string;
  readonly highlight?: string;
  readonly badge?: string;
}

/**
 * Deep-dive Engineering Post-Mortem & Architecture Notes
 */
export interface EngineeringNote {
  readonly id: string;
  readonly tag: string;
  readonly readTime: string;
  readonly title: string;
  readonly summary: string;
  readonly challenge: string;
  readonly solution: string;
  readonly takeaway: string;
  readonly stack: readonly string[];
}

/**
 * About Section Milestones & Metrics
 */
export interface StatMetric {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
  readonly progress: number;
  readonly tooltip: string;
  readonly decimals: number;
  readonly icon: React.ReactNode;
}

/**
 * Capability-Driven Cluster definition
 */
export interface CapabilityCluster {
  readonly id: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly icon: React.ReactNode;
  readonly accent: string;
  readonly technologies: readonly {
    readonly name: string;
    readonly role: string;
    readonly icon: string;
    readonly accent: string;
  }[];
}

/**
 * Legacy Project Interface for backward-compatibility with deep-dive views
 */
export interface Project {
  id: string;
  title: string;
  tagline?: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  fullDetails: string;
  color?: string;
  year?: string;
  role?: string;
  liveUrl?: string;
  caseStudy?: {
    problem: string;
    architecture: string;
    metrics: string[];
    hardestPart?: string;
    proofNote?: string;
  };
  github?: string;
  pipeline?: {
    step: string;
    description: string;
  }[];
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
  CONTACT = 'contact',
  OFF_TRACK = 'off-track',
}
