import type { BuildDetail } from './types';

/* =========================================================
   DETALLE DE CADA BUILD — uno por página.
   Los bloques `decision` y `learned` de Vena Viva son una
   guía: sustitúyelos por tu experiencia real.
   ========================================================= */

export const BUILDS: BuildDetail[] = [
  {
    num: 1,
    name: 'Vena Viva',
    tag: 'REACT · GSAP · CSS',
    status: 'done',
    url: '/build-log/vena-viva',
    tagline:
      'Tres manantiales, un origen trazable. Landing conceptual para una marca de agua premium — un ejercicio de dirección de arte y animación scroll-driven.',
    date: 'JUL 2026',
    stack: ['REACT', 'GSAP + SCROLLTRIGGER', 'CSS', 'VERCEL'],
    liveUrl: 'https://vena-viva.vercel.app/',
    // repoUrl: 'https://github.com/tu-usuario/vena-viva',
    what: [
      'Vena Viva es una landing conceptual para una marca de agua premium construida sobre una idea: la trazabilidad como argumento de marca. Tres manantiales, cada uno con su carácter, y un recorrido que lleva al visitante desde la roca hasta la botella.',
      'Lo elegí como primer build porque une las tres patas del reto: dirección de arte (el mundo visual de cada manantial), frontend (React + GSAP con scroll-driven animation) y narrativa de producto (contar un origen es contar una propuesta de valor).',
    ],
    decision: {
      title: '[ Personaliza: tu decisión clave ]',
      body: [
        'Una sola decisión de diseño o técnica, contada con honestidad: cómo estructuraste los tres manantiales con ScrollTrigger, por qué pin + scrub en vez de animaciones por viewport, cómo resolviste el rendimiento de algún efecto, o qué descartaste y por qué.',
        'Formato sugerido: el problema en una frase → lo que probaste → lo que elegiste y su trade-off.',
      ],
    },
    learned: {
      title: '[ Personaliza: qué te llevas ]',
      body: [
        'Una o dos frases honestas — técnicas, de proceso o de criterio. Es lo que convierte el reto en una historia de progresión y no en una lista de enlaces.',
      ],
    },
  },
];

export const getBuildByNum = (num: number): BuildDetail | undefined =>
  BUILDS.find((b) => b.num === num);
