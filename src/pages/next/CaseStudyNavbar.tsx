import { useEffect, useState, type JSX } from "react";

import "../../components/style/CaseStudyNavbar.css";

const SECTION_COUNT = 9;
const STEPS = Array.from({ length: SECTION_COUNT }, (_, i) => i + 1);

interface CaseStudyNavbarProps {
  visible: boolean;
}

export default function CaseStudyNavbar({
  visible,
}: CaseStudyNavbarProps): JSX.Element {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".case-section")
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.section);
          if (index) setActive(index);
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="case-navbar">
      
      <div
        className={`case-navbar-progress${
          visible ? " case-navbar-progress--visible" : ""
        }`}
        aria-hidden="true"
      >
        {STEPS.map((step) => (
          <svg
            key={step}
            className={`case-chevron${
              step <= active ? " case-chevron--active" : ""
            }`}
            width="12"
            height="16"
            viewBox="0 0 12 16"
            fill="none"
          >
            <path
              d="M2 2 L9 8 L2 14"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ))}
      </div>
    </nav>
  );
}
