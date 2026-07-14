import { useLayoutEffect, useMemo, useRef, type ElementType } from 'react';
import gsap from 'gsap';
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

  /* ---------- hover → preview ---------- */
  const handleHoverStart = (p: Project) => preview.current?.show(p);
  const handleHoverEnd = () => preview.current?.hide();

  return (
    <div className="reto30" ref={root}>
      <header>
        <div className="wrap">
          <div className="head-eyebrow">
            <span className="label">RETO PERSONAL</span>
            <span className="label">2026 — EN CURSO</span>
            <span className="label label--accent">30 BUILDS · SIN FECHA LÍMITE</span>
          </div>
          <h1 className="head-title" aria-label="30 builds, a mi ritmo">
            <span className="row"><span>30 builds,</span></span>
            <span className="row"><span className="acc">a mi ritmo.</span></span>
          </h1>
          <p className="head-sub">
            Treinta productos pequeños: diseñados, construidos y publicados.
            <b> Sin fecha límite y sin perfeccionismo</b> — el reto es
            terminarlos, no correr.
          </p>
          <div className="progress">
            <div className="big">
              <span ref={doneCountEl}>0</span>
              <span className="of"> / {TOTAL_BUILDS}</span>
            </div>
            <div className="p-track"><div className="p-fill" /></div>
            <span className="p-pct">
              <span ref={pctEl}>0</span>% DEL RETO
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
          <span className="label">RETO 30 BUILDS — PORTFOLIO 2026</span>
          <span className="label">ACTUALIZADO CON CADA BUILD</span>
        </div>
      </footer>
    </div>
  );
}
