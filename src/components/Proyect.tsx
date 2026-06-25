import { useRef, useEffect, type JSX } from "react";
import "./style/Projects.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import artmusImg from "../assets/artmus2.png";
import nextImg from "../assets/next.png";
gsap.registerPlugin(ScrollTrigger);

export default function Proyect(): JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {

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
        SELECTED WORK
      </div>

      {/* PROJECT 1 */}
      <div className="project-card project-1">
         <div
            className="project-bg"
            style={{ backgroundImage: `url(${artmusImg})` }}
        />
        <div className="project-content">

          <span className="project-meta">01 — PROJECT</span>
          Artmus app 
          <div className="project-tags">
            <span>UX/UI</span>
            <span>Branding</span>
            <span>React</span>
            <span>Research</span>
          </div>
        </div>
      </div>

      {/* PROJECT 2 */}
      <div className="project-card project-2">
         <div
            className="project-bg"
            style={{ backgroundImage: `url(${nextImg})` }}
        />
        <div className="project-content">
          <span className="project-meta">02 — PROJECT</span>
          NEXT app
          <div className="project-tags">
            <span>UX/UI</span>
            <span>Branding</span>
            <span>React</span>
            <span>Research</span>
          </div>
        </div>
      </div>
      <div className="projects-footer">

        <span className="projects-count">
            2 SELECTED WORK
        </span>

        <a
        href="https://www.behance.net/luciagarcia73"
        target="_blank"
        rel="noopener noreferrer"
        className="projects-cta"
      >
        EXPLORE ON BEHANCE
        <span>↗</span>
      </a>

        </div>
      <div className="projects-divider"></div>

    </section>
  );
}