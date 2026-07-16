import { useEffect, useRef, useState, type JSX } from "react";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";
import "../../components/style/NextIntro.css";

interface NextIntroProps {
  onDone?: () => void;
}

export default function NextIntro({ onDone }: NextIntroProps): JSX.Element | null {
  const { t } = useTranslation();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const [done, setDone] = useState(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const path = pathRef.current;
    const text = textRef.current;
    if (!overlay || !path || !text) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.set(text, { opacity: 0, y: 16 });

    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        document.body.style.overflow = "";
        onDoneRef.current?.();
      },
    });

    tl.to(path, {
      strokeDashoffset: 0,
      duration: 1.1,
      ease: "power2.inOut",
    })
      .to(
        text,
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.15"
      )
      .to(overlay, {
        yPercent: -100,
        duration: 0.9,
        ease: "power3.inOut",
        delay: 0.5,
      });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div className="next-intro" ref={overlayRef}>
      <svg
        className="next-intro-chevron"
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
      >
        <path
          ref={pathRef}
          d="M40 24 L86 60 L40 96"
          stroke="#B3FF00"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <p className="next-intro-text" ref={textRef}>
        {t("caseStudies.next.intro.tagline")}
      </p>
    </div>
  );
}
