import { useRef, useEffect, type JSX } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import type { Project } from "../../data/projects";

import "../style/ProjectHero.css";

interface ProjectHeroProps {
  project: Project;
}

export default function ProjectHero({
  project,
}: ProjectHeroProps): JSX.Element {
  const { t } = useTranslation();

  // Refs preparados para GSAP
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(
        [metaRef.current, titleRef.current, subtitleRef.current],
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      gsap.from(scrollRef.current, {
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        ease: "power2.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="project-hero"
    >
      {/* Hero image */}
      <img
        ref={imageRef}
        src={project.heroImage}
        alt={t(project.titleKey)}
        className="project-hero-image"
      />

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="project-hero-overlay"
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="project-hero-content"
      >
        <span
          ref={metaRef}
          className="project-hero-meta"
        >
          {project.number} — {t("projects.project")}
        </span>

        <h1
          ref={titleRef}
          className="project-hero-title"
        >
          {t(project.titleKey)}
        </h1>

        <p
          ref={subtitleRef}
          className="project-hero-subtitle"
        >
          {t(project.subtitleKey)}
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="project-hero-scroll"
      >
        <span className="scroll-arrow">↓</span>
        <span>{t("caseStudies.scroll")}</span>
      </div>
    </section>
  );
}