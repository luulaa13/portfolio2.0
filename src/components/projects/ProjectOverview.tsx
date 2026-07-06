import { useRef, useEffect, type JSX } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "../../data/projects";

import "../style/ProjectOverview.css";

gsap.registerPlugin(ScrollTrigger);

interface ProjectOverviewProps {
  project: Project;
}

export default function ProjectOverview({
  project,
}: ProjectOverviewProps): JSX.Element {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.from(section.querySelectorAll(".overview-animate"), {
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
        },
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const metaItems = [
    { label: t("caseStudies.meta.year"), value: project.year },
    {
      label: t("caseStudies.meta.duration"),
      value: `${project.duration} ${t("caseStudies.meta.months")}`,
    },
    { label: t("caseStudies.meta.role"), value: project.role.join(", ") },
    { label: t("caseStudies.meta.tools"), value: project.tools.join(", ") },
  ];

  return (
    <section className="project-overview" ref={sectionRef}>
      <div className="project-overview-grid">
        <div className="project-overview-statement overview-animate">
          <span className="project-overview-label">
            {t("caseStudies.overview.label")}
          </span>

          <p
            className="project-overview-text"
            dangerouslySetInnerHTML={{ __html: t(project.statementKey) }}
          />
        </div>

        <dl className="project-overview-meta">
          {metaItems.map((item) => (
            <div className="project-overview-meta-item overview-animate" key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="project-overview-divider" />
    </section>
  );
}
