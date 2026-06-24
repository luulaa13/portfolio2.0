import { useEffect, useRef, type JSX } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style/WhatIDo.css";

gsap.registerPlugin(ScrollTrigger);

type CardItem = {
  title: string;
  description: string;
 skills: string[];
 
};

const cards: CardItem[] = [
  {
    title: "Design",
    description:
      "I design intuitive interfaces and user experiences focused on clarity and conversion.",
    skills: ["UX Research", "Figma", "Design Systems"],
  },
  {
    title: "Build",
    description:
      "I develop fast, scalable and accessible frontend applications.",
    skills: ["React", "TypeScript", "Next.js"],
  },
  {
    title: "Grow",
    description:
      "I think in product strategy, analytics and business impact.",
    skills: ["Analytics", "CRO", "Product Thinking"],
  },
];

export default function WhatIDo(): JSX.Element {

const sectionRef = useRef<HTMLDivElement | null>(null);
const titleRef = useRef<HTMLHeadingElement | null>(null);
const cardsRef = useRef<HTMLDivElement | null>(null);

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

    // CARDS (FIX REAL)
   const cards = cardsRef.current?.querySelectorAll(".card");

   if (!cards) return;

    gsap.fromTo(
      cards,
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
    <section className="what-i-do"  id="stack" ref={sectionRef}>
      <div className="what-i-do-container">
        <span className="section-label">What I do</span>

        <h2 className="section-title" ref={titleRef}>
          I design, build and grow digital products
        </h2>

        <div className="cards" ref={cardsRef}>
        {cards.map((card, i) => (
            <div className="card" key={card.title}>
            <div className="card__line" />
            <div className="card__slash" />

            <span className="card__num">
                0{i + 1}
            </span>

            <span className="card__tag">
                {card.title}
            </span>

            <h3 className="card__title">
                {card.title === "Design" && "Intuitive interfaces"}
                {card.title === "Build" && "Fast, scalable frontends"}
                {card.title === "Grow" && "Strategy & impact"}
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