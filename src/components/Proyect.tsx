import { useRef, useEffect, type JSX } from "react";
import { useTranslation } from "react-i18next";
import "./style/Projects.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import artmusImg from "../assets/artmus2.png";
import nextImg from "../assets/next.png";

gsap.registerPlugin(ScrollTrigger);

export default function Proyect(): JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.from(section.querySelector(".projects-label"), {
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(section.querySelectorAll(".project-card"), {
        scrollTrigger: {
          trigger: section,
          start: "top 45%",
        },
        opacity: 0,
        y: 80,
        stagger: 0.25,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      
      <div className="projects-label">
        {t("projects.title")}
      </div>

      {/* PROJECT 1 */}
      <div className="project-card project-1">
        <div
          className="project-bg"
          style={{ backgroundImage: `url(${artmusImg})` }}
        />

        <div className="project-content">
          <span className="project-meta">
            01 — {t("projects.project")}
          </span>

          {t("projects.items.artmus")}

          <div className="project-tags">
            <span>{t("projects.tags.uxui")}</span>
            <span>{t("projects.tags.branding")}</span>
            <span>{t("projects.tags.react")}</span>
            <span>{t("projects.tags.research")}</span>
          </div>
        </div>

        <div className="project-action">
          <span>↗</span>
        </div>
      </div>

      {/* PROJECT 2 */}
      <div className="project-card project-2">
        <div
          className="project-bg"
          style={{ backgroundImage: `url(${nextImg})` }}
        />

        <div className="project-content">
          <span className="project-meta">
            02 — {t("projects.project")}
          </span>

          {t("projects.items.next")}

          <div className="project-tags">
            <span>{t("projects.tags.uxui")}</span>
            <span>{t("projects.tags.branding")}</span>
            <span>{t("projects.tags.react")}</span>
            <span>{t("projects.tags.research")}</span>
          </div>
        </div>

        <div className="project-action">
          <span>↗</span>
        </div>
      </div>

      <div className="projects-footer">
        <span className="projects-count">
          {t("projects.count")}
        </span>

        <a
          href="https://www.behance.net/luciagarcia73"
          target="_blank"
          rel="noopener noreferrer"
          className="projects-cta"
        >
          {t("projects.behance")}
          <span>↗</span>
        </a>
      </div>

      <div className="projects-divider"></div>
    </section>
  );
}