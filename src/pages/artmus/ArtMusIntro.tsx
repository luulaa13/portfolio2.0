import { useEffect, useRef, useState, type JSX } from "react";
import { gsap } from "gsap";
import "../../components/style/ArtMusIntro.css";

interface ArtMusIntroProps {
  onDone?: () => void;
}

export default function ArtMusIntro({ onDone }: ArtMusIntroProps): JSX.Element | null {
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
              <span className="artmus-hero-rect-logo-a">art</span>
              <span className="artmus-hero-rect-logo-m">mus</span>
            </span>

            <span className="artmus-hero-rect-number">Nº 000029</span>
          </div>

          <p className="artmus-hero-rect-text">
            Entrada general
            <br />
            Exposición · Case Study 01
            <br />
            Válida para una visita
          </p>
        </div>

        <span className="artmus-hero-rect-stamp" ref={stampRef}>
          ADMITIDO
        </span>
      </div>
    </div>
  );
}
