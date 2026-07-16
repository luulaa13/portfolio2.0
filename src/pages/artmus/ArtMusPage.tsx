import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type JSX,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArtMusIntro from "./ArtMusIntro";
import ArtMusNavbar from "./ArtMusNavbar";
import artmusLogo from "../../assets/artmusLogo.png";
import artmusLogo2 from "../../assets/artmus-logo2.png";
import artmusHome from "../../assets/artmusHome.png";
import wireframeHome from "../../assets/wireframeHome.png";
import artmusMuseums from "../../assets/Museums.png";
import artmusUpcoming from "../../assets/Upcoming.png";
import artmusExhibitions from "../../assets/Exhibitions.png";
import "../../components/style/ArtMusPage.css";
import nextLogo from "../../assets/next-logo.png";

gsap.registerPlugin(ScrollTrigger);

// Colores de texto por swatch de paleta — constante de diseño, no traducible
const artmusPaletteTextColors = ["#FDFCF9", "#2A3462", "#2A3462", "#2A3462"];

type ArtmusStatCard = {
  percent: number;
  phrase: string;
  placardTitle: string;
  placardSubtitle: string;
};

type ArtmusPersona = {
  badge: string;
  name: string;
  subtitle: string;
  wants: string;
  frustration: string;
  needs: string;
  quote: string;
};

type ArtmusReferent = {
  name: string;
  label: string;
  domina: string;
  falta?: string;
  cartelaTitle?: string;
  cartelaSubtitle?: string;
  placardTitle: string;
  placardSubtitle: string;
  highlight?: boolean;
};

type ArtmusArchCard = { letter: string; title: string; detail: string };
type ArtmusPaletteColor = { name: string; hex: string };
type ArtmusVoiceCard = { label: string; detail: string; body: string };

