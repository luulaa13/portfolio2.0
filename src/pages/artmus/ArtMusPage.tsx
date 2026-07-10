import { Fragment, useEffect, useRef, useState, type JSX } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArtMusIntro from "./ArtMusIntro";
import ArtMusNavbar from "./ArtMusNavbar";
import artmusLogo from "../../assets/artmusLogo.png";
import artmusLogo2 from "../../assets/artmus-logo2.png";
import "../../components/style/ArtMusPage.css";

gsap.registerPlugin(ScrollTrigger);

const artmusStatCards = [
  {
    percent: 75,
    phrase: "Prefieren reservar online",
    placardTitle: "La reserva",
    placardSubtitle: "Dato sobre encuesta, 2025",
  },
  {
    percent: 60,
    phrase: "Usan móvil para buscar museos",
    placardTitle: "El bolsillo",
    placardSubtitle: "Dato sobre encuesta, 2025",
  },
  {
    percent: 70,
    phrase: "Se frustran con la falta de información clara",
    placardTitle: "La fricción",
    placardSubtitle: "Dato sobre encuesta, 2025",
  },
  {
    percent: 65,
    phrase: "Descubren exposiciones en RRSS",
    placardTitle: "El descubrimiento",
    placardSubtitle: "Dato sobre encuesta, 2025",
  },
];

type ArtmusPersona = {
  badge: string;
  nombre: string;
  subtitulo: string;
  quiere: string;
  frustra: string;
  necesita: string;
  cita: string;
};

const artmusPersonas: ArtmusPersona[] = [
  {
    badge: "RETRATO I",
    nombre: "Clara Fernández",
    subtitulo: "La exploradora cultural",
    quiere: "Descubrir exposiciones nuevas sin rastrear diez webs distintas.",
    frustra:
      "Información incompleta: horarios desactualizados, entradas agotadas al llegar.",
    necesita: "Un solo lugar donde ver, decidir y reservar en el momento.",
    cita:
      "Me entero de las exposiciones por Instagram... cuando ya casi han terminado.",
  },
  {
    badge: "RETRATO II",
    nombre: "Javier Morales",
    subtitulo: "El estudiante planificador",
    quiere:
      "Aprovechar descuentos y organizar visitas que quepan en su agenda.",
    frustra: "Colas en taquilla y no saber qué merece la pena antes de ir.",
    necesita:
      "Planificar la visita con antelación: qué ver, cuándo y a qué precio.",
    cita:
      "Si pudiera comprar la entrada desde el sofá, iría al doble de museos.",
  },
];

const artmusReferents = [
  {
    name: "Museo del Prado",
    domina:
      "Contenido curatorial profundo y colección digitalizada de referencia.",
    falta: "Solo su propio museo. Reserva y planificación limitadas.",
    label: "EXPONE",
    cartelaTitle: "",
    cartelaSubtitle: "",
    placardTitle: "App institucional",
    placardSubtitle: "Un museo, una isla",
    highlight: false,
  },
  {
    name: "Reina Sofía",
    domina: "Agenda de actividades propia y buena información de salas.",
    falta: "Sin descubrimiento cruzado ni comparación entre centros.",
    label: "EXPONE",
    cartelaTitle: "",
    cartelaSubtitle: "",
    placardTitle: "App institucional",
    placardSubtitle: "Otro silo más",
    highlight: false,
  },
  {
    name: "Louvre",
    domina: "Experiencia de audioguía y mapas interiores muy trabajados.",
    falta:
      "Pensada para el durante, no para descubrir ni planificar el antes.",
    label: "EXPONE",
    cartelaTitle: "",
    cartelaSubtitle: "",
    placardTitle: "App institucional",
    placardSubtitle: "Solo dentro del edificio",
    highlight: false,
  },
  {
    name: "QuickMuseum",
    domina: "Audioguías rápidas de múltiples museos en una sola app.",
    falta: "Ni compra de entradas ni planificación. Solo contenido.",
    label: "EXPONE",
    cartelaTitle: "",
    cartelaSubtitle: "",
    placardTitle: "Agregador parcial",
    placardSubtitle: "Contenido sin gestión",
    highlight: false,
  },
  {
    name: "CloudGuide",
    domina: "Catálogo amplio de instituciones culturales adheridas.",
    falta: "Cobertura irregular y experiencia de reserva inconsistente.",
    label: "EXPONE",
    cartelaTitle: "",
    cartelaSubtitle: "",
    placardTitle: "Agregador parcial",
    placardSubtitle: "Amplio pero desigual",
    highlight: false,
  },
  {
    name: "artmus",
    label: "EXPONE TODO",
    domina:
      "Descubrir + planificar + reservar + comprar, para todos los museos de tu ciudad.",
    falta: "",
    cartelaTitle: "LA PIEZA QUE NADIE EXPONÍA",
    cartelaSubtitle: "La colección completa, en tu bolsillo.",
    placardTitle: "Artmus, 2026",
    placardSubtitle: "Adquisición reciente",
    highlight: true,
  },
];

