import { useEffect, useRef, type JSX } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style/WhatIDo.css";

gsap.registerPlugin(ScrollTrigger);

export default function WhatIDo(): JSX.Element {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const { t } = useTranslation();

  const cards = t("whatIDo.cards", { returnObjects: true }) as Array<{
    tag: string;
    headline: string;
    description: string;
    skills: string[];
  }>;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // TITLE
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      // CARDS
      const elements = cardsRef.current?.querySelectorAll(".card");

      if (!elements) return;

      gsap.fromTo(
        elements,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="what-i-do" id="stack" ref={sectionRef}>
      <div className="what-i-do-container">

        <span className="section-label">
          {t("whatIDo.label")}
        </span>

        <h2 className="section-title" ref={titleRef}>
          {t("whatIDo.title")}
        </h2>

        <div className="cards" ref={cardsRef}>
          {cards.map((card, i) => (
            <div className="card" key={card.tag}>
              <div className="card__line" />
              <div className="card__slash" />

              <span className="card__num">
                0{i + 1}
              </span>

              <span className="card__tag">
                {card.tag}
              </span>

              <h3 className="card__title">
                {card.headline}
              </h3>

              <p className="card__body">
                {card.description}
              </p>

              <div className="card__skills">
                {card.skills.map((skill) => (
                  <span className="skill-pill" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}