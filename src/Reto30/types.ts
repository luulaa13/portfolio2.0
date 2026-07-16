export type ProjectStatus = 'done' | 'wip';

export interface Project {
  /** Número de build (1–30) */
  num: number;
  /** Clave i18n: name/tag viven en reto30.projects.<slug> */
  slug: string;
  status: ProjectStatus;
  url: string;
  /** Captura estática para el preview flotante (opcional) */
  thumb?: string;
  /** Vídeo-loop mudo para el preview (prioridad sobre thumb). 4–6s, <1MB, sin audio */
  video?: string;
}

export interface BuildDetail extends Project {
  /** Mes/fecha de publicación, ej. 'JUL 2026' */
  date: string;
  /** Stack como chips, ej. ['REACT','GSAP','CSS'] */
  stack: string[];
  liveUrl: string;
  repoUrl?: string;
  instagramUrl?: string;
}
