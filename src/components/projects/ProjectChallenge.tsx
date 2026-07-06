import { useRef, useEffect, type JSX } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "../../data/projects";

import "../style/ProjectChallenge.css";

gsap.registerPlugin(ScrollTrigger);

interface ChallengePoint {
  title?: string;
  body: string;
  quote?: string;
}

interface ProjectChallengeProps {
  project: Project;
}

export default function ProjectChallenge({
  project,
}: ProjectChallengeProps): JSX.Element {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);

  const intro = t(`${project.challengeKey}.intro`, { defaultValue: "" });

  const points = t(`${project.challengeKey}.points`, {
    returnObjects: true,
  }) as ChallengePoint[];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.from(section.querySelectorAll(".challenge-animate"), {
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
    <section className="project-challenge" ref={sectionRef}>
      <div className="project-challenge-inner">
        <span className="project-challenge-label challenge-animate">
          {t("caseStudies.challenge.label")}
        </span>

        <h2 className="project-challenge-question challenge-animate">
          {t(`${project.challengeKey}.question`)}
        </h2>

        {intro && (
          <p className="project-challenge-intro challenge-animate">{intro}</p>
        )}

        <ol className="project-challenge-list">
          {points.map((point, index) => (
            <li className="project-challenge-item challenge-animate" key={point.body}>
              <span className="project-challenge-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="project-challenge-content">
                {point.title && (
                  <h3 className="project-challenge-item-title">{point.title}</h3>
                )}

                <p className="project-challenge-text">{point.body}</p>

                {point.quote && (
                  <p className="project-challenge-quote">{point.quote}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
