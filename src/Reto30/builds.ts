import type { BuildDetail } from './types';

/* =========================================================
   DETALLE DE CADA BUILD — uno por página.
   Los textos (name, tagline, what, decision, learned) viven
   en reto30.builds.<slug> dentro de src/locales/{es,en}.json.
   ========================================================= */

export const BUILDS: BuildDetail[] = [
  {
    num: 1,
    slug: 'vena-viva',
    status: 'done',
    url: '/build-log/vena-viva',
    date: 'JUL 2026',
    stack: ['REACT', 'GSAP + SCROLLTRIGGER', 'CSS', 'VERCEL'],
    liveUrl: 'https://vena-viva.vercel.app/',
    repoUrl: 'https://github.com/luulaa13/vena-viva',
    instagramUrl: 'https://www.instagram.com/p/Da2cLbiiO7_/?igsh=ZTJ2OWVxbzNwdnI=',
  },
];

export const getBuildByNum = (num: number): BuildDetail | undefined =>
  BUILDS.find((b) => b.num === num);
