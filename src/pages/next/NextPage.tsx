import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type JSX,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import NextIntro from "./NextIntro";
import CaseStudyNavbar from "./CaseStudyNavbar";
import nextLogo from "../../assets/next-logo.png";
import artmusLogo2 from "../../assets/artmus-logo2.png";
import phoneHero from "../../assets/phoneHero-next.png";
import onboardingWireframe from "../../assets/Onboarding1Wireframe.png";
import onboardingFinal from "../../assets/Onboarding1.png";
import progressWireframe from "../../assets/ProgressWireframe.png";
import signupFinal from "../../assets/SignupNext.png";
import introFinal from "../../assets/intro.png";
import "../../components/style/ProjectPage.css";
import type { FormEvent } from "react";

gsap.registerPlugin(ScrollTrigger);

// Ruta interna del siguiente case study — constante, no traducible
const ARTMUS_ROUTE = "/projects/artmus";

/**
 * URL de acción del formulario de Brevo (Contactos → Formularios →
 * crea uno → pestaña "Compartir" → código HTML). Tiene esta forma:
 *   https://xxxxxxxx.sibforms.com/serve/MUIFxxxxxxxxxxxxxxxxxxxxxxxx
 * Sustituye el placeholder de abajo por la tuya antes de publicar.
 */
const BREVO_ACTION_URL =
  "https://5ce21add.sibforms.com/serve/MUIFAGATxkURcjfVfBPVuAK72x5XdRCxVfJSsjOXGe_4dBpUduhmYor_MBrO4iW2b4vyXmk7RAKKcRa-4pQC7eHNsHFUN8S6KTpfLqkMXYi7moaeNT-NzCBBEv2pqZNBZX70T1wS_C-3XJyEB6MuWFZwc6bY_7eM4RlpBAHHgarZn8PDCCQzBTF6gYQgKS84vpaUL9kyo-hLlpBqBA==";
const BREVO_HIDDEN_FRAME = "brevo-waitlist-frame";

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
type TransformacionScreen = { label: string };
type BuildStatusChip = { label: string; done: boolean };
type MiraAtrasItem = { label: string; text: string };