export default function ArtMusPage(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [introDone, setIntroDone] = useState(false);
  const heroStatementRef = useRef<HTMLDivElement | null>(null);
  const problemSectionRef = useRef<HTMLElement | null>(null);
  const artmusStatCardsRef = useRef<HTMLDivElement | null>(null);
  const visitorsSectionRef = useRef<HTMLElement | null>(null);
  const personaCardsRef = useRef<HTMLDivElement | null>(null);
  const referentsSectionRef = useRef<HTMLElement | null>(null);
  const referentsTrackRef = useRef<HTMLDivElement | null>(null);
  const referentsWrapRef = useRef<HTMLDivElement | null>(null);
  const architectureSectionRef = useRef<HTMLElement | null>(null);
  const architectureCardsRef = useRef<HTMLDivElement | null>(null);
  const brandSectionRef = useRef<HTMLElement | null>(null);
  const brandLogoRef = useRef<HTMLImageElement | null>(null);
  const brandQuoteRef = useRef<HTMLParagraphElement | null>(null);
  const paletteRef = useRef<HTMLDivElement | null>(null);
  const voiceCardsRef = useRef<HTMLDivElement | null>(null);
  const workSectionRef = useRef<HTMLElement | null>(null);
  const phoneScreenRef = useRef<HTMLDivElement | null>(null);
  const wireLayerRef = useRef<HTMLDivElement | null>(null);
  const phoneHandleRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
 

  const rooms = t("caseStudies.artmus.rooms", { returnObjects: true }) as {
    problem: { number: string; title: string; eyebrow: string; lede: string };
    visitors: { number: string; title: string; eyebrow: string };
    referents: { number: string; title: string; eyebrow: string };
    architecture: {
      number: string;
      title: string;
      eyebrow: string;
      lede: string;
    };
    brand: { number: string; title: string; eyebrow: string; lede: string };
    work: { number: string; title: string; eyebrow: string };
  };

  const hero = t("caseStudies.artmus.hero", { returnObjects: true }) as {
    tags: string[];
    caseLabel: string;
    logoAlt: string;
    statementAccent: string;
    statementBody: string;
    stickerTitle: string;
    stickerSubtitle: string;
    stickerLine1: string;
    stickerLine2: string;
    stickerLine3: string;
    scrollLabel: string;
  };

  const stats = t("caseStudies.artmus.stats", {
    returnObjects: true,
  }) as ArtmusStatCard[];

  const personasData = t("caseStudies.artmus.personas", {
    returnObjects: true,
  }) as {
    labels: { wants: string; frustration: string; needs: string };
    items: ArtmusPersona[];
  };

  const referentsData = t("caseStudies.artmus.referents", {
    returnObjects: true,
  }) as {
    missingLabel: string;
    swipeHint: string;
    items: ArtmusReferent[];
  };

  const architecture = t("caseStudies.artmus.architecture", {
    returnObjects: true,
  }) as ArtmusArchCard[];

  const flow = t("caseStudies.artmus.flow", { returnObjects: true }) as {
    label: string;
    steps: string[];
  };

  const brandSection = t("caseStudies.artmus.brandSection", {
    returnObjects: true,
  }) as {
    logoAlt: string;
    quoteAccent: string;
    quoteRest: string;
    palette: ArtmusPaletteColor[];
    voices: ArtmusVoiceCard[];
  };

  const palette = brandSection.palette.map((color, i) => ({
    ...color,
    text: artmusPaletteTextColors[i],
  }));

  const work = t("caseStudies.artmus.work", { returnObjects: true }) as {
    label: string;
    titleSans: string;
    titleSerif: string;
    text1: string;
    text2: string;
    phoneFinalAlt: string;
    phoneWireAlt: string;
    shot1Alt: string;
    shot2Alt: string;
    shot3Alt: string;
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

  const updateReveal = (clientX: number) => {
    const el = phoneScreenRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const pct = Math.min(
      100,
      Math.max(0, ((clientX - rect.left) / rect.width) * 100)
    );

    if (wireLayerRef.current) {
      wireLayerRef.current.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    }
    if (phoneHandleRef.current) {
      phoneHandleRef.current.style.left = `${pct}%`;
    }
  };

  const handlePhonePointerDown = (e: ReactPointerEvent) => {
    e.preventDefault();
    draggingRef.current = true;
    updateReveal(e.clientX);
  };

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      updateReveal(e.clientX);
    };
    const handleUp = () => {
      draggingRef.current = false;
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, []);

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

    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    document.fonts?.ready.then(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    });
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

      // pista de scroll horizontal nativo (móvil): desaparece en cuanto el usuario desliza
      const wrap = referentsWrapRef.current;
      if (wrap) {
        const onFirstScroll = () => {
          wrap.classList.add("has-scrolled");
          wrap.removeEventListener("scroll", onFirstScroll);
        };
        wrap.addEventListener("scroll", onFirstScroll, { passive: true });
      }

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
            {hero.tags.map((tag, i) => (
              <Fragment key={tag}>
                {i > 0 && <span className="artmus-hero-meta-dot">·</span>}
                <span>{tag}</span>
              </Fragment>
            ))}
          </div>

          <span className="artmus-hero-meta-case">{hero.caseLabel}</span>
        </div>

        <div className="artmus-hero-logo-wrap">
          <img
            src={artmusLogo}
            alt={hero.logoAlt}
            className="artmus-hero-logo"
          />
        </div>

        <div className="artmus-hero-statement" ref={heroStatementRef}>
          <p className="artmus-hero-statement-text">
            <span className="artmus-hero-statement-accent">
              {hero.statementAccent}
            </span>{" "}
            {hero.statementBody}
          </p>
        </div>

        <div className="artmus-hero-sticker">
          <span className="artmus-hero-sticker-title">
            {hero.stickerTitle}
          </span>
          <span className="artmus-hero-sticker-subtitle">
            {hero.stickerSubtitle}
          </span>
          <p className="artmus-hero-sticker-text">
            {hero.stickerLine1}
            <br />
            {hero.stickerLine2}
            <br />
            {hero.stickerLine3}
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
          <span>{hero.scrollLabel}</span>
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
            {rooms.problem.number}
          </span>

          <div className="artmus-room-heading-text">
            <h2 className="artmus-room-title">{rooms.problem.title}</h2>
            <p className="artmus-room-eyebrow">{rooms.problem.eyebrow}</p>
          </div>
        </div>

        <p className="artmus-room-lede">{rooms.problem.lede}</p>

        <div className="artmus-stat-cards" ref={artmusStatCardsRef}>
          {stats.map((card, i) => (
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
            {rooms.visitors.number}
          </span>

          <div className="artmus-room-heading-text">
            <h2 className="artmus-room-title">{rooms.visitors.title}</h2>
            <p className="artmus-room-eyebrow">{rooms.visitors.eyebrow}</p>
          </div>
        </div>

        <div className="artmus-persona-cards" ref={personaCardsRef}>
          {personasData.items.map((p) => (
            <article className="artmus-persona-card" key={p.name}>
              <div className="artmus-persona-topline" aria-hidden="true" />

              <span className="artmus-persona-tag">{p.badge}</span>

              <h2 className="artmus-persona-name">{p.name}</h2>
              <h3 className="artmus-persona-subtitle">{p.subtitle}</h3>

              <div className="artmus-persona-info">
                <div className="artmus-persona-row">
                  <span>{personasData.labels.wants}</span>
                  <p>{p.wants}</p>
                </div>

                <div className="artmus-persona-row">
                  <span>{personasData.labels.frustration}</span>
                  <p>{p.frustration}</p>
                </div>

                <div className="artmus-persona-row">
                  <span>{personasData.labels.needs}</span>
                  <p>{p.needs}</p>
                </div>
              </div>

              <blockquote className="artmus-persona-quote">
                {p.quote}
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
            {rooms.referents.number}
          </span>

          <div className="artmus-room-heading-text">
            <h2 className="artmus-room-title">{rooms.referents.title}</h2>
            <p className="artmus-room-eyebrow">{rooms.referents.eyebrow}</p>
          </div>
        </div>

        <div className="artmus-referents-track-wrap" ref={referentsWrapRef}>
          <div className="artmus-referents-track" ref={referentsTrackRef}>
            {referentsData.items.map((referent, i) => (
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
                      <span className="artmus-referent-label">
                        {referentsData.missingLabel}
                      </span>
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
        <p className="artmus-swipe-hint" aria-hidden="true">
          {referentsData.swipeHint}
        </p>
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
            {rooms.architecture.number}
          </span>

          <div className="artmus-room-heading-text">
            <h2 className="artmus-room-title">{rooms.architecture.title}</h2>
            <p className="artmus-room-eyebrow">
              {rooms.architecture.eyebrow}
            </p>
          </div>
        </div>

        <p className="artmus-room-lede">{rooms.architecture.lede}</p>

        <div className="artmus-architecture-cards" ref={architectureCardsRef}>
          {architecture.map((card, i) => (
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
          <span className="artmus-flow-label">{flow.label}</span>

          <div className="artmus-flow-steps">
            {flow.steps.map((step, i) => (
              <Fragment key={step}>
                {i > 0 && <span className="artmus-flow-arrow">→</span>}
                <span
                  className={`artmus-flow-step${
                    i === flow.steps.length - 1
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
            {rooms.brand.number}
          </span>

          <div className="artmus-room-heading-text">
            <h2 className="artmus-room-title">{rooms.brand.title}</h2>
            <p className="artmus-room-eyebrow">{rooms.brand.eyebrow}</p>
          </div>
        </div>

        <p className="artmus-room-lede">{rooms.brand.lede}</p>

        <div className="artmus-brand-logo-wrap">
          <img
            src={artmusLogo2}
            alt={brandSection.logoAlt}
            className="artmus-brand-logo"
            ref={brandLogoRef}
          />
        </div>

        <p className="artmus-brand-quote" ref={brandQuoteRef}>
          &ldquo;
          <span className="artmus-brand-quote-accent">
            {brandSection.quoteAccent}
          </span>{" "}
          {brandSection.quoteRest}&rdquo;
        </p>

        <div className="artmus-palette" ref={paletteRef}>
          {palette.map((color) => (
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
          {brandSection.voices.map((voice) => (
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
            {rooms.work.number}
          </span>

          <div className="artmus-room-heading-text">
            <h2 className="artmus-room-title">{rooms.work.title}</h2>
            <p className="artmus-room-eyebrow">{rooms.work.eyebrow}</p>
          </div>
        </div>

        <div className="artmus-work-columns">
          <div className="artmus-work-col-left">
            <div className="artmus-work-phone">
              <div
                className="artmus-work-phone-screen"
                ref={phoneScreenRef}
                onPointerDown={handlePhonePointerDown}
              >
                <div className="artmus-work-phone-layer artmus-work-phone-layer--final">
                  <img
                    src={artmusHome}
                    alt={work.phoneFinalAlt}
                    className="artmus-work-phone-img"
                    draggable={false}
                  />
                </div>

                <div
                  className="artmus-work-phone-layer artmus-work-phone-layer--wire"
                  ref={wireLayerRef}
                  style={{ clipPath: "inset(0 50% 0 0)" }}
                >
                  <img
                    src={wireframeHome}
                    alt={work.phoneWireAlt}
                    className="artmus-work-phone-img"
                    draggable={false}
                  />
                </div>

                <div
                  className="artmus-work-phone-handle"
                  ref={phoneHandleRef}
                  style={{ left: "50%" }}
                >
                  <span className="artmus-work-phone-handle-grip">
                    ‹ ›
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="artmus-work-col-right">
            <span className="artmus-work-label">{work.label}</span>

            <h3 className="artmus-work-title">
              <span className="artmus-work-title-sans">
                {work.titleSans}
              </span>{" "}
              <span className="artmus-work-title-serif">
                {work.titleSerif}
              </span>
            </h3>

            <p className="artmus-work-text">{work.text1}</p>

            <p className="artmus-work-text">{work.text2}</p>
          </div>
        </div>

        <div className="artmus-work-shots">
          <div className="artmus-work-shot">
            <img src={artmusMuseums} alt={work.shot1Alt} />
          </div>
          <div className="artmus-work-shot">
            <img src={artmusUpcoming} alt={work.shot2Alt} />
          </div>
          <div className="artmus-work-shot">
            <img src={artmusExhibitions} alt={work.shot3Alt} />
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="ending" data-section="8">
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
          onClick={() => navigate("/projects/next")}
          role="link"
          tabIndex={0}
          data-cursor={t("cursor.next")}
          onKeyDown={(e) => {
            if (e.key === "Enter") navigate("/projects/next");
          }}
        >
          <div>
            <small>{ending.nextLabel}</small>

            <h2 className="next-logo">
              <span className="logo-text">
                NEXT<span className="arrow">›</span>
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
