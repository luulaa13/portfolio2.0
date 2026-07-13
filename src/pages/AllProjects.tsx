import { useEffect, useRef, type JSX } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import ProjectCards from "../components/ProjectCards";
import "../components/style/Projects.css";
import "../components/style/AllProjects.css";

export default function AllProjects(): JSX.Element {
  const { t } = useTranslation();
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".all-projects-header > *", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(".project-card", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.15,
        delay: 0.2,
        ease: "power3.out",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="all-projects-page" ref={mainRef}>
      <section className="all-projects-header">
        <Link to="/" className="all-projects-back">
          ← {t("projects.allPage.back")}
        </Link>

        <span className="all-projects-eyebrow">
          {t("projects.allPage.eyebrow")}
        </span>

        <h1 className="all-projects-title">{t("projects.allPage.title")}</h1>

        <p className="all-projects-subtitle">
          {t("projects.allPage.subtitle")}
        </p>
      </section>

      <section className="projects-section all-projects-section">
        <ProjectCards />
      </section>
    </main>
  );
}
