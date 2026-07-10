import { useEffect, useState, type JSX } from "react";

import "../../components/style/ArtMusNavbar.css";

const SECTION_COUNT = 7;
const STEPS = Array.from({ length: SECTION_COUNT }, (_, i) => i + 1);

interface ArtMusNavbarProps {
  visible: boolean;
}

export default function ArtMusNavbar({
  visible,
}: ArtMusNavbarProps): JSX.Element {
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
    <nav className="artmus-navbar">
      <div
        className={`artmus-navbar-progress${
          visible ? " artmus-navbar-progress--visible" : ""
        }`}
        aria-hidden="true"
      >
        <span className="artmus-navbar-label">RECORRIDO</span>

        <div className="artmus-navbar-squares">
          {STEPS.map((step) => (
            <span
              key={step}
              className={`artmus-square${
                step < active
                  ? " artmus-square--passed"
                  : step === active
                  ? " artmus-square--current"
                  : ""
              }`}
            >
              {step === active && <span className="artmus-square-dot" />}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}
