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

export default function NextPage(): JSX.Element {
  const [introDone, setIntroDone] = useState(false);
  const metaSectionRef = useRef<HTMLElement | null>(null);
  const caidaSectionRef = useRef<HTMLElement | null>(null);
  const caidaCardsRef = useRef<HTMLDivElement | null>(null);

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
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (introDone) ScrollTrigger.refresh();
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
        <div className="chapter-divider"></div>
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

      <section className="case-section" data-section="4">
        {/* Paisaje */}
      </section>

      <section className="case-section" data-section="5">
        {/* Siguiente paso */}
      </section>

      <section className="case-section" data-section="6">
        {/* Identidad */}
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
