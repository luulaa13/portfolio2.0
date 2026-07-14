
import type { ElementType } from 'react';
import { useTranslation } from 'react-i18next';
import type { Project } from './types';

export const pad = (n: number): string => String(n).padStart(2, '0');

/* ---------- fila de proyecto (done | wip) ---------- */

interface DayRowProps {
  project: Project;
  onHoverStart: (project: Project) => void;
  onHoverEnd: () => void;
  /**
   * Componente de enlace de tu router para navegación SPA sin recarga.
   * Debe aceptar `href` (adapta React Router con un wrapper de una línea
   * — ver README). Por defecto: <a> nativo.
   */
  linkAs?: ElementType;
}

export function DayRow({
  project,
  onHoverStart,
  onHoverEnd,
  linkAs: LinkAs = 'a',
}: DayRowProps) {
  const { t } = useTranslation();
  const { num, slug, status, url } = project;
  return (
    <LinkAs
      href={url}
      className={`day day--${status}`}
      onMouseEnter={() => onHoverStart(project)}
      onMouseLeave={onHoverEnd}
      onFocus={() => onHoverStart(project)}
      onBlur={onHoverEnd}
    >
      <span className="d-num">{pad(num)}</span>
      <span className="d-name">
        {t(`reto30.projects.${slug}.name`)}
        <span className="d-tag">{t(`reto30.projects.${slug}.tag`)}</span>
      </span>
      <span className="d-status">
        <span className="dot" />
        {t(status === 'done' ? 'reto30.status.done' : 'reto30.status.wip')}
      </span>
      <span className="d-arrow">→</span>
      <span className="divider" />
    </LinkAs>
  );
}

/* ---------- teaser bloqueado ---------- */

export function LockedRow({ num }: { num: number }) {
  const { t } = useTranslation();
  return (
    <div className="day day--locked">
      <span className="d-num">{pad(num)}</span>
      <span className="d-name">
        {t('reto30.lockedRow.name')}
        <span className="d-tag">{t('reto30.lockedRow.tag')}</span>
      </span>
      <span className="d-status">{t('reto30.status.locked')}</span>
      <span className="d-arrow">→</span>
      <span className="divider" />
    </div>
  );
}

/* ---------- resumen de días restantes ---------- */

export function RestRow({ remaining }: { remaining: number }) {
  const { t } = useTranslation();
  if (remaining <= 0) return null;
  return (
    <div className="rest">
      <span className="r-txt">
        <b>{t('reto30.restRow.bold', { count: remaining })}</b>{' '}
        {t('reto30.restRow.text')}
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
