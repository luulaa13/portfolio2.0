import { useEffect, useRef, useState, type JSX } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NextIntro from "./NextIntro";
import CaseStudyNavbar from "./CaseStudyNavbar";
import nextLogo from "../../assets/next-logo.png";
import phoneHero from "../../assets/phoneHero-next.png";
import "../../components/style/ProjectPage.css";

gsap.registerPlugin(ScrollTrigger);

const caidaCards = [
  {
    title: "BLOQUEO",
    percent: 72,
    phrase: "se bloquea con cierta regularidad al intentar avanzar hacia su meta.",
  },
  {
    title: "CAUSA COGNITIVA",
    percent: 45,
    phrase:
      "no sabe cuál es el siguiente paso o por dónde empezar. Falta estructura, no voluntad.",
  },
  {
    title: "HERRAMIENTA REAL",
    percent: 38,
    phrase: "sigue usando papel y bolígrafo. El rival no es Notion: es el cuaderno.",
  },
  {
    title: "LO QUE MÁS AYUDARÍA",
    percent: 65,
    phrase:
      "pide motivación o un plan completo. Pero la motivación es consecuencia del progreso visible.",
  },
];

const paisajeCards = [
  {
    title: "Duolingo",
    subtitle: "DOMINA",
    phrase: "Gamificación, rachas y hábito diario. Retención excelente.",
    footer: "LE FALTA",
    detail: "No te lleva hacia tu meta personal. Un solo dominio.",
  },
  {
    title: "Notion",
    subtitle: "DOMINA",
    phrase: "Organización y estructura flexible. Todo cabe.",
    footer: "LE FALTA",
    detail: "Estructura sin impulso ni constancia. Nadie te empuja.",
  },
  {
    title: "Habitica",
    subtitle: "DOMINA",
    phrase:
      "Recompensa y mecánica de juego. Muy adictivo para cierto perfil.",
    footer: "LE FALTA",
    detail: "El juego tapa el progreso real. Puede sentirse infantil.",
  },
  {
    title: "Streaks",
    subtitle: "DOMINA",
    phrase: "Constancia y registro de rachas. Simplicidad radical.",
    footer: "LE FALTA",
    detail: "Registrar no es lo mismo que avanzar. Sin rumbo",
  },
  {
    title: "NEXT",
    subtitle: "INTEGRA TODO",
    phrase:
      "Acción diaria + evidencia + momentum + comunidad, en torno a tu meta.",
    footer: "LA PIEZA QUE NADIE REÚNE",
    detail: "El siguiente paso, con rumbo.",
  },
];

const siguientePasoLines = [
  { text: "“No abandono por" },
  { text: "falta de ganas." },
  { text: "Abandono porque" },
  { text: "dejo de ver avance", accent: true },
  { text: "y ya no sé cuál es" },
  { text: "el siguiente paso.”", accent: true },
];

const siguientePasoCards = [
  {
    number: "01",
    title: "PROGRESS",
    detail:
      "Una acción diaria, clara y única, hacia tu meta principal. Una pantalla, una acción.",
  },
  {
    number: "02",
    title: "EVIDENCE",
    detail:
      "XP, porcentaje e hitos. Prueba visible de que avanzas, no solo la sensación.",
  },
  {
    number: "03",
    title: "MOMENTUM",
    detail:
      "Rachas y consistencia. El impulso que hace que mañana cueste menos que hoy.",
  },
  {
    number: "04",
    title: "COMMUNITY",
    detail:
      "Ligas y amigos. Mecanismos sociales que sostienen la constancia cuando flaquea.",
  },
];

// El frame mide 3.6/1, así que 36 columnas x 10 filas da celdas cuadradas
const identidadGridCols = Array.from(
  { length: 35 },
  (_, i) => ((i + 1) / 36) * 100
);
const identidadGridRows = Array.from(
  { length: 9 },
  (_, i) => ((i + 1) / 10) * 100
);

const identidadGridColumns = [
  { title: "TIPOGRAFÍA", detail: "Archivo Black · tracking ceñido" },
  { title: "TRAZO CHEVRON", detail: "Redondeado · siempre a la derecha" },
  { title: "TAMAÑO MÍNIMO", detail: "24px digital · 12mm impresión" },
  { title: "ÁREA DE SEGURIDAD", detail: "Altura de la «X» en los 4 lados" },
];

const identidadColorRows = [
  {
    label: "PIZARRA / PAPEL",
    value: "70%",
    fills: [{ pct: 70, color: "#293032" }],
  },
  {
    label: "NEUTROS",
    value: "20%",
    fills: [{ pct: 20, color: "#F2F1E9" }],
  },
  {
    label: "LIMA + CORAL",
    value: "5%",
    fills: [
      { pct: 3, color: "#B3FF00" },
      { pct: 2, color: "#FF5C34" },
    ],
  },
];

