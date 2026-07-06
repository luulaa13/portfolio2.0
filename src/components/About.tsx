import "./style/About.css";
import { useTranslation } from "react-i18next";
import profileImg from "../assets/profile.png";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface JourneyStep {
  number: string;
  label: string;
  description: string;
}

export default function About() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);

  const journey = t("about.journey", {
    returnObjects: true,
  }) as Omit<JourneyStep, "number">[];

  useEffect(() => {
  if (!sectionRef.current) return;

  const ctx = gsap.context(() => {
    // Timeline principal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current!,
        start: "top 65%",
        toggleActions: "play none none none",
        once: true,
      },
      defaults: {
        ease: "power3.out",
      },
    });

    tl.from(".about-label", {
      opacity: 0,
      y: 15,
      duration: 0.5,
    })

      .from(
        ".about-heading",
        {
          opacity: 0,
          y: 45,
          duration: 0.9,
        },
        "-=0.2"
      )

      .from(
        ".about-accent",
        {
          opacity: 0,
          y: 10,
          duration: 0.5,
        },
        "-=0.45"
      )

      .from(
        ".about-lede p",
        {
          opacity: 0,
          y: 20,
          stagger: 0.12,
          duration: 0.6,
        },
        "-=0.2"
      )

      .from(
        ".about-photo-frame",
        {
          opacity: 0,
          scale: 0.96,
          duration: 1,
        },
        "-=0.8"
      )

      .from(
        ".about-photo-caption",
        {
          opacity: 0,
          y: 15,
          duration: 0.5,
        },
        "-=0.5"
      )

      .from(
        ".about-journey-step",
        {
          opacity: 0,
          y: 25,
          stagger: 0.15,
          duration: 0.6,
        },
        "-=0.25"
      );

    // Parallax de la imagen
    gsap.to(".about-photo-frame", {
      y: -40,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current!,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });
  }, sectionRef);

  return () => ctx.revert();
}, []);

  return (
    <section className="about-section"  ref={sectionRef} id="about">
      <div className="about-grid">
        {/* LEFT */}
        <div className="about-text-col">
          <div className="about-label">
            {t("about.label")}
          </div>

            <h1 className="about-heading">
            {t("about.title.line1")}{" "}
            <span className="about-accent">
                {t("about.title.accent")}
            </span>
            </h1>

          <div className="about-lede">
            <p>{t("about.text.0")}</p>
            <p>{t("about.text.1")}</p>
            <p>{t("about.text.2")}</p>
          </div>

          <div className="about-journey">
            {journey.map((step, index) => (
              <div
                className="about-journey-step"
                key={index}
              >
                <div className="about-journey-num">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="about-journey-label">
                  {step.label}
                </div>

                <div className="about-journey-desc">
                  {step.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="about-photo-wrap">
          <div className="about-photo-frame">
            <img
              src={profileImg}
              alt={t("about.photoAlt")}
              className="about-photo-img"
            />
          </div>

          <div className="about-photo-caption">
            <span className="about-photo-name">
              {t("about.name")}
            </span>

            <span className="about-photo-loc">
              {t("about.location")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}