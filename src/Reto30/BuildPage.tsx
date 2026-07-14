import { useLayoutEffect, useRef, type ElementType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { BuildDetail } from './types';
import { TOTAL_BUILDS } from './projects';
import { pad } from './DayRow';
import './BuildPage.css';

gsap.registerPlugin(ScrollTrigger);

interface BuildPageProps {
  build: BuildDetail;
  /** Ruta de vuelta al listado del reto */
  backHref?: string;
  /** Build anterior/siguiente si existen (para la nav inferior) */
  prev?: BuildDetail;
  next?: BuildDetail;
  /** Componente de enlace del router para navegación interna SPA. Ver README. */
  linkAs?: ElementType;
}

export default function BuildPage({
  build,
  backHref = '/reto',
  prev,
  next,
  linkAs: LinkAs = 'a',
}: BuildPageProps) {
  const root = useRef<HTMLDivElement>(null);
  const [first, ...restName] = build.name.split(' ');

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro
        .to('.b-title .row span', { y: 0, duration: 1.1, stagger: 0.1 })
        .to('.b-tagline', { opacity: 1, y: 0, duration: 0.9 }, '-=.55')
        .to('.b-ctas', { opacity: 1, y: 0, duration: 0.8 }, '-=.5')
        .to('.browser', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=.35');
      gsap.utils.toArray<HTMLElement>('.block').forEach((b) => {
        gsap.to(b, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: b, start: 'top 85%', once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [build.num]);

  const host = new URL(build.liveUrl).host;

  return (
    <div className="buildpage" ref={root}>
      <div className="topbar">
        <div className="wrap topbar-inner">
          <LinkAs href={backHref}>← VOLVER AL RETO</LinkAs>
          <span className="b-count">
            BUILD {pad(build.num)} <b>/ {TOTAL_BUILDS}</b>
          </span>
        </div>
      </div>

      <header className="b-hero">
        <div className="wrap">
          <div className="b-chips">
            <span className={`chip chip--${build.status}`}>
              <span className="dot" />
              {build.status === 'done' ? 'COMPLETED' : 'EN PROGRESO'}
            </span>
            <span className="chip chip--meta">{build.date}</span>
            <span className="chip chip--meta">{build.tag}</span>
          </div>
          <h1 className="b-title" aria-label={build.name}>
            <span className="row"><span>{first}</span></span>
            {restName.length > 0 && (
              <span className="row"><span>{restName.join(' ')}</span></span>
            )}
          </h1>
          <p className="b-tagline">{build.tagline}</p>
          <div className="b-ctas">
            <a className="btn btn--primary" href={build.liveUrl} target="_blank" rel="noopener noreferrer">
              Ver en vivo ›
            </a>
            {build.repoUrl && (
              <a className="btn btn--ghost" href={build.repoUrl} target="_blank" rel="noopener noreferrer">
                Repositorio
              </a>
            )}
          </div>
        </div>
      </header>

      <section className="wrap">
        <div className="browser">
          <div className="bar">
            <span className="dots"><i /><i /><i /></span>
            <span className="url">{host}</span>
            <a className="open" href={build.liveUrl} target="_blank" rel="noopener noreferrer">
              ABRIR ↗
            </a>
          </div>
          <iframe src={build.liveUrl} title={`${build.name} — sitio en vivo`} loading="lazy" />
        </div>
        <p className="browser-note">
          SITIO REAL EMBEBIDO — INTERACTÚA CON ÉL, O ÁBRELO A PANTALLA COMPLETA ↗
        </p>
      </section>

      <section className="blocks">
        <div className="wrap">
          <div className="block">
            <div className="bk-num">01<em>EL QUÉ</em></div>
            <div>
              <h2>{build.name}: qué es y por qué.</h2>
              {build.what.map((p, i) => (<p key={i}>{p}</p>))}
              <div className="stack-row">
                {build.stack.map((s) => (<span key={s}>{s}</span>))}
              </div>
            </div>
          </div>

          <div className="block">
            <div className="bk-num">02<em>LA DECISIÓN</em></div>
            <div>
              <h2>{build.decision.title}</h2>
              {build.decision.body.map((p, i) => (<p key={i}>{p}</p>))}
            </div>
          </div>

          <div className="block">
            <div className="bk-num">03<em>LO APRENDIDO</em></div>
            <div>
              <h2>{build.learned.title}</h2>
              {build.learned.body.map((p, i) => (<p key={i}>{p}</p>))}
            </div>
          </div>
        </div>
      </section>

      <nav className="b-nav">
        <div className="wrap b-nav-grid">
          {prev ? (
            <LinkAs href={prev.url}>
              <span className="label">← BUILD ANTERIOR · {pad(prev.num)}</span>
              <span className="n-name">{prev.name}</span>
            </LinkAs>
          ) : (
            <div className="first">
              <span className="label">← BUILD ANTERIOR</span>
              <span className="n-note">Este es el primero — no hay camino atrás, solo adelante.</span>
            </div>
          )}
          {next ? (
            <LinkAs className="right" href={next.url}>
              <span className="label">SIGUIENTE BUILD · {pad(next.num)}</span>
              <span className="n-name">{next.name}</span>
            </LinkAs>
          ) : (
            <div className="locked">
              <span className="label">SIGUIENTE BUILD · {pad(build.num + 1)}</span>
              <span className="n-name">?????</span>
            </div>
          )}
        </div>
      </nav>

      <footer>
        <div className="wrap foot-inner">
          <span className="label">RETO {TOTAL_BUILDS} BUILDS — PORTFOLIO 2026</span>
          <span className="label">BUILD {pad(build.num)} · {build.name.toUpperCase()}</span>
        </div>
      </footer>
    </div>
  );
}
