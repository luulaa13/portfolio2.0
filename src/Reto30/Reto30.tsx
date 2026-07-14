import { useLayoutEffect, useMemo, useRef, type ElementType } from 'react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS, TOTAL_BUILDS, LOCKED_TEASERS } from './projects';
import type { Project } from './types';
import { DayRow, LockedRow, RestRow } from './DayRow';
import { FloatingPreview, type FloatingPreviewHandle } from './FloatingPreview';
import './Reto30.css';

gsap.registerPlugin(ScrollTrigger);

interface Reto30Props {
  /** Componente de enlace del router (navegación SPA). Ver README. */
  linkAs?: ElementType;
}

export default function Reto30({ linkAs }: Reto30Props = {}) {
  const { t } = useTranslation();
  const root = useRef<HTMLDivElement>(null);
  const doneCountEl = useRef<HTMLSpanElement>(null);
  const pctEl = useRef<HTMLSpanElement>(null);
  const preview = useRef<FloatingPreviewHandle>(null);

  /* ---------- estado derivado de los datos ---------- */
  const { doneCount, pct, lockedNums, remaining } = useMemo(() => {
    const done = PROJECTS.filter((p) => p.status === 'done').length;
    const locked: number[] = [];
    for (let i = 0; i < LOCKED_TEASERS; i++) {
      const n = PROJECTS.length + 1 + i;
      if (n <= TOTAL_BUILDS) locked.push(n);
    }
    return {
      doneCount: done,
      pct: Math.round((done / TOTAL_BUILDS) * 100),
      lockedNums: locked,
      remaining: TOTAL_BUILDS - PROJECTS.length - locked.length,
    };
  }, []);

  /* ---------- GSAP: intro + reveals ---------- */
  useLayoutEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduced) return; // el CSS deja todo visible por defecto

    const ctx = gsap.context(() => {
      /* intro del header */
      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro
        .to('.head-title .row span', { y: 0, duration: 1.1, stagger: 0.1 })
        .to('.head-sub', { opacity: 1, y: 0, duration: 0.9 }, '-=.55')
        .to('.progress', { opacity: 1, duration: 0.8 }, '-=.5')
        .to(
          '.p-fill',
          { width: `${pct}%`, duration: 1.4, ease: 'power3.inOut' },
          '-=.4'
        );
      if (doneCountEl.current)
        intro.to(
          doneCountEl.current,
          { innerText: doneCount, duration: 1.2, snap: { innerText: 1 }, ease: 'power2.out' },
          '<'
        );
      if (pctEl.current)
        intro.to(
          pctEl.current,
          { innerText: pct, duration: 1.2, snap: { innerText: 1 }, ease: 'power2.out' },
          '<'
        );

      /* reveal de filas + divisores */
      gsap.utils.toArray<HTMLElement>('.day, .rest').forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 34,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 90%', once: true },
        });
        const divider = row.querySelector('.divider');
        if (divider)
          gsap.to(divider, {
            scaleX: 1,
            duration: 1,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: row, start: 'top 88%', once: true },
          });
      });
    }, root);

    return () => ctx.revert();
  }, [doneCount, pct]);

  /* ---------- hover → preview (solo builds terminados) ---------- */
  const handleHoverStart = (p: Project) => {
    if (p.status === 'done') preview.current?.show(p);
  };
  const handleHoverEnd = () => preview.current?.hide();

  return (
    <div className="reto30" ref={root}>
      <header>
        <div className="wrap">
          <div className="head-eyebrow">
            <span className="label">{t('reto30.header.eyebrowLine1')}</span>
            <span className="label">{t('reto30.header.eyebrowLine2')}</span>
            <span className="label label--accent">{t('reto30.header.eyebrowLine3')}</span>
          </div>
          <h1 className="head-title" aria-label={t('reto30.header.titleAriaLabel') as string}>
            <span className="row"><span>{t('reto30.header.titleLine1')}</span></span>
            <span className="row"><span className="acc">{t('reto30.header.titleLine2')}</span></span>
          </h1>
          <p className="head-sub">
            {t('reto30.header.subBefore')}
            <b> {t('reto30.header.subBold')}</b> {t('reto30.header.subAfter')}
          </p>
          <div className="progress">
            <div className="big">
              <span ref={doneCountEl}>0</span>
              <span className="of"> {t('reto30.header.progressOf', { total: TOTAL_BUILDS })}</span>
            </div>
            <div className="p-track"><div className="p-fill" /></div>
            <span className="p-pct">
              <span ref={pctEl}>0</span>{t('reto30.header.progressPercent')}
            </span>
          </div>
        </div>
      </header>

      <main className="lista">
        <div className="wrap">
          {PROJECTS.map((p) => (
            <DayRow
              key={p.num}
              project={p}
              linkAs={linkAs}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
            />
          ))}
          {lockedNums.map((n) => (
            <LockedRow key={n} num={n} />
          ))}
          <RestRow remaining={remaining} />
        </div>
      </main>

      <FloatingPreview ref={preview} />

      <footer>
        <div className="wrap foot-inner">
          <span className="label">{t('reto30.footer.left', { total: TOTAL_BUILDS })}</span>
          <span className="label">{t('reto30.footer.right')}</span>
        </div>
      </footer>
    </div>
  );
}
