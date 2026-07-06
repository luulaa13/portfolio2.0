import { useRef, useEffect, type JSX, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import "./style/Projects.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { useProjectTransition } from "./projects/projectTransitionContext";

gsap.registerPlugin(ScrollTrigger);

export default function Proyect(): JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { t } = useTranslation();
  const { startTransition } = useProjectTransition();

  const handleProjectClick = (
    event: MouseEvent<HTMLAnchorElement>,
    slug: string,
    image: string
  ) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return;
    }

    const bg = event.currentTarget.querySelector(
      ".project-bg"
    ) as HTMLElement | null;
    if (!bg) return;

    event.preventDefault();
    startTransition({
      slug,
      image,
      rect: bg.getBoundingClientRect(),
    });
  };

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

      {projects.map((project, index) => (
        <Link
          key={project.slug}
          to={`/projects/${project.slug}`}
          className={`project-card project-${index + 1}`}
          onClick={(event) =>
            handleProjectClick(event, project.slug, project.heroImage)
          }
        >
          <img
            src={project.heroImage}
            alt={t(project.titleKey)}
            className="project-bg"
            data-project={project.slug}
          />

          <div className="project-content">
            <span className="project-meta">
              {project.number} — {t("projects.project")}
            </span>

            {t(project.titleKey)}

            <div className="project-tags">
              {project.role.map((role) => (
                <span key={role}>{role}</span>
              ))}
            </div>
          </div>

          <div className="project-action">
            <span>↗</span>
          </div>
        </Link>
      ))}

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