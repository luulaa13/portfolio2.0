import { DIARIO_ENTRIES } from "./entries";

/** Fecha de inicio del programa — cada 7 días desde aquí cuenta como una semana. */
export const PROGRAM_START = "2026-08-06";

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const toMs = (iso: string): number => new Date(`${iso}T00:00:00`).getTime();

const weekIndex = (iso: string): number =>
  Math.floor((toMs(iso) - toMs(PROGRAM_START)) / WEEK_MS);

/**
 * Racha de semanas consecutivas con al menos un envío, contando hacia atrás
 * desde hoy. La semana en curso no rompe la racha hasta que termina.
 */
export function getWeeklyStreak(today: Date = new Date()): number {
  const weeksWithEntry = new Set(DIARIO_ENTRIES.map((e) => weekIndex(e.date)));

  let week = Math.floor((today.getTime() - toMs(PROGRAM_START)) / WEEK_MS);
  if (!weeksWithEntry.has(week)) week -= 1;

  let streak = 0;
  while (weeksWithEntry.has(week)) {
    streak++;
    week--;
  }
  return streak;
}