const artmusArchitectureCards = [
  {
    letter: "H",
    title: "Home",
    detail:
      "Descubrimiento personalizado: exposiciones destacadas, cerca de ti, últimas plazas.",
  },
  {
    letter: "M",
    title: "Museos",
    detail:
      "El catálogo completo de la ciudad: buscar, filtrar y comparar centros.",
  },
  {
    letter: "E",
    title: "Detalle de exposición",
    detail:
      "Toda la información en una pantalla: fechas, obras, precio, cómo llegar.",
  },
  {
    letter: "R",
    title: "Reservar visita",
    detail: "Fecha, hora y entradas en tres pasos. Sin colas, sin sorpresas.",
  },
  {
    letter: "A",
    title: "Eventos",
    detail:
      "Agenda cultural viva: inauguraciones, visitas guiadas, noches de museo.",
  },
  {
    letter: "P",
    title: "Perfil",
    detail: "Tus entradas, tu historial de visitas y tus museos guardados.",
  },
];

const artmusFlowSteps = [
  "Onboarding",
  "Descubre exposición",
  "Detalle",
  "Elige fecha y hora",
  "Entrada en el móvil",
];

const artmusPalette = [
  { name: "AZUL MUSEO", hex: "#2A3462", text: "#FDFCF9" },
  { name: "CHARTREUSE", hex: "#DCE94B", text: "#2A3462" },
  { name: "LILA PARED", hex: "#EDECF4", text: "#2A3462" },
  { name: "BLANCO SALA", hex: "#FDFCF9", text: "#2A3462" },
];

const artmusVoiceCards = [
  {
    label: "VOZ EXPRESIVA — SERIF",
    detail: "El arte se siente en serif",
    body: "Para titulares, la palabra «art» y los momentos de emoción. Itálicas con carácter.",
  },
  {
    label: "VOZ FUNCIONAL — SANS",
    detail: "El museo se usa en sans",
    body: "Para interfaz, datos y navegación. Clara, geométrica, sin fricción.",
  },
];

