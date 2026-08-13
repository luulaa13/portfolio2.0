export interface DiarioEntry {
  slug: string;
  /** ISO date (YYYY-MM-DD) — se usa para calcular la racha semanal. */
  date: string;
  title: string;
  body: string[];
}

export const DIARIO_ENTRIES: DiarioEntry[] = [
  {
    slug: "empezando-creative-founder",
    date: "2026-08-06",
    title: "Empieza el programa",
    body: [
      "Hoy arranco un programa para construirme como creative founder. Empieza por la fase de product engineer, así que antes de nada toca eso: construir, tomar decisiones de producto y aprender a sostenerlas.",
      "La idea de este diario es ir dejando constancia del proceso completo — no solo lo que construyo, sino el porqué de cada decisión y los problemas con los que me voy encontrando por el camino.",
      "Todavía no tengo un plan cerrado ni sé exactamente cómo va a verse esto dentro de unos meses. Por ahora el compromiso es simple: escribir según avance, sin pulir de más.",
    ],
  },
];

export const getDiarioEntryBySlug = (slug: string): DiarioEntry | undefined =>
  DIARIO_ENTRIES.find((e) => e.slug === slug);

const MONTHS_ES = [
  "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
  "JUL", "AGO", "SEP", "OCT", "NOV", "DIC",
];

export const formatDiarioDate = (iso: string): string => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS_ES[m - 1]} ${y}`;
};
