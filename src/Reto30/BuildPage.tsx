import { useLayoutEffect, useRef, type ElementType } from 'react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { BuildDetail, Project } from './types';
import { TOTAL_BUILDS } from './projects';
import { pad } from './DayRow';
import './BuildPage.css';

gsap.registerPlugin(ScrollTrigger);

interface BuildPageProps {
  build: BuildDetail;
  /** Ruta de vuelta al listado del reto */
  backHref?: string;
  /**
   * Build anterior/siguiente si existen (para la nav inferior).
   * Vienen de PROJECTS, no de BUILDS: así el nav puede nombrar un build
   * aunque todavía no tenga página propia (status 'wip', url '#').
   */
  prev?: Project;
  next?: Project;
  /** Componente de enlace del router para navegación interna SPA. Ver README. */
  linkAs?: ElementType;
}

interface BuildContent {
  name: string;
  tag: string;
  tagline: string;
  what: string[];
  decision: { title: string; body: string[] };
  learned: { title: string; body: string[] };
}

export default function BuildPage({
  build,
  backHref = '/reto',
  prev,
  next,
  linkAs: LinkAs = 'a',
}: BuildPageProps) {
  const { t } = useTranslation();
  const root = useRef<HTMLDivElement>(null);

  const content = t(`reto30.builds.${build.slug}`, {
    returnObjects: true,
  }) as BuildContent;
  const prevName = prev
    ? (t(`reto30.projects.${prev.slug}.name`) as string)
    : undefined;
  const nextName = next
    ? (t(`reto30.projects.${next.slug}.name`) as string)
    : undefined;

  const [first, ...restName] = content.name.split(' ');

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
          <LinkAs href={backHref}>{t('reto30.buildPage.back')}</LinkAs>
          <span className="b-count">
            {t('reto30.buildPage.buildCountLabel', { num: pad(build.num) })}{' '}
            <b>{t('reto30.buildPage.buildCountTotal', { total: TOTAL_BUILDS })}</b>
          </span>
        </div>
      </div>

      <header className="b-hero">
        <div className="wrap">
          <div className="b-chips">
            <span className={`chip chip--${build.status}`}>
              <span className="dot" />
              {t(build.status === 'done' ? 'reto30.status.done' : 'reto30.status.wip')}
            </span>
            <span className="chip chip--meta">{build.date}</span>
            <span className="chip chip--meta">{content.tag}</span>
          </div>
          <h1 className="b-title" aria-label={content.name}>
            <span className="row"><span>{first}</span></span>
            {restName.length > 0 && (
              <span className="row"><span>{restName.join(' ')}</span></span>
            )}
          </h1>
          <p className="b-tagline">{content.tagline}</p>
          <div className="b-ctas">
            <a className="btn btn--primary" href={build.liveUrl} target="_blank" rel="noopener noreferrer">
              {t('reto30.buildPage.ctaLive')}
            </a>
            {build.repoUrl && (
              <a className="btn btn--ghost" href={build.repoUrl} target="_blank" rel="noopener noreferrer">
                {t('reto30.buildPage.ctaRepo')}
              </a>
            )}
            {build.instagramUrl && (
              <a className="btn btn--ghost" href={build.instagramUrl} target="_blank" rel="noopener noreferrer">
                {t('reto30.buildPage.ctaInstagram')}
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
              {t('reto30.buildPage.browserOpen')}
            </a>
          </div>
          <iframe
            src={build.liveUrl}
            title={t('reto30.buildPage.iframeTitle', { name: content.name }) as string}
            loading="lazy"
          />
        </div>
        <p className="browser-note">
          {t('reto30.buildPage.browserNote')}
        </p>
      </section>

      <section className="blocks">
        <div className="wrap">
          <div className="block">
            <div className="bk-num">01<em>{t('reto30.buildPage.blockWhatLabel')}</em></div>
            <div>
              <h2>{t('reto30.buildPage.blockWhatHeading', { name: content.name })}</h2>
              {content.what.map((p, i) => (<p key={i}>{p}</p>))}
              <div className="stack-row">
                {build.stack.map((s) => (<span key={s}>{s}</span>))}
              </div>
            </div>
          </div>

          <div className="block">
            <div className="bk-num">02<em>{t('reto30.buildPage.blockDecisionLabel')}</em></div>
            <div>
              <h2>{content.decision.title}</h2>
              {content.decision.body.map((p, i) => (<p key={i}>{p}</p>))}
            </div>
          </div>

          <div className="block">
            <div className="bk-num">03<em>{t('reto30.buildPage.blockLearnedLabel')}</em></div>
            <div>
              <h2>{content.learned.title}</h2>
              {content.learned.body.map((p, i) => (<p key={i}>{p}</p>))}
            </div>
          </div>
        </div>
      </section>

      <nav className="b-nav">
        <div className="wrap b-nav-grid">
          {prev ? (
            <LinkAs href={prev.url}>
              <span className="label">{t('reto30.buildPage.navPrevLabel', { num: pad(prev.num) })}</span>
              <span className="n-name">{prevName}</span>
            </LinkAs>
          ) : (
            <div className="first">
              <span className="label">{t('reto30.buildPage.navFirstLabel')}</span>
              <span className="n-note">{t('reto30.buildPage.navFirstNote')}</span>
            </div>
          )}
          {next ? (
            <LinkAs className="right" href={next.url}>
              <span className="label">{t('reto30.buildPage.navNextLabel', { num: pad(next.num) })}</span>
              <span className="n-name">{nextName}</span>
            </LinkAs>
          ) : (
            <div className="locked">
              <span className="label">{t('reto30.buildPage.navNextLabel', { num: pad(build.num + 1) })}</span>
              <span className="n-name">{t('reto30.buildPage.navLockedName')}</span>
            </div>
          )}
        </div>
      </nav>

      <footer>
        <div className="wrap foot-inner">
          <span className="label">{t('reto30.buildPage.footerLeft', { total: TOTAL_BUILDS })}</span>
          <span className="label">
            {t('reto30.buildPage.footerRight', { num: pad(build.num), name: content.name.toUpperCase() })}
          </span>
        </div>
      </footer>
    </div>
  );
}