const identidadToneDoPhrases = [
  "Tu siguiente paso de hoy: 20 min de lectura.",
  "Llevas 6 días seguidos. Vas mejor de lo que crees.",
  "Ayer no pudiste. Hoy es un buen día para volver.",
];

const identidadToneDontPhrases = [
  "¡¡Maximiza tu productividad ya!!",
  "Has roto tu racha. Empieza de cero.",
  "Si fallas, es porque no te esfuerzas.",
];

const identidadMisuseLabels = [
  "NO ROTAR",
  "NO DEFORMAR",
  "NO AÑADIR EFECTOS",
  "NO CAMBIAR TIPOGRAFÍA",
];

export default function NextPage(): JSX.Element {
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
            <span>PRODUCT DESIGN</span>
            <span className="hero-meta-dot">·</span>
            <span>2026</span>
            <span className="hero-meta-dot">·</span>
            <span>UX RESEARCH → BRAND → UI</span>
          </div>

          <span className="hero-meta-case">CASE STUDY 02</span>
        </div>

        <div className="hero-logo-wrap">
          <img src={nextLogo} alt="NEXT" className="hero-logo" />
        </div>

        <div className="hero-statement">
          <p className="hero-statement-headline">
            Progress starts with{" "}
            <span className="hero-statement-highlight">what&apos;s next</span>.
          </p>
          <p className="hero-statement-body">
            Una app que convierte cualquier <br/>
            meta en una acción diaria con <br/>
            progreso visible.
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
          <span>SCROLL — TU PRIMER PASO</span>
        </div>

        <div className="hero-phone-wrap">
          <img
            src={phoneHero}
            alt="Pantalla de la app NEXT mostrando el progreso diario"
            className="hero-phone"
          />
          <div className="hero-phone-shadow" aria-hidden="true" />
        </div>
      </section>

      <section
        className="case-section meta-section"
        data-section="2"
        ref={metaSectionRef}
      >
        <div className="chapter-heading">
          <span className="chapter-number">01/08</span>
          <div className="chapter-heading-text">
            <h2 className="chapter-title">LA META</h2>
            <p className="chapter-eyebrow">EL BRIEF</p>
          </div>
        </div>

        <div className="chapter-columns">
          <p className="chapter-col">
            Diseñar un producto para el problema más universal del
            desarrollo personal: perder el impulso a mitad de camino. Las
            metas grandes no se pierden de golpe — se pierden un día sin
            avance tras otro.
          </p>

          <div className="chapter-meta-list">
            <div className="chapter-meta-item">
              <span className="chapter-meta-label">ROL</span>
              <span className="chapter-meta-value">
                Research, brand &amp; product design
              </span>
            </div>

            <div className="chapter-meta-item">
              <span className="chapter-meta-label">INVESTIGACIÓN</span>
              <span className="chapter-meta-value">
                Encuesta n=29 · junio 2026
              </span>
            </div>

            <div className="chapter-meta-item">
              <span className="chapter-meta-label">ENTREGABLES</span>
              <span className="chapter-meta-value">
                Brand book · PRD · UI · Prototipo
              </span>
            </div>

            <div className="chapter-meta-item">
              <span className="chapter-meta-label">TERRITORIO</span>
              <span className="chapter-meta-value">El siguiente paso</span>
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
          <span className="chapter-number">02/08</span>
          <div className="chapter-heading-text">
            <h2 className="chapter-title">LA CAÍDA</h2>
            <p className="chapter-eyebrow">QUÉ DICE LA INVESTIGACIÓN</p>
          </div>
        </div>

        <p className="chapter-col chapter-lede">
          34 personas contaron cómo persiguen sus metas — y por qué las
          abandonan. El patrón es claro: no es pereza, es falta de
          estructura.
        </p>

        <div className="caida-cards" ref={caidaCardsRef}>
          {caidaCards.map((card) => (
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
              &ldquo;Sé lo que tengo que hacer o lo que quiero, pero no sé
              qué hay que hacer para llegar.&rdquo;
            </p>

            <p className="caida-quote-attribution">
              PARTICIPANTE · ENCUESTA P10
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
          <span className="chapter-number">03/08</span>
          <div className="chapter-heading-text">
            <h2 className="chapter-title">EL PAISAJE</h2>
            <p className="chapter-eyebrow">CADA REFERENTE DOMINA UNA PIEZA. NADIE LAS REÚNE.</p>
          </div>
        </div>

        <div className="paisaje-track-wrap">
          <div className="paisaje-track" ref={paisajeTrackRef}>
            {paisajeCards.map((card) => (
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
          <span className="chapter-number">04/08</span>
          <div className="chapter-heading-text">
            <h2 className="chapter-title">EL SIGUIENTE PASO</h2>
            <p className="chapter-eyebrow">EL INSIGHT QUE LO ORDENA TODO</p>
          </div>
        </div>

        <div className="siguiente-paso-statement" ref={siguientePasoStatementRef}>
          {siguientePasoLines.map((line, i) => (
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
            VERDAD HUMANA · SÍNTESIS DE P7 + P9
          </p>
        </div>

        <div className="siguiente-paso-cards">
          {siguientePasoCards.map((card) => (
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
          <span className="chapter-number">05/08</span>
          <div className="chapter-heading-text">
            <h2 className="chapter-title">LA IDENTIDAD</h2>
            <p className="chapter-eyebrow">ANATOMÍA DE UNA FLECHA</p>
          </div>
        </div>

        <p className="chapter-col chapter-lede">
          El insight se convirtió primero en marca. NEXT + chevron = el
          siguiente paso: energía (lima) con rumbo (la dirección). Un único
          gesto que después se reutiliza en todo — viñetas, progreso, patrón,
          producto.
        </p>

        <span className="chapter-number identidad-subhead">
          01 · LOGO — CONSTRUCCIÓN
        </span>

        <h3 className="chapter-title identidad-subtitle">
          INGENIERÍA, NO DIBUJO.
        </h3>

        <p className="chapter-col identidad-subtext">
          El wordmark se construye sobre una retícula modular donde 1 unidad
          = la altura de la mayúscula. Todas las proporciones derivan de
          ahí.
        </p>

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
          {identidadGridColumns.map((col) => (
            <div className="identidad-grid-col" key={col.title}>
              <h4 className="identidad-grid-col-title">{col.title}</h4>
              <p className="identidad-grid-col-detail">{col.detail}</p>
            </div>
          ))}
        </div>

        <span className="chapter-number identidad-subhead">
          02 · COLOR — SISTEMA
        </span>

        <h3 className="chapter-title identidad-subtitle">
          La regla 70 · 25 · 5.
        </h3>

        <p className="chapter-col identidad-subtext">
          El color sostiene la jerarquía. El lima y el coral son acentos: su
          fuerza viene de usarse poco. Esta proporción gobierna cada
          pantalla, cada slide y esta misma página.
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
          CONTRASTE — LIMA SOBRE PIZARRA <span className="identidad-contrast-pass">AAA ✓</span> · PAPEL
          SOBRE PIZARRA <span className="identidad-contrast-pass">AAA ✓</span> · NUNCA TEXTO CLARO
          SOBRE ACENTOS
        </p>

        <span className="chapter-number identidad-subhead">
          03 · ESTRATEGIA — TONO DE VOZ
        </span>

        <h3 className="chapter-title identidad-subtitle">
          Un amigo que cree en ti. Nunca un sargento.
        </h3>

        <p className="chapter-col identidad-subtext">
          La investigación fue clara: la culpa hace abandonar
          (&ldquo;cuando me genera mucha ansiedad, abandono&rdquo;). El tono
          celebra el avance real y nunca castiga la recaída.
        </p>

        <div className="identidad-tone-cards" ref={identidadToneCardsRef}>
          <div className="identidad-tone-card identidad-tone-card--do">
            <span className="identidad-tone-card-header">
              <span className="identidad-tone-card-icon">✓</span>
              SÍ DECIMOS
            </span>

            <div className="identidad-tone-phrases">
              {identidadToneDoPhrases.map((phrase, i) => (
                <p className="identidad-tone-phrase" key={i}>
                  {phrase}
                </p>
              ))}
            </div>
          </div>

          <div className="identidad-tone-card identidad-tone-card--dont">
            <span className="identidad-tone-card-header">
              <span className="identidad-tone-card-icon">✕</span>
              NO DECIMOS
            </span>

            <div className="identidad-tone-phrases">
              {identidadToneDontPhrases.map((phrase, i) => (
                <p className="identidad-tone-phrase identidad-tone-phrase--dont" key={i}>
                  {phrase}
                  <span className="identidad-tone-strike" />
                </p>
              ))}
            </div>
          </div>
        </div>

        <span className="chapter-number identidad-subhead">
          04 · LOGO — USOS INCORRECTOS
        </span>

        <h3 className="chapter-title identidad-subtitle">
          Lo que nunca hacemos.
        </h3>

        <div className="identidad-misuse-cards" ref={identidadMisuseCardsRef}>
          {identidadMisuseLabels.map((label) => (
            <div className="identidad-misuse-card" key={label}>
              <img
                src={nextLogo}
                alt="Uso incorrecto del logo NEXT"
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
        {/* Extra */}
      </section>
    </main>
  );
}
