import { useRef, useEffect, type JSX } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "../../data/projects";

import "../style/ProjectResearch.css";

gsap.registerPlugin(ScrollTrigger);

interface ResearchStat {
  value: string;
  label: string;
}

interface ProjectResearchProps {
  project: Project;
}

export default function ProjectResearch({
  project,
}: ProjectResearchProps): JSX.Element {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);

  const intro = t(`${project.researchKey}.intro`, { defaultValue: "" });

  const stats = t(`${project.researchKey}.stats`, {
    returnObjects: true,
  }) as ResearchStat[];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.from(section.querySelectorAll(".research-animate"), {
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

  return (
    <section className="project-research" ref={sectionRef}>
      <div className="project-research-inner">
        <span className="project-research-label research-animate">
          {t("caseStudies.research.label")}
        </span>

        <h2 className="project-research-question research-animate">
          {t(`${project.researchKey}.question`)}
        </h2>

        {intro && (
          <p className="project-research-intro research-animate">{intro}</p>
        )}

        <div className="project-research-stats">
          {stats.map((stat) => (
            <div className="project-research-stat research-animate" key={stat.label}>
              <span className="project-research-stat-value">{stat.value}</span>
              <span className="project-research-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
