import { useEffect, useRef, useState, type JSX } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import "../../components/style/ArtMusIntro.css";

interface ArtMusIntroProps {
  onDone?: () => void;
}

export default function ArtMusIntro({ onDone }: ArtMusIntroProps): JSX.Element | null {
  const { t } = useTranslation();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const heroRectRef = useRef<HTMLDivElement | null>(null);
  const stampRef = useRef<HTMLSpanElement | null>(null);
  const [done, setDone] = useState(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.2,
        onComplete: () => {
          setDone(true);
          onDoneRef.current?.();
        },
      });

      tl.fromTo(
        heroRectRef.current,
        { y: 160, opacity: 0, rotate: -6 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        }
      )
        .fromTo(
          stampRef.current,
          { scale: 3, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "power4.out",
          },
          "+=0.2"
        )
        .to(overlayRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power3.inOut",
          delay: 1,
        });
    });

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div className="artmus-intro" ref={overlayRef}>
      <div className="artmus-hero-rect" ref={heroRectRef}>
        <div className="artmus-hero-rect-content">
          <div className="artmus-hero-rect-top">
            <span className="artmus-hero-rect-logo">
              <span className="artmus-hero-rect-logo-a">
                {t("caseStudies.artmus.intro.logoA")}
              </span>
              <span className="artmus-hero-rect-logo-m">
                {t("caseStudies.artmus.intro.logoM")}
              </span>
            </span>

            <span className="artmus-hero-rect-number">
              {t("caseStudies.artmus.intro.ticketNumber")}
            </span>
          </div>

          <p className="artmus-hero-rect-text">
            {t("caseStudies.artmus.intro.ticketLine1")}
            <br />
            {t("caseStudies.artmus.intro.ticketLine2")}
            <br />
            {t("caseStudies.artmus.intro.ticketLine3")}
          </p>
        </div>

        <span className="artmus-hero-rect-stamp" ref={stampRef}>
          {t("caseStudies.artmus.intro.stamp")}
        </span>
      </div>
    </div>
  );
}
