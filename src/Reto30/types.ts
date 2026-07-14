export type ProjectStatus = 'done' | 'wip';

export interface Project {
  /** Número de build (1–30) */
  num: number;
  name: string;
  /** Contexto corto: stack, tiempo, aprendizaje… */
  tag: string;
  status: ProjectStatus;
  url: string;
  /** Ruta a la captura para el preview flotante (opcional) */
  thumb?: string;
}
