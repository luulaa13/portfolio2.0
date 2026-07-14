export type ProjectStatus = 'done' | 'wip';

export interface Project {
  /** Número de build (1–30) */
  num: number;
  name: string;
  /** Contexto corto: stack, tiempo, aprendizaje… */
  tag: string;
  status: ProjectStatus;
  url: string;
  /** Captura estática para el preview flotante (opcional) */
  thumb?: string;
  /** Vídeo-loop mudo para el preview (prioridad sobre thumb). 4–6s, <1MB, sin audio */
  video?: string;
}

export interface BuildDetail extends Project {
  /** Tagline corta que acompaña al título */
  tagline: string;
  /** Mes/fecha de publicación, ej. 'JUL 2026' */
  date: string;
  /** Stack como chips, ej. ['REACT','GSAP','CSS'] */
  stack: string[];
  liveUrl: string;
  repoUrl?: string;
  /** Bloque 01 — qué es y por qué lo elegiste (párrafos) */
  what: string[];
  /** Bloque 02 — la decisión clave: título + párrafos */
  decision: { title: string; body: string[] };
  /** Bloque 03 — lo aprendido: título + párrafos */
  learned: { title: string; body: string[] };
}
