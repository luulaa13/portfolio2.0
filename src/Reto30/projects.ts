import type { Project } from './types';

export const TOTAL_BUILDS = 30;

/** Cuántos builds futuros se asoman como "?????" */
export const LOCKED_TEASERS = 2;

export const PROJECTS: Project[] = [
  {
    num: 1,
    name: 'Vena viva',
    tag: 'REACT · GSAP · CSS',
    status: 'done',
    url: '/build-log/vena-viva',
    // video: '/previews/vena-viva.mp4',  // loop mudo 4–6s del hero en vivo
    // thumb: '/previews/vena-viva.jpg',  // poster / fallback estático
  },
  {
    num: 2,
    name: 'Pausa Breve',
    tag: 'FIGMA · UX/UI· BRANDING',
    status: 'wip',
    url: '#',
    // video: '/previews/vena-viva.mp4',  // loop mudo 4–6s del hero en vivo
    // thumb: '/previews/vena-viva.jpg',  // poster / fallback estático
  },

];
