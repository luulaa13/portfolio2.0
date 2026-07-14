import { Fragment, useEffect, useRef, useState, type JSX } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NextIntro from "./NextIntro";
import CaseStudyNavbar from "./CaseStudyNavbar";
import nextLogo from "../../assets/next-logo.png";
import phoneHero from "../../assets/phoneHero-next.png";
import "../../components/style/ProjectPage.css";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// El frame mide 3.6/1, así que 36 columnas x 10 filas da celdas cuadradas
const identidadGridCols = Array.from(
  { length: 35 },
  (_, i) => ((i + 1) / 36) * 100
);
const identidadGridRows = Array.from(
  { length: 9 },
  (_, i) => ((i + 1) / 10) * 100
);

// Colores de relleno por fila — constante de diseño, no traducible
const identidadColorFills = [
  [{ pct: 70, color: "#293032" }],
  [{ pct: 20, color: "#F2F1E9" }],
  [
    { pct: 3, color: "#B3FF00" },
    { pct: 2, color: "#FF5C34" },
  ],
];

type CaidaCard = { title: string; percent: number; phrase: string };
type PaisajeCard = {
  title: string;
  subtitle: string;
  phrase: string;
  footer: string;
  detail: string;
};
type SiguientePasoLine = { text: string; accent?: boolean };
type SiguientePasoCard = { number: string; title: string; detail: string };
type GridColumn = { title: string; detail: string };
type ColorRow = { label: string; value: string };

