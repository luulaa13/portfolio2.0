import artmusHero from "../assets/artmus2.png";
import artmusShowcase from "../assets/next-showcase.png";

import nextHero from "../assets/next.png";
import nextShowcase from "../assets/next-showcase.png";

export interface Project {
  slug: string;

  number: string;

  heroImage: string;

  images: {
    showcase: string;
  };

  titleKey: string;
  subtitleKey: string;

  statementKey: string;
  challengeKey: string;
  researchKey: string;
  reflectionKey: string;

  year: string;
  duration: string;

  role: string[];
  tools: string[];

  nextProject: string;
}

export const projects: Project[] = [
  {
    slug: "artmus",

    number: "01",

    heroImage: artmusHero,

    images: {
      showcase: artmusShowcase,
    },

    titleKey: "caseStudies.artmus.title",
    subtitleKey: "caseStudies.artmus.subtitle",

    statementKey: "caseStudies.artmus.statement",
    challengeKey: "caseStudies.artmus.challenge",
    researchKey: "caseStudies.artmus.research",
    reflectionKey: "caseStudies.artmus.reflection",

    year: "2025",
    duration: "3",

    role: [
      "UX/UI",
      "Branding",
      "Frontend",
    ],

    tools: [
      "Figma",
      "React Native",
      "TypeScript",
      "GSAP",
    ],

    nextProject: "next",
  },

  {
    slug: "next",

    number: "02",

    heroImage: nextHero,

    images: {
      showcase: nextShowcase,
    },

    titleKey: "caseStudies.next.title",
    subtitleKey: "caseStudies.next.subtitle",

    statementKey: "caseStudies.next.statement",
    challengeKey: "caseStudies.next.challenge",
    researchKey: "caseStudies.next.research",
    reflectionKey: "caseStudies.next.reflection",

    year: "2026",
    duration: "6",

    role: [
      "UX/UI",
      "Research",
      "Frontend",
      "Branding",
    ],

    tools: [
      "Figma",
      "React Native",
      "TypeScript",
      "GSAP",
      "Tally",
    ],

    nextProject: "artmus",
  },
];