export default function ArtMusPage(): JSX.Element {
  const [introDone, setIntroDone] = useState(false);
  const heroStatementRef = useRef<HTMLDivElement | null>(null);
  const problemSectionRef = useRef<HTMLElement | null>(null);
  const artmusStatCardsRef = useRef<HTMLDivElement | null>(null);
  const visitorsSectionRef = useRef<HTMLElement | null>(null);
  const personaCardsRef = useRef<HTMLDivElement | null>(null);
  const referentsSectionRef = useRef<HTMLElement | null>(null);
  const referentsTrackRef = useRef<HTMLDivElement | null>(null);
  const architectureSectionRef = useRef<HTMLElement | null>(null);
  const architectureCardsRef = useRef<HTMLDivElement | null>(null);
  const brandSectionRef = useRef<HTMLElement | null>(null);
  const brandLogoRef = useRef<HTMLImageElement | null>(null);
  const brandQuoteRef = useRef<HTMLParagraphElement | null>(null);
  const paletteRef = useRef<HTMLDivElement | null>(null);
  const voiceCardsRef = useRef<HTMLDivElement | null>(null);
  const workSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.set(heroStatementRef.current, { y: 40, opacity: 0 });
  }, []);

  useEffect(() => {
    if (!introDone) return;

    gsap.to(heroStatementRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
    });
  }, [introDone]);

  useEffect(() => {
    if (!introDone) return;

    ScrollTrigger.refresh();
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, [introDone]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        problemSectionRef.current?.querySelectorAll(
          ".artmus-divider, .artmus-room-heading, .artmus-room-lede"
        ) ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: problemSectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      if (artmusStatCardsRef.current) {
        const cards =
          artmusStatCardsRef.current.querySelectorAll(".artmus-stat-card");

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
              trigger: artmusStatCardsRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );

        const counters =
          artmusStatCardsRef.current.querySelectorAll<HTMLSpanElement>(
            ".artmus-stat-percent-num"
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
                trigger: artmusStatCardsRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );
        });
      }

      gsap.fromTo(
        visitorsSectionRef.current?.querySelectorAll(
          ".artmus-divider, .artmus-room-heading"
        ) ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: visitorsSectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        personaCardsRef.current?.querySelectorAll(".artmus-persona-card") ??
          [],
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: personaCardsRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        referentsSectionRef.current?.querySelectorAll(
          ".artmus-divider, .artmus-room-heading"
        ) ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: referentsSectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        if (!referentsSectionRef.current || !referentsTrackRef.current)
          return;
        const track = referentsTrackRef.current;
        const items = track.querySelectorAll<HTMLElement>(
          ".artmus-referent-item"
        );

        const updateFocus = () => {
          const center = window.innerWidth / 2;

          items.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.left + rect.width / 2;
            const distance = Math.abs(itemCenter - center);
            const focus = gsap.utils.clamp(
              0,
              1,
              1 - distance / (window.innerWidth / 2)
            );

            gsap.set(item, {
              y: -focus * 28,
              scale: 1 + focus * 0.06,
            });
          });
        };

        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: referentsSectionRef.current,
            start: "top top",
            end: () => "+=" + (track.scrollWidth - window.innerWidth),
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: updateFocus,
            onRefresh: updateFocus,
          },
        });
      });

      mm.add("(max-width: 768px)", () => {
        if (!referentsTrackRef.current) return;
        gsap.set(referentsTrackRef.current, { clearProps: "x" });
      });

      gsap.fromTo(
        architectureSectionRef.current?.querySelectorAll(
          ".artmus-divider, .artmus-room-heading, .artmus-room-lede"
        ) ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: architectureSectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        architectureCardsRef.current?.querySelectorAll(
          ".artmus-architecture-card"
        ) ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: architectureCardsRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        brandSectionRef.current?.querySelectorAll(
          ".artmus-divider, .artmus-room-heading, .artmus-room-lede"
        ) ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: brandSectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      const brandLogoTl = gsap.timeline({
        scrollTrigger: {
          trigger: brandLogoRef.current,
          start: "top 85%",
          once: true,
        },
      });

      brandLogoTl
        .fromTo(
          brandLogoRef.current,
          { opacity: 0, scale: 0.7, rotate: -6 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1,
            ease: "back.out(1.6)",
          }
        )
        .fromTo(
          brandQuoteRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "+=0.4"
        );

      gsap.fromTo(
        paletteRef.current?.querySelectorAll(".artmus-palette-swatch") ?? [],
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: paletteRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        voiceCardsRef.current?.querySelectorAll(".artmus-voice-card") ?? [],
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: voiceCardsRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        workSectionRef.current?.querySelectorAll(
          ".artmus-divider, .artmus-room-heading"
        ) ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: workSectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="project-page artmus-page">
      <ArtMusIntro onDone={() => setIntroDone(true)} />
      <ArtMusNavbar visible={introDone} />

      <section className="case-section artmus-hero" data-section="1">
        <div className="artmus-hero-meta">
          <div className="artmus-hero-meta-tags">
            <span>PRODUCT DESIGN</span>
            <span className="artmus-hero-meta-dot">·</span>
            <span>2026</span>
            <span className="artmus-hero-meta-dot">·</span>
            <span>UX RESEARCH → IA → BRAND → UI</span>
          </div>

          <span className="artmus-hero-meta-case">CASE STUDY 01</span>
        </div>

        <div className="artmus-hero-logo-wrap">
          <img src={artmusLogo} alt="Artmus" className="artmus-hero-logo" />
        </div>

        <div className="artmus-hero-statement" ref={heroStatementRef}>
          <p className="artmus-hero-statement-text">
            <span className="artmus-hero-statement-accent">
              Tu ciudad está llena de arte.
            </span>{" "}
            Una app que centraliza todos los museos: planifica visitas,
            descubre exposiciones y compra entradas en un solo lugar.
          </p>
        </div>

        <div className="artmus-hero-sticker">
          <span className="artmus-hero-sticker-title">Artmus, 2026</span>
          <span className="artmus-hero-sticker-subtitle">
            Aplicación móvil sobre lienzo digital
          </span>
          <p className="artmus-hero-sticker-text">
            LUCÍA GARCÍA GARCÍA
            <br />
            RESEARCH · BRANDING · UX/UI
            <br />
            COLECCIÓN PERMANENTE
          </p>
        </div>

        <div className="artmus-hero-scroll">
          <svg
            className="artmus-hero-scroll-arrow"
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
          >
            <path
              d="M1 1 L7 8 L13 1"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>COMIENZA LA VISITA</span>
        </div>
      </section>

      <section
        className="case-section"
        data-section="2"
        ref={problemSectionRef}
      >
        <div className="artmus-divider" />

        <div className="artmus-room-heading">
          <span className="artmus-room-number">
            <span className="artmus-room-square" />
            SALA 01
          </span>

          <div className="artmus-room-heading-text">
            <h2 className="artmus-room-title">El problema</h2>
            <p className="artmus-room-eyebrow">INVESTIGACIÓN CUANTITATIVA</p>
          </div>
        </div>

        <p className="artmus-room-lede">
          La información sobre museos vive dispersa: webs distintas,
          taquillas físicas, redes sociales. El visitante quiere planificar,
          pero el ecosistema no se lo pone fácil. Cuatro datos lo enmarcan.
        </p>

        <div className="artmus-stat-cards" ref={artmusStatCardsRef}>
          {artmusStatCards.map((card, i) => (
            <div className="artmus-stat-item" key={i}>
              <div className="artmus-stat-card">
                <span className="artmus-stat-clip" aria-hidden="true" />

                <div className="artmus-stat-content">
                  <h3 className="artmus-stat-percent">
                    <span
                      className="artmus-stat-percent-num"
                      data-percent={card.percent}
                    >
                      0
                    </span>
                    <span className="artmus-stat-percent-sign">%</span>
                  </h3>

                  <p className="artmus-stat-phrase">{card.phrase}</p>
                </div>
              </div>

              <div className="artmus-stat-placard">
                <span className="artmus-stat-placard-title">
                  {card.placardTitle}
                </span>
                <span className="artmus-stat-placard-subtitle">
                  {card.placardSubtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="case-section"
        data-section="3"
        ref={visitorsSectionRef}
      >
        <div className="artmus-divider" />

        <div className="artmus-room-heading">
          <span className="artmus-room-number">
            <span className="artmus-room-square" />
            SALA 02
          </span>

          <div className="artmus-room-heading-text">
            <h2 className="artmus-room-title">Los visitantes</h2>
            <p className="artmus-room-eyebrow">
              PERSONA DEVELOPMENT · EMPATHY MAPPING
            </p>
          </div>
        </div>

        <div className="artmus-persona-cards" ref={personaCardsRef}>
          {artmusPersonas.map((p) => (
            <article className="artmus-persona-card" key={p.nombre}>
              <div className="artmus-persona-topline" aria-hidden="true" />

              <span className="artmus-persona-tag">{p.badge}</span>

              <h2 className="artmus-persona-name">{p.nombre}</h2>
              <h3 className="artmus-persona-subtitle">{p.subtitulo}</h3>

              <div className="artmus-persona-info">
                <div className="artmus-persona-row">
                  <span>QUIERE</span>
                  <p>{p.quiere}</p>
                </div>

                <div className="artmus-persona-row">
                  <span>LE FRUSTRA</span>
                  <p>{p.frustra}</p>
                </div>

                <div className="artmus-persona-row">
                  <span>NECESITA</span>
                  <p>{p.necesita}</p>
                </div>
              </div>

              <blockquote className="artmus-persona-quote">
                {p.cita}
              </blockquote>
            </article>
          ))}
        </div>
      </section>

      <section
        className="case-section"
        data-section="4"
        ref={referentsSectionRef}
      >
        <div className="artmus-divider" />

        <div className="artmus-room-heading">
          <span className="artmus-room-number">
            <span className="artmus-room-square" />
            SALA 03
          </span>

          <div className="artmus-room-heading-text">
            <h2 className="artmus-room-title">
              El pasillo de los referentes
            </h2>
            <p className="artmus-room-eyebrow">
              ANÁLISIS COMPETITIVO — CADA UNO EXPONE UNA PIEZA. NINGUNO LA
              COLECCIÓN COMPLETA.
            </p>
          </div>
        </div>

        <div className="artmus-referents-track-wrap">
          <div className="artmus-referents-track" ref={referentsTrackRef}>
            {artmusReferents.map((referent, i) => (
              <div className="artmus-referent-item" key={i}>
                <div
                  className={`artmus-referent-card${
                    referent.highlight ? " artmus-referent-card--highlight" : ""
                  }`}
                >
                  <h3 className="artmus-referent-name">{referent.name}</h3>

                  <div className="artmus-referent-block">
                    <span className="artmus-referent-label">
                      {referent.label}
                    </span>
                    <p>{referent.domina}</p>
                  </div>

                  {!referent.highlight && (
                    <div className="artmus-referent-block artmus-referent-falta">
                      <span className="artmus-referent-label">LE FALTA</span>
                      <p>{referent.falta}</p>
                    </div>
                  )}

                  {referent.highlight && (
                    <div className="artmus-referent-cartela">
                      <span className="artmus-referent-cartela-title">
                        {referent.cartelaTitle}
                      </span>
                      <span className="artmus-referent-cartela-subtitle">
                        {referent.cartelaSubtitle}
                      </span>
                    </div>
                  )}
                </div>

                <div className="artmus-stat-placard">
                  <span className="artmus-stat-placard-title">
                    {referent.placardTitle}
                  </span>
                  <span className="artmus-stat-placard-subtitle">
                    {referent.placardSubtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="case-section"
        data-section="5"
        ref={architectureSectionRef}
      >
        <div className="artmus-divider" />

        <div className="artmus-room-heading">
          <span className="artmus-room-number">
            <span className="artmus-room-square" />
            SALA 04
          </span>

          <div className="artmus-room-heading-text">
            <h2 className="artmus-room-title">La arquitectura</h2>
            <p className="artmus-room-eyebrow">
              INFORMATION ARCHITECTURE · SITE MAP · USER FLOW
            </p>
          </div>
        </div>

        <p className="artmus-room-lede">
          Seis espacios organizan la app — como las alas de un museo. Cada
          uno con una función clara, todos conectados por el mismo flujo:
          descubrir, decidir, reservar.
        </p>

        <div className="artmus-architecture-cards" ref={architectureCardsRef}>
          {artmusArchitectureCards.map((card, i) => (
            <div className="artmus-architecture-card" key={i}>
              <span className="artmus-architecture-card-letter">
                {card.letter}
              </span>
              <h3 className="artmus-architecture-card-title">
                {card.title}
              </h3>
              <p className="artmus-architecture-card-detail">
                {card.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="artmus-flow-row">
          <span className="artmus-flow-label">USER FLOW PRINCIPAL</span>

          <div className="artmus-flow-steps">
            {artmusFlowSteps.map((step, i) => (
              <Fragment key={step}>
                {i > 0 && <span className="artmus-flow-arrow">→</span>}
                <span
                  className={`artmus-flow-step${
                    i === artmusFlowSteps.length - 1
                      ? " artmus-flow-step--final"
                      : ""
                  }`}
                >
                  {step}
                </span>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section
        className="case-section artmus-brand-section"
        data-section="6"
        ref={brandSectionRef}
      >
        <div className="artmus-divider" />

        <div className="artmus-room-heading">
          <span className="artmus-room-number">
            <span className="artmus-room-square" />
            SALA 05
          </span>

          <div className="artmus-room-heading-text">
            <h2 className="artmus-room-title">La identidad</h2>
            <p className="artmus-room-eyebrow">
              BRANDING — DOS VOCES, UNA MARCA
            </p>
          </div>
        </div>

        <p className="artmus-room-lede">
          El nombre une dos mundos: art, orgánico y expresivo, y mus,
          estructurado y funcional. El arte y el museo. La emoción y el
          sistema. El logo lo cuenta en dos pesos.
        </p>

        <div className="artmus-brand-logo-wrap">
          <img
            src={artmusLogo2}
            alt="Logo de Artmus"
            className="artmus-brand-logo"
            ref={brandLogoRef}
          />
        </div>

        <p className="artmus-brand-quote" ref={brandQuoteRef}>
          &ldquo;
          <span className="artmus-brand-quote-accent">
            Tu ciudad está llena de arte.
          </span>{" "}
          Solo faltaba la puerta de entrada.&rdquo;
        </p>

        <div className="artmus-palette" ref={paletteRef}>
          {artmusPalette.map((color) => (
            <div
              className="artmus-palette-swatch"
              key={color.name}
              style={{ background: color.hex, color: color.text }}
            >
              <div className="artmus-palette-info">
                <span className="artmus-palette-name">{color.name}</span>
                <span className="artmus-palette-hex">{color.hex}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="artmus-voice-cards" ref={voiceCardsRef}>
          {artmusVoiceCards.map((voice) => (
            <div className="artmus-voice-card" key={voice.label}>
              <span className="artmus-voice-card-label">{voice.label}</span>
              <span className="artmus-voice-card-detail">
                {voice.detail}
              </span>
              <p className="artmus-voice-card-body">{voice.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="case-section"
        data-section="7"
        ref={workSectionRef}
      >
        <div className="artmus-divider" />

        <div className="artmus-room-heading">
          <span className="artmus-room-number">
            <span className="artmus-room-square" />
            SALA 06
          </span>

          <div className="artmus-room-heading-text">
            <h2 className="artmus-room-title">La obra</h2>
            <p className="artmus-room-eyebrow">
              WIREFRAMING → DESIGN COMPONENTS → HIGH FIDELITY
            </p>
          </div>
        </div>
      </section>

      {/* Next Project */}
    </main>
  );
}