export default function NextPage(): JSX.Element {
  const { t } = useTranslation();
  const [introDone, setIntroDone] = useState(false);
  const metaSectionRef = useRef<HTMLElement | null>(null);
  const caidaSectionRef = useRef<HTMLElement | null>(null);
  const caidaCardsRef = useRef<HTMLDivElement | null>(null);
  const paisajeSectionRef = useRef<HTMLElement | null>(null);
  const paisajeTrackRef = useRef<HTMLDivElement | null>(null);
  const siguientePasoSectionRef = useRef<HTMLElement | null>(null);
  const siguientePasoStatementRef = useRef<HTMLDivElement | null>(null);
  const identidadSectionRef = useRef<HTMLElement | null>(null);
  const identidadGridFrameRef = useRef<HTMLDivElement | null>(null);
  const identidadLogoMarkRef = useRef<HTMLImageElement | null>(null);
  const identidadColorRowsRef = useRef<HTMLDivElement | null>(null);
  const identidadToneCardsRef = useRef<HTMLDivElement | null>(null);
  const identidadMisuseCardsRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const hero = t("caseStudies.next.hero", { returnObjects: true }) as {
    tags: string[];
    caseLabel: string;
    logoAlt: string;
    headline: string;
    headlineHighlight: string;
    bodyLine1: string;
    bodyLine2: string;
    bodyLine3: string;
    scrollLabel: string;
    phoneAlt: string;
  };

  const meta = t("caseStudies.next.meta", { returnObjects: true }) as {
    number: string;
    title: string;
    eyebrow: string;
    description: string;
    role: { label: string; value: string };
    research: { label: string; value: string };
    deliverables: { label: string; value: string };
    territory: { label: string; value: string };
  };

  const caida = t("caseStudies.next.caida", { returnObjects: true }) as {
    number: string;
    title: string;
    eyebrow: string;
    lede: string;
    cards: CaidaCard[];
    quoteText: string;
    quoteAttribution: string;
  };

  const paisaje = t("caseStudies.next.paisaje", { returnObjects: true }) as {
    number: string;
    title: string;
    eyebrow: string;
    cards: PaisajeCard[];
  };

  const siguientePaso = t("caseStudies.next.siguientePaso", {
    returnObjects: true,
  }) as {
    number: string;
    title: string;
    eyebrow: string;
    lines: SiguientePasoLine[];
    attribution: string;
    cards: SiguientePasoCard[];
  };

  const identidad = t("caseStudies.next.identidad", {
    returnObjects: true,
  }) as {
    number: string;
    title: string;
    eyebrow: string;
    lede: string;
    logo: {
      subhead: string;
      title: string;
      text: string;
      gridColumns: GridColumn[];
    };
    color: {
      subhead: string;
      title: string;
      text: string;
      rows: ColorRow[];
      contrastBefore: string;
      contrastPass: string;
      contrastMiddle: string;
      contrastAfter: string;
    };
    tone: {
      subhead: string;
      title: string;
      text: string;
      doLabel: string;
      dontLabel: string;
      doPhrases: string[];
      dontPhrases: string[];
    };
    misuse: {
      subhead: string;
      title: string;
      labels: string[];
      logoAlt: string;
    };
  };


  const ending = t("caseStudies.artmus.ending", {
    returnObjects: true,
  }) as {
    heroLine1: string;
    heroConnector: string;
    heroAccent: string;
    ticketTitle: string;
    ticketSubtitle: string;
    nextLabel: string;
    nextDescription: string;
  };


  const identidadColorRows = identidad.color.rows.map((row, i) => ({
    ...row,
    fills: identidadColorFills[i],
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Crossfade del fondo/texto al pasar de LA META a LA CAÍDA
      gsap.to(metaSectionRef.current, {
        backgroundColor: "#F2F1E9",
        color: "#17191A",
        ease: "none",
        scrollTrigger: {
          trigger: metaSectionRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Entrada del encabezado de LA CAÍDA
      gsap.fromTo(
        caidaSectionRef.current?.querySelectorAll(
          ".chapter-divider, .chapter-heading"
        ) ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: caidaSectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Entrada de las tarjetas + conteo de porcentaje
      if (caidaCardsRef.current) {
        const cards = caidaCardsRef.current.querySelectorAll(".caida-card");

        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: caidaCardsRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );

        const counters =
          caidaCardsRef.current.querySelectorAll<HTMLSpanElement>(
            ".caida-card-percent-num"
          );

        counters.forEach((counter) => {
          const target = Number(counter.dataset.percent);

          gsap.fromTo(
            counter,
            { textContent: 0 },
            {
              textContent: target,
              duration: 1.4,
              ease: "power2.out",
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: caidaCardsRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );
        });
      }

      // Crossfade del fondo/texto al pasar de LA CAÍDA a EL PAISAJE
      gsap.to(caidaSectionRef.current, {
        backgroundColor: "#17191A",
        color: "#F2F1E9",
        ease: "none",
        scrollTrigger: {
          trigger: caidaSectionRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Entrada del encabezado de EL PAISAJE
      gsap.fromTo(
        paisajeSectionRef.current?.querySelectorAll(
          ".chapter-divider, .chapter-heading"
        ) ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: paisajeSectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Scroll horizontal pineado de las tarjetas de EL PAISAJE
      // (solo en desktop; en mobile es un carrusel táctil nativo, ver CSS)
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        if (!paisajeSectionRef.current || !paisajeTrackRef.current) return;
        const track = paisajeTrackRef.current;

        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: paisajeSectionRef.current,
            start: "top top",
            end: () => "+=" + (track.scrollWidth - window.innerWidth),
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      });

      mm.add("(max-width: 768px)", () => {
        if (!paisajeTrackRef.current) return;
        gsap.set(paisajeTrackRef.current, { clearProps: "x" });
      });

      // Entrada del encabezado de EL SIGUIENTE PASO
      gsap.fromTo(
        siguientePasoSectionRef.current?.querySelectorAll(
          ".chapter-divider, .chapter-heading"
        ) ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: siguientePasoSectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Las líneas de la frase van cogiendo su color/opacidad al llegar
      if (siguientePasoStatementRef.current) {
        const lines = siguientePasoStatementRef.current.querySelectorAll(
          ".siguiente-paso-line"
        );

        gsap.fromTo(
          lines,
          { opacity: 0.25 },
          {
            opacity: 1,
            stagger: 0.15,
            ease: "none",
            scrollTrigger: {
              trigger: siguientePasoStatementRef.current,
              start: "top 75%",
              end: "bottom 55%",
              scrub: true,
            },
          }
        );
      }

      // Entrada del encabezado y el texto de LA IDENTIDAD
      gsap.fromTo(
        identidadSectionRef.current?.querySelectorAll(
          ".chapter-divider, .chapter-heading, .chapter-lede, .identidad-subhead, .identidad-subtitle, .identidad-subtext"
        ) ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: identidadSectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // El rectángulo se abre en grid y el logo sube y encaja en él
      if (identidadGridFrameRef.current) {
        const frame = identidadGridFrameRef.current;
        const lines = frame.querySelectorAll(".identidad-grid-line");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: frame,
            start: "top 75%",
            once: true,
          },
        });

        tl.fromTo(
          frame,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" }
        )
          .fromTo(
            lines,
            { scaleX: 0, scaleY: 0 },
            {
              scaleX: 1,
              scaleY: 1,
              duration: 0.6,
              stagger: 0.06,
              ease: "power2.out",
            },
            "-=0.3"
          )
          .fromTo(
            identidadLogoMarkRef.current,
            { y: 220, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: "back.out(1.4)" },
            "-=0.2"
          );
      }

      // Entrada de las 4 columnas debajo del rectángulo
      gsap.fromTo(
        identidadSectionRef.current?.querySelectorAll(".identidad-grid-col") ??
          [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: identidadGridFrameRef.current,
            start: "bottom 85%",
            once: true,
          },
        }
      );

      // Cada barra se rellena de su color hasta el porcentaje indicado
      if (identidadColorRowsRef.current) {
        const fills = identidadColorRowsRef.current.querySelectorAll(
          ".identidad-color-fill"
        );

        gsap.fromTo(
          fills,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: identidadColorRowsRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Entrada de la nota de contraste
      gsap.fromTo(
        identidadSectionRef.current?.querySelectorAll(".identidad-contrast") ??
          [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: identidadColorRowsRef.current,
            start: "bottom 85%",
            once: true,
          },
        }
      );

      // Entrada de las cards de tono de voz, y sus frases suben detrás
      if (identidadToneCardsRef.current) {
        const container = identidadToneCardsRef.current;
        const cards = container.querySelectorAll(".identidad-tone-card");
        const phrases = container.querySelectorAll(".identidad-tone-phrase");
        const dontPhrases = container.querySelectorAll(
          ".identidad-tone-phrase--dont"
        );
        const strikes = container.querySelectorAll(".identidad-tone-strike");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
          },
        });

        tl.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          }
        ).fromTo(
          phrases,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.3"
        )
          .to(
            dontPhrases,
            { opacity: 0.4, duration: 0.4, ease: "power2.out" },
            "+=1"
          )
          .fromTo(
            strikes,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
            "<"
          );
      }

      // Cards de usos incorrectos: aparecen, sube el logo, "efecto incorrecto"
      // y por último aparece el círculo con la X
      if (identidadMisuseCardsRef.current) {
        const container = identidadMisuseCardsRef.current;
        const misuseCards = container.querySelectorAll(".identidad-misuse-card");
        const misuseLogos = container.querySelectorAll(".identidad-misuse-logo");
        const misuseBadges = container.querySelectorAll(".identidad-misuse-badge");

        const tlMisuse = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
          },
        });

        tlMisuse
          .fromTo(
            misuseCards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: "power3.out",
            }
          )
          .fromTo(
            misuseLogos,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "back.out(1.4)",
            },
            "-=0.3"
          )
          .fromTo(
            misuseBadges,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              stagger: 0.1,
              ease: "back.out(2)",
            },
            "-=0.3"
          );
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!introDone) return;

    ScrollTrigger.refresh();
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, [introDone]);

  return (
    <main className="project-page">
      <NextIntro onDone={() => setIntroDone(true)} />
      <CaseStudyNavbar visible={introDone} />

      <section className="case-section next-hero" data-section="1">
        <div className="hero-meta">
          <div className="hero-meta-tags">
            {hero.tags.map((tag, i) => (
              <Fragment key={tag}>
                {i > 0 && <span className="hero-meta-dot">·</span>}
                <span>{tag}</span>
              </Fragment>
            ))}
          </div>

          <span className="hero-meta-case">{hero.caseLabel}</span>
        </div>

        <div className="hero-logo-wrap">
          <img src={nextLogo} alt={hero.logoAlt} className="hero-logo" />
        </div>

        <div className="hero-statement">
          <p className="hero-statement-headline">
            {hero.headline}{" "}
            <span className="hero-statement-highlight">
              {hero.headlineHighlight}
            </span>
            .
          </p>
          <p className="hero-statement-body">
            {hero.bodyLine1} <br />
            {hero.bodyLine2} <br />
            {hero.bodyLine3}
          </p>
        </div>

        <div className="hero-scroll">
          <svg
            className="hero-scroll-chevron"
            width="10"
            height="13"
            viewBox="0 0 14 18"
            fill="none"
          >
            <path
              d="M2 2 L11 9 L2 16"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{hero.scrollLabel}</span>
        </div>

        <div className="hero-phone-wrap">
          <img src={phoneHero} alt={hero.phoneAlt} className="hero-phone" />
          <div className="hero-phone-shadow" aria-hidden="true" />
        </div>
      </section>

      <section
        className="case-section meta-section"
        data-section="2"
        ref={metaSectionRef}
      >
        <div className="chapter-heading">
          <span className="chapter-number">{meta.number}</span>
          <div className="chapter-heading-text">
            <h2 className="chapter-title">{meta.title}</h2>
            <p className="chapter-eyebrow">{meta.eyebrow}</p>
          </div>
        </div>

        <div className="chapter-columns">
          <p className="chapter-col">{meta.description}</p>

          <div className="chapter-meta-list">
            <div className="chapter-meta-item">
              <span className="chapter-meta-label">{meta.role.label}</span>
              <span className="chapter-meta-value">{meta.role.value}</span>
            </div>

            <div className="chapter-meta-item">
              <span className="chapter-meta-label">
                {meta.research.label}
              </span>
              <span className="chapter-meta-value">
                {meta.research.value}
              </span>
            </div>

            <div className="chapter-meta-item">
              <span className="chapter-meta-label">
                {meta.deliverables.label}
              </span>
              <span className="chapter-meta-value">
                {meta.deliverables.value}
              </span>
            </div>

            <div className="chapter-meta-item">
              <span className="chapter-meta-label">
                {meta.territory.label}
              </span>
              <span className="chapter-meta-value">
                {meta.territory.value}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="case-section caida-section"
        data-section="3"
        ref={caidaSectionRef}
      >
        <div className="chapter-divider"></div>
        <div className="chapter-heading">
          <span className="chapter-number">{caida.number}</span>
          <div className="chapter-heading-text">
            <h2 className="chapter-title">{caida.title}</h2>
            <p className="chapter-eyebrow">{caida.eyebrow}</p>
          </div>
        </div>

        <p className="chapter-col chapter-lede">{caida.lede}</p>

        <div className="caida-cards" ref={caidaCardsRef}>
          {caida.cards.map((card) => (
            <div className="caida-card" key={card.title}>
              <span className="caida-card-title">{card.title}</span>

              <span className="caida-card-percent">
                <span
                  className="caida-card-percent-num"
                  data-percent={card.percent}
                >
                  0
                </span>
                <span className="caida-card-percent-sign">%</span>
              </span>

              <p className="caida-card-phrase">{card.phrase}</p>
            </div>
          ))}
        </div>

        <div className="caida-quote">
          <span className="caida-quote-chevrons" aria-hidden="true">
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
              <path
                d="M2 2 L11 9 L2 16"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
              <path
                d="M2 2 L11 9 L2 16"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <div className="caida-quote-body">
            <p className="caida-quote-text">
              &ldquo;{caida.quoteText}&rdquo;
            </p>

            <p className="caida-quote-attribution">
              {caida.quoteAttribution}
            </p>
          </div>
        </div>
      </section>

      <section
        className="case-section paisaje-section"
        data-section="4"
        ref={paisajeSectionRef}
      >
        <div className="chapter-heading">
          <span className="chapter-number">{paisaje.number}</span>
          <div className="chapter-heading-text">
            <h2 className="chapter-title">{paisaje.title}</h2>
            <p className="chapter-eyebrow">{paisaje.eyebrow}</p>
          </div>
        </div>

        <div className="paisaje-track-wrap">
          <div className="paisaje-track" ref={paisajeTrackRef}>
            {paisaje.cards.map((card) => (
              <div className="paisaje-card" key={card.title}>
                <h3 className="paisaje-card-title">{card.title}</h3>
                <p className="paisaje-card-subtitle">{card.subtitle}</p>
                <p className="paisaje-card-phrase">{card.phrase}</p>

                <div className="paisaje-card-footer">
                  <div className="paisaje-card-divider"></div>
                  <p className="paisaje-card-tag">{card.footer}</p>
                  <p className="paisaje-card-detail">{card.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="case-section siguiente-paso-section"
        data-section="5"
        ref={siguientePasoSectionRef}
      >
        <div className="chapter-divider"></div>
        <div className="chapter-heading">
          <span className="chapter-number">{siguientePaso.number}</span>
          <div className="chapter-heading-text">
            <h2 className="chapter-title">{siguientePaso.title}</h2>
            <p className="chapter-eyebrow">{siguientePaso.eyebrow}</p>
          </div>
        </div>

        <div className="siguiente-paso-statement" ref={siguientePasoStatementRef}>
          {siguientePaso.lines.map((line, i) => (
            <p
              className={`siguiente-paso-line${
                line.accent ? " siguiente-paso-line--accent" : ""
              }`}
              key={i}
            >
              {line.text}
            </p>
          ))}

          <p className="siguiente-paso-attribution">
            {siguientePaso.attribution}
          </p>
        </div>

        <div className="siguiente-paso-cards">
          {siguientePaso.cards.map((card) => (
            <div className="siguiente-paso-card" key={card.number}>
              <span className="siguiente-paso-card-number">
                {card.number}
                <svg width="10" height="13" viewBox="0 0 14 18" fill="none">
                  <path
                    d="M2 2 L11 9 L2 16"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h3 className="siguiente-paso-card-title">{card.title}</h3>
              <p className="siguiente-paso-card-detail">{card.detail}</p>
            </div>
          ))}
        </div>
        <div className="chapter-divider"></div>
      </section>

      <section
        className="case-section identidad-section"
        data-section="6"
        ref={identidadSectionRef}
      >
        <div className="chapter-heading">
          <span className="chapter-number">{identidad.number}</span>
          <div className="chapter-heading-text">
            <h2 className="chapter-title">{identidad.title}</h2>
            <p className="chapter-eyebrow">{identidad.eyebrow}</p>
          </div>
        </div>

        <p className="chapter-col chapter-lede">{identidad.lede}</p>

        <span className="chapter-number identidad-subhead">
          {identidad.logo.subhead}
        </span>

        <h3 className="chapter-title identidad-subtitle">
          {identidad.logo.title}
        </h3>

        <p className="chapter-col identidad-subtext">{identidad.logo.text}</p>

        <div className="identidad-logo-frame" ref={identidadGridFrameRef}>
          {identidadGridCols.map((left) => (
            <span
              className="identidad-grid-line identidad-grid-line--v"
              style={{ left: `${left}%` }}
              key={`v-${left}`}
            />
          ))}
          {identidadGridRows.map((top) => (
            <span
              className="identidad-grid-line identidad-grid-line--h"
              style={{ top: `${top}%` }}
              key={`h-${top}`}
            />
          ))}

          <img
            src={nextLogo}
            alt="NEXT"
            className="identidad-logo-mark"
            ref={identidadLogoMarkRef}
          />
        </div>

        <div className="identidad-grid-columns">
          {identidad.logo.gridColumns.map((col) => (
            <div className="identidad-grid-col" key={col.title}>
              <h4 className="identidad-grid-col-title">{col.title}</h4>
              <p className="identidad-grid-col-detail">{col.detail}</p>
            </div>
          ))}
        </div>

        <span className="chapter-number identidad-subhead">
          {identidad.color.subhead}
        </span>

        <h3 className="chapter-title identidad-subtitle">
          {identidad.color.title}
        </h3>

        <p className="chapter-col identidad-subtext">
          {identidad.color.text}
        </p>

        <div className="identidad-color-rows" ref={identidadColorRowsRef}>
          {identidadColorRows.map((row) => {
            let cumulativePct = 0;

            return (
              <div className="identidad-color-row" key={row.label}>
                <span className="identidad-color-label">{row.label}</span>
                <div className="identidad-color-bar">
                  {row.fills.map((fill, i) => {
                    const left = cumulativePct;
                    cumulativePct += fill.pct;

                    return (
                      <span
                        className="identidad-color-fill"
                        style={{
                          left: `${left}%`,
                          width: `${fill.pct}%`,
                          background: fill.color,
                        }}
                        key={i}
                      />
                    );
                  })}
                </div>
                <span className="identidad-color-value">{row.value}</span>
              </div>
            );
          })}
        </div>

        <p className="identidad-contrast">
         
          {identidad.color.contrastBefore}{" "}
          <span className="identidad-contrast-pass">
            {identidad.color.contrastPass}
          </span>{" "}
          {identidad.color.contrastMiddle}{" "}
          <span className="identidad-contrast-pass">
            {identidad.color.contrastPass}
          </span>{" "}
          {identidad.color.contrastAfter}
        </p>

        <span className="chapter-number identidad-subhead">
          {identidad.tone.subhead}
        </span>

        <h3 className="chapter-title identidad-subtitle">
          {identidad.tone.title}
        </h3>

        <p className="chapter-col identidad-subtext">{identidad.tone.text}</p>

        <div className="identidad-tone-cards" ref={identidadToneCardsRef}>
          <div className="identidad-tone-card identidad-tone-card--do">
            <span className="identidad-tone-card-header">
              <span className="identidad-tone-card-icon">✓</span>
              {identidad.tone.doLabel}
            </span>

            <div className="identidad-tone-phrases">
              {identidad.tone.doPhrases.map((phrase, i) => (
                <p className="identidad-tone-phrase" key={i}>
                  {phrase}
                </p>
              ))}
            </div>
          </div>

          <div className="identidad-tone-card identidad-tone-card--dont">
            <span className="identidad-tone-card-header">
              <span className="identidad-tone-card-icon">✕</span>
              {identidad.tone.dontLabel}
            </span>

            <div className="identidad-tone-phrases">
              {identidad.tone.dontPhrases.map((phrase, i) => (
                <p
                  className="identidad-tone-phrase identidad-tone-phrase--dont"
                  key={i}
                >
                  {phrase}
                  <span className="identidad-tone-strike" />
                </p>
              ))}
            </div>
          </div>
        </div>

        <span className="chapter-number identidad-subhead">
          {identidad.misuse.subhead}
        </span>

        <h3 className="chapter-title identidad-subtitle">
          {identidad.misuse.title}
        </h3>

        <div className="identidad-misuse-cards" ref={identidadMisuseCardsRef}>
          {identidad.misuse.labels.map((label) => (
            <div className="identidad-misuse-card" key={label}>
              <img
                src={nextLogo}
                alt={identidad.misuse.logoAlt}
                className="identidad-misuse-logo"
              />
              <span className="identidad-misuse-badge">✕</span>
              <span className="identidad-misuse-label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="case-section" data-section="7">
        {/* Transformación */}
      </section>

      <section className="case-section" data-section="8">
        {/* En construcción */}
      </section>

      <section className="case-section" data-section="9">
        {/* Mira hacia atrás */}
      </section>

      <section className="case-section" data-section="10">
        <div className="artmus-divider" />

        <header className="ending__hero">
          <h1>
            {ending.heroLine1}
            <br />
            {ending.heroConnector} <span>{ending.heroAccent}</span>
          </h1>
        </header>

        <article className="ticket-card">
          <div>
            <h3>{ending.ticketTitle}</h3>

            <p>{ending.ticketSubtitle}</p>
          </div>

          <div className="ticket-card__stamp">
            {[...Array(6)].map((_, i) => (
              <span key={i} />
            ))}
          </div>
        </article>

        <article
          className="next-card"
          onClick={() => navigate("/projects/artmus")}
          role="link"
          tabIndex={0}
          data-cursor={t("cursor.next")}
          onKeyDown={(e) => {
            if (e.key === "Enter") navigate("/projects/artmus");
          }}
        >
          <div>
            <small>{ending.nextLabel}</small>

            <h2 className="next-logo">
              <span className="logo-text">
                artMus
              </span>

              <img className="logo-hover" src={nextLogo} alt="NEXT" />
            </h2>

            <p>{ending.nextDescription}</p>
          </div>

          <button>→</button>
        </article>
      </section>
    </main>
  );
}
