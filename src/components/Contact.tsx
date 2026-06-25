import { useEffect, useRef, useState, type JSX } from "react";
import "./style/Contact.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact(): JSX.Element {
  const [time, setTime] = useState("");
  const [ideaHovered, setIdeaHovered] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const section = sectionRef.current;
  if (!section) return;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: section,
        start: "top 80%", // empieza cuando la sección entra al 80% del viewport
        once: true,        // solo se dispara una vez
      },
    });

    tl.from(leftRef.current, { opacity: 0, y: 40, duration: 1 });

    tl.from(rightRef.current, { opacity: 0, y: 30, duration: 0.9 }, "-=0.6");

    tl.from(section.querySelectorAll(".contact-headline"), {
      opacity: 0,
      y: 20,
      stagger: 0.12,
      duration: 0.8,
    }, "-=0.5");

    tl.from(section.querySelector(".contact-description"), {
      opacity: 0,
      duration: 0.8,
    }, "-=0.4");

    tl.from(section.querySelectorAll(".contact-link"), {
      opacity: 0,
      x: 20,
      stagger: 0.15,
      duration: 0.7,
    }, "-=0.5");

    tl.from(section.querySelector(".contact-location"), {
      opacity: 0,
      y: 10,
      duration: 0.6,
    }, "-=0.6");

  }, sectionRef);

  return () => ctx.revert();
}, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("es-ES", {
        timeZone: "Europe/Madrid",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
 
  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      {/* Left column */}
      <div className="contact-left" ref={leftRef}>
        <span className="contact-label">CONTACT</span>
 
        <div className="contact-headline-wrapper">
          <h1 className="contact-headline">
            Have an{" "}
            <span
              className="idea-wrapper"
              onMouseEnter={() => setIdeaHovered(true)}
              onMouseLeave={() => setIdeaHovered(false)}
            >
              <span className={`bulb-container ${ideaHovered ? "visible" : ""}`}>
                <svg
                  className="bulb-svg"
                  viewBox="0 0 80 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  
                 
                  {/* Rays */}
                  <line x1="40" y1="4" x2="40" y2="12" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" />
                  <line x1="62" y1="10" x2="57" y2="17" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" />
                  <line x1="72" y1="32" x2="64" y2="34" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" />
                  <line x1="18" y1="10" x2="23" y2="17" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" />
                  <line x1="8" y1="32" x2="16" y2="34" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" />
                  {/* Bulb body */}
                  <path
                    d="M28 38C28 30.268 33.373 24 40 24C46.627 24 52 30.268 52 38C52 43.5 49 47.5 46 50.5V55H34V50.5C31 47.5 28 43.5 28 38Z"
                    stroke="#D4A017"
                    strokeWidth="1.8"
                    fill="none"
                  />
                  {/* Base lines */}
                  <line x1="34" y1="55" x2="46" y2="55" stroke="#D4A017" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="35" y1="59" x2="45" y2="59" stroke="#D4A017" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="37" y1="63" x2="43" y2="63" stroke="#D4A017" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <span
                className="idea-text"
              >
                idea
              </span>
            </span>
            ?
          </h1>
          <h1 className="contact-headline">I'd love to hear about it.</h1>
        </div>
 
        <p className="contact-description">
          Frontend development, UX/UI design
          and product thinking <br/>for founders,
          startups and ambitious teams.
        </p>
      </div>
 
      {/* Right column */}
      <div className="contact-right" ref={rightRef}>
        <div className="contact-location">
          <span className="location-text">Madrid, Spain · GMT+2</span>
          <span className="location-time">{time}</span>
        </div>
 
        <div className="contact-links">
          <a
            href="mailto:luciagarciagarcia.lgg@gmail.com"
            className="contact-link"
          >
            <span>luciagarciagarcia.lgg@gmail.com</span>
            <span className="link-arrow">↗</span>
          </a>
 
          <a
            href="https://www.linkedin.com/in/luciauxui/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <span>LinkedIn</span>
            <span className="link-arrow">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
 