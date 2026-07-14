import type { Project } from './types';

export const pad = (n: number): string => String(n).padStart(2, '0');

/* ---------- fila de proyecto (done | wip) ---------- */

interface DayRowProps {
  project: Project;
  onHoverStart: (project: Project) => void;
  onHoverEnd: () => void;
}

export function DayRow({ project, onHoverStart, onHoverEnd }: DayRowProps) {
  const { num, name, tag, status, url } = project;
  return (
    <a
      href={url}
      className={`day day--${status}`}
      onMouseEnter={() => onHoverStart(project)}
      onMouseLeave={onHoverEnd}
      onFocus={() => onHoverStart(project)}
      onBlur={onHoverEnd}
    >
      <span className="d-num">{pad(num)}</span>
      <span className="d-name">
        {name}
        <span className="d-tag">{tag}</span>
      </span>
      <span className="d-status">
        <span className="dot" />
        {status === 'done' ? 'COMPLETED' : 'EN PROGRESO'}
      </span>
      <span className="d-arrow">→</span>
      <span className="divider" />
    </a>
  );
}

/* ---------- teaser bloqueado ---------- */

export function LockedRow({ num }: { num: number }) {
  return (
    <div className="day day--locked">
      <span className="d-num">{pad(num)}</span>
      <span className="d-name">
        ?????
        <span className="d-tag">PRÓXIMO EN LA LISTA</span>
      </span>
      <span className="d-status">PRÓXIMAMENTE</span>
      <span className="d-arrow">→</span>
      <span className="divider" />
    </div>
  );
}

/* ---------- resumen de días restantes ---------- */

export function RestRow({ remaining }: { remaining: number }) {
  if (remaining <= 0) return null;
  return (
    <div className="rest">
      <span className="r-txt">
        <b>+{remaining} builds</b> por delante — sin fecha límite
      </span>
      <span className="r-dots" aria-hidden="true">
        {Array.from({ length: remaining }, (_, i) => (
          <i key={i} />
        ))}
      </span>
      <span className="divider" />
    </div>
  );
}