export default function NextPage(): JSX.Element {
  const { t, i18n } = useTranslation();
  const [introDone, setIntroDone] = useState(false);
  const metaSectionRef = useRef<HTMLElement | null>(null);
  const caidaSectionRef = useRef<HTMLElement | null>(null);
  const caidaCardsRef = useRef<HTMLDivElement | null>(null);
  const paisajeSectionRef = useRef<HTMLElement | null>(null);
  const paisajeTrackRef = useRef<HTMLDivElement | null>(null);
  const paisajeWrapRef = useRef<HTMLDivElement | null>(null);
  const siguientePasoSectionRef = useRef<HTMLElement | null>(null);
  const siguientePasoStatementRef = useRef<HTMLDivElement | null>(null);
  const identidadSectionRef = useRef<HTMLElement | null>(null);
  const identidadGridFrameRef = useRef<HTMLDivElement | null>(null);
  const identidadLogoMarkRef = useRef<HTMLImageElement | null>(null);
  const identidadColorRowsRef = useRef<HTMLDivElement | null>(null);
  const identidadToneCardsRef = useRef<HTMLDivElement | null>(null);
  const identidadMisuseCardsRef = useRef<HTMLDivElement | null>(null);
  const transformacionSectionRef = useRef<HTMLElement | null>(null);
  const transformacionGridRef = useRef<HTMLDivElement | null>(null);
  const onboardingScreenRef = useRef<HTMLDivElement | null>(null);
  const onboardingWireLayerRef = useRef<HTMLDivElement | null>(null);
  const onboardingHandleRef = useRef<HTMLDivElement | null>(null);
  const onboardingDraggingRef = useRef(false);
  const buildSectionRef = useRef<HTMLElement | null>(null);
  const buildStatusRef = useRef<HTMLDivElement | null>(null);
  const buildWaitlistRef = useRef<HTMLDivElement | null>(null);
  const miraAtrasSectionRef = useRef<HTMLElement | null>(null);
  const miraAtrasTimelineRef = useRef<HTMLDivElement | null>(null);
  const cierreSectionRef = useRef<HTMLElement | null>(null);
  const cierreHeadlineRef = useRef<HTMLDivElement | null>(null);
  const nextProjectRef = useRef<HTMLAnchorElement | null>(null);
 

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
    swipeHint: string;
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

  const transformacion = t("caseStudies.next.transformacion", {
    returnObjects: true,
  }) as {
    number: string;
    title: string;
    eyebrow: string;
    lede: string;
    wireframeTag: string;
    finalTag: string;
    note: string;
    screens: TransformacionScreen[];
  };

  const build = t("caseStudies.next.build", { returnObjects: true }) as {
    number: string;
    title: string;
    eyebrow: string;
    lede: string;
    statusChips: BuildStatusChip[];
    waitlist: {
      title: string;
      text: string;
      emailPlaceholder: string;
      submitLabel: string;
      submittingLabel: string;
      note: string;
      successText: string;
      openLabel: string;
      linkedinText: string;
      linkedinUrl: string;
    };
  };

  const miraAtras = t("caseStudies.next.miraAtras", {
    returnObjects: true,
  }) as {
    number: string;
    title: string;
    eyebrow: string;
    lede: string;
    items: MiraAtrasItem[];
  };

  const cierre = t("caseStudies.next.cierre", { returnObjects: true }) as {
    headlineLine1: string;
    headlineLine2Accent: string;
    nextEyebrow: string;
    nextTitle: string;
    nextDescription: string;
  };

  const updateOnboardingReveal = (clientX: number) => {
    const el = onboardingScreenRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const pct = Math.min(
      100,
      Math.max(0, ((clientX - rect.left) / rect.width) * 100)
    );

    if (onboardingWireLayerRef.current) {
      onboardingWireLayerRef.current.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    }
    if (onboardingHandleRef.current) {
      onboardingHandleRef.current.style.left = `${pct}%`;
    }
  };

  const handleOnboardingPointerDown = (e: ReactPointerEvent) => {
    e.preventDefault();
    onboardingDraggingRef.current = true;
    updateOnboardingReveal(e.clientX);
  };

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (!onboardingDraggingRef.current) return;
      updateOnboardingReveal(e.clientX);
    };
    const handleUp = () => {
      onboardingDraggingRef.current = false;
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, []);

  const [waitlistState, setWaitlistState] = useState<
    "idle" | "sending" | "sent"
  >("idle");

  const handleWaitlistSubmit = (e: FormEvent<HTMLFormElement>) => {
    // No hacemos preventDefault: el <form> manda un POST real y nativo
    // a Brevo, apuntando a un iframe oculto para no salir de la página.
    // Al ser un envío de formulario (no fetch/XHR) no hay problema de CORS,
    // pero tampoco podemos leer la respuesta de Brevo — por eso el "sent"
    // es optimista, igual que en el resto de integraciones de este tipo.
    if (e.currentTarget.querySelector<HTMLInputElement>(
      'input[name="email_address_check"]'
    )?.value) {
      // Honeypot relleno → bot. Abortamos sin avisar.
      e.preventDefault();
      return;
    }

    setWaitlistState("sending");
    window.setTimeout(() => setWaitlistState("sent"), 900);
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

      // pista de scroll horizontal nativo (móvil): desaparece en cuanto el usuario desliza
      const paisajeWrap = paisajeWrapRef.current;
      if (paisajeWrap) {
        const onFirstPaisajeScroll = () => {
          paisajeWrap.classList.add("has-scrolled");
          paisajeWrap.removeEventListener("scroll", onFirstPaisajeScroll);
        };
        paisajeWrap.addEventListener("scroll", onFirstPaisajeScroll, {
          passive: true,
        });
      }

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
            { y: Math.min(220, frame.getBoundingClientRect().height * 0.55), opacity: 0 },
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

      // Entrada del encabezado de LA TRANSFORMACIÓN
      gsap.fromTo(
        transformacionSectionRef.current?.querySelectorAll(
          ".chapter-divider, .chapter-heading, .chapter-lede"
        ) ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: transformacionSectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Entrada escalonada de los pares wireframe/producto
      if (transformacionGridRef.current) {
        gsap.fromTo(
          transformacionGridRef.current.querySelectorAll(".transformacion-screen"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: transformacionGridRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Entrada del encabezado de EN CONSTRUCCIÓN
      gsap.fromTo(
        buildSectionRef.current?.querySelectorAll(
          ".chapter-divider, .chapter-heading, .chapter-lede"
        ) ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: buildSectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Chips de estado
      if (buildStatusRef.current) {
        gsap.fromTo(
          buildStatusRef.current.querySelectorAll(".build-status-chip"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: buildStatusRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // Tarjeta de waitlist
      if (buildWaitlistRef.current) {
        gsap.fromTo(
          buildWaitlistRef.current,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: buildWaitlistRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Entrada del encabezado de MIRA HACIA ATRÁS
      gsap.fromTo(
        miraAtrasSectionRef.current?.querySelectorAll(
          ".chapter-divider, .chapter-heading, .chapter-lede"
        ) ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: miraAtrasSectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

// Timeline
if (miraAtrasTimelineRef.current) {
  const timeline = miraAtrasTimelineRef.current;
  const railFill = timeline.querySelector(".mira-atras-rail-fill");
  const items = timeline.querySelectorAll<HTMLElement>(".mira-atras-item");

  if (railFill) {
    gsap.fromTo(
      railFill,
      { width: "0%" },
      {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: timeline,
          start: "top 70%",
          end: "bottom 45%",
          scrub: true,
        },
      }
    );
  }

  ScrollTrigger.create({
    trigger: timeline,
    start: "top 70%",
    end: "bottom 45%",
    scrub: true,

    onUpdate: ({ progress }) => {
      items.forEach((item, index) => {
        const itemProgress = gsap.utils.clamp(
          0,
          1,
          progress * items.length - index
        );

        item.style.setProperty("--progress", itemProgress.toString());
        item.classList.toggle("is-active", itemProgress >= 1);
      });
    },
  });
}

      // Titular de CIERRE, línea a línea
      if (cierreHeadlineRef.current) {
        gsap.fromTo(
          cierreHeadlineRef.current.querySelectorAll(
            ".cierre-headline-line span"
          ),
          { y: "112%" },
          {
            y: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: {
              trigger: cierreHeadlineRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      // Tarjeta del siguiente proyecto
      if (nextProjectRef.current) {
        gsap.fromTo(
          nextProjectRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: nextProjectRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!introDone) return;

    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    document.fonts?.ready.then(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    });
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

        <div className="paisaje-track-wrap" ref={paisajeWrapRef}>
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
        <p className="paisaje-swipe-hint" aria-hidden="true">
          {paisaje.swipeHint}
        </p>
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
            alt="ONDEA"
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
          {identidad.misuse.labels.map((label, index) => (
            <div
              className={`identidad-misuse-card misuse-${index + 1}`}
              key={label}
            >
              {/* La cuarta no lleva imagen */}
              {index !== 2 && index !== 3 && (
                <img
                  src={nextLogo}
                  alt={identidad.misuse.logoAlt}
                  className="identidad-misuse-logo"
                />
              )}

              {/* Texto de fondo en la tercera */}
              {index === 2 && (
                <div className="misuse-logo-stack">
                  <img src={nextLogo} className="logo logo-orange" alt="" />
                  <img
                    src={nextLogo}
                    alt={identidad.misuse.logoAlt}
                    className="logo logo-main"
                  />
                </div>
              )}

              {/* Texto diferente en la cuarta */}
              {index === 3 && (
                <span className="misuse-custom-logo">Next&gt;</span>
              )}

              <span className="identidad-misuse-badge">✕</span>
              <span className="identidad-misuse-label">{label}</span>
            </div>
          ))}
        </div>
         <div className="chapter-divider"></div>
      </section>

      <section
        className="case-section transformacion-section"
        data-section="7"
        ref={transformacionSectionRef}
      >
        <div className="chapter-divider"></div>
        <div className="chapter-heading">
          <span className="chapter-number">{transformacion.number}</span>
          <div className="chapter-heading-text">
            <h2 className="chapter-title">{transformacion.title}</h2>
            <p className="chapter-eyebrow">{transformacion.eyebrow}</p>
          </div>
        </div>

        <p className="chapter-col chapter-lede">{transformacion.lede}</p>

        <div className="transformacion-grid" ref={transformacionGridRef}>
          <div className="transformacion-screen">
            <span className="transformacion-screen-label">
              {transformacion.screens[0].label}
            </span>

            <div
              className="transformacion-slider"
              ref={onboardingScreenRef}
              onPointerDown={handleOnboardingPointerDown}
            >
              <div className="transformacion-slider-layer transformacion-slider-layer--final">
                <img
                  src={onboardingFinal}
                  alt={`${transformacion.screens[0].label} — ${transformacion.finalTag}`}
                  className="transformacion-slider-img"
                  draggable={false}
                />
              </div>

              <div
                className="transformacion-slider-layer transformacion-slider-layer--wire"
                ref={onboardingWireLayerRef}
                style={{ clipPath: "inset(0 50% 0 0)" }}
              >
                <img
                  src={onboardingWireframe}
                  alt={`${transformacion.screens[0].label} — ${transformacion.wireframeTag}`}
                  className="transformacion-slider-img"
                  draggable={false}
                />
              </div>

              <div
                className="transformacion-slider-handle"
                ref={onboardingHandleRef}
                style={{ left: "50%" }}
              >
                <span className="transformacion-slider-grip">‹ ›</span>
              </div>
            </div>
          </div>

          <div className="transformacion-screen">
            <span className="transformacion-screen-label">
              {transformacion.screens[1].label}
            </span>

            <div className="transformacion-slot">
              <img
                src={progressWireframe}
                alt={`${transformacion.screens[1].label} — ${transformacion.wireframeTag}`}
              />
            </div>
          </div>

          <div className="transformacion-screen">
            <span className="transformacion-screen-label">
              {transformacion.screens[2].label}
            </span>

            <div className="transformacion-slot">
              <img
                src={signupFinal}
                alt={`${transformacion.screens[2].label} — ${transformacion.finalTag}`}
              />
            </div>
          </div>

          <div className="transformacion-screen">
            <span className="transformacion-screen-label">
              {transformacion.screens[3].label}
            </span>

            <div className="transformacion-slot">
              <img
                src={introFinal}
                alt={`${transformacion.screens[3].label} — ${transformacion.finalTag}`}
              />
            </div>
          </div>
        </div>

        <p className="transformacion-note">{transformacion.note}</p>
      </section>

      <section
        className="case-section under-construction-section"
        data-section="8"
        ref={buildSectionRef}
      >
        <div className="chapter-divider"></div>
        <div className="chapter-heading">
          <span className="chapter-number">{build.number}</span>
          <div className="chapter-heading-text">
            <h2 className="chapter-title">{build.title}</h2>
            <p className="chapter-eyebrow">{build.eyebrow}</p>
          </div>
        </div>

        <p className="chapter-col chapter-lede">{build.lede}</p>

        <div className="build-status-row" ref={buildStatusRef}>
          {build.statusChips.map((chip) => (
            <span
              className={`build-status-chip${
                chip.done ? " build-status-chip--done" : " build-status-chip--wip"
              }`}
              key={chip.label}
            >
              {chip.done ? (
                "✓"
              ) : (
                <span className="build-status-pulse" aria-hidden="true" />
              )}
              {chip.label}
            </span>
          ))}
        </div>

        <div className="build-waitlist" ref={buildWaitlistRef}>
          <div className="build-waitlist-copy">
            <h3 className="build-waitlist-title">{build.waitlist.title}</h3>
            <p className="build-waitlist-text">{build.waitlist.text}</p>
          </div>

          <div className="build-waitlist-form-col">
            {waitlistState !== "sent" ? (
              <>
                <form
                  className="build-waitlist-form"
                  action={BREVO_ACTION_URL}
                  method="POST"
                  target={BREVO_HIDDEN_FRAME}
                  onSubmit={handleWaitlistSubmit}
                >
                  <input
                    type="email"
                    name="EMAIL"
                    autoComplete="off"
                    required
                    placeholder={build.waitlist.emailPlaceholder}
                    aria-label={build.waitlist.emailPlaceholder}
                  />
                  <input
                    type="hidden"
                    name="locale"
                    value={i18n.language.slice(0, 2)}
                  />
                  {/* Honeypot: campo invisible para humanos, si un bot lo rellena abortamos el envío */}
                  <input
                    type="text"
                    name="email_address_check"
                    defaultValue=""
                    tabIndex={-1}
                    autoComplete="off"
                    className="build-waitlist-honeypot"
                    aria-hidden="true"
                  />
                  <button type="submit" disabled={waitlistState === "sending"}>
                    {waitlistState === "sending"
                      ? build.waitlist.submittingLabel
                      : build.waitlist.submitLabel}
                  </button>
                </form>
                <p className="build-waitlist-note">{build.waitlist.note}</p>
              </>
            ) : (
              <p className="build-waitlist-success">
                {build.waitlist.successText}
              </p>
            )}
            <iframe
              name={BREVO_HIDDEN_FRAME}
              title="waitlist-submit"
              className="build-waitlist-hidden-frame"
              aria-hidden="true"
            />

            <div className="build-waitlist-open">
              <span className="chapter-number">
                {build.waitlist.openLabel}
              </span>
              <a
                href={build.waitlist.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {build.waitlist.linkedinText}
                <svg width="10" height="13" viewBox="0 0 14 18" fill="none">
                  <path
                    d="M2 2 L11 9 L2 16"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
      </section>

      <section
        className="case-section mira-atras-section"
        data-section="9"
        ref={miraAtrasSectionRef}
      >
        <div className="chapter-divider"></div>
        <div className="chapter-heading">
          <span className="chapter-number">{miraAtras.number}</span>
          <div className="chapter-heading-text">
            <h2 className="chapter-title">{miraAtras.title}</h2>
            <p className="chapter-eyebrow">{miraAtras.eyebrow}</p>
          </div>
        </div>

        <p className="chapter-col chapter-lede">{miraAtras.lede}</p>

        <div className="mira-atras-timeline" ref={miraAtrasTimelineRef}>
          <div className="mira-atras-rail">
            <div className="mira-atras-rail-fill"></div>
          </div>

          <div className="mira-atras-items">
            {miraAtras.items.map((item) => (
              <div className="mira-atras-item" key={item.label}>
                <span className="mira-atras-item-marker" aria-hidden="true">
                  ›
                </span>
                <span className="mira-atras-item-label">{item.label}</span>
                <p className="mira-atras-item-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
       
      </section>

      <section
        className="case-section cierre-section"
        data-section="10"
        ref={cierreSectionRef}
      >
         <div className="chapter-divider"></div>
        <div className="cierre-headline" ref={cierreHeadlineRef}>
          <h2 className="cierre-headline-line">
            <span>{cierre.headlineLine1}</span>
          </h2>
          <h2 className="cierre-headline-line">
            <span className="cierre-headline-accent">
              {cierre.headlineLine2Accent}
            </span>
          </h2>
        </div>

        <Link
          className="cierre-next-project"
          to={ARTMUS_ROUTE}
          ref={nextProjectRef}
        >
          <div className="cierre-next-project-copy">
            <span className="chapter-number">{cierre.nextEyebrow}</span>
            <div className="cierre-next-project-title">
              <span className="cierre-next-project-title-text">
                {cierre.nextTitle}
              </span>
              <img
                className="cierre-next-project-logo"
                src={artmusLogo2}
                alt={cierre.nextTitle}
              />
            </div>
            <p className="cierre-next-project-description">
              {cierre.nextDescription}
            </p>
          </div>

          <span className="cierre-next-project-arrow" aria-hidden="true">
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
        </Link>
      </section>
    </main>
  );
}
