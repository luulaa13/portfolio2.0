import { useRef, useEffect, type JSX } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./style/Projects.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCards from "./ProjectCards";

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
      <div className="projects-label">{t("projects.title")}</div>

      <ProjectCards />

      <div className="projects-footer">
        <span className="projects-count">{t("projects.count")}</span>

        <Link to="/projects" className="projects-cta">
          {t("projects.exploreMore")}
          <span>→</span>
        </Link>
      </div>

      <div className="projects-divider"></div>
    </section>
  );
}
