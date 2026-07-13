import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import "./style/Loader.css";

type Phase = "design" | "code" | "launch";
type ArrowState = "idle" | "approach" | "click";

interface LoaderProps {
  onDone?: () => void;
}

function Loader({ onDone }: LoaderProps) {
  const { t } = useTranslation();

  const [phase, setPhase] = useState<Phase>("design");
  const [percent, setPercent] = useState(0);
  const [typed, setTyped] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [arrowState, setArrowState] = useState<ArrowState>("idle");
  const [doneSteps, setDoneSteps] = useState({
    design: false,
    code: false,
    launch: false,
  });

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const penRef = useRef<SVGGElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const path = pathRef.current;
    const pen = penRef.current;
    const overlay = overlayRef.current;
    if (!path || !overlay) return;

    document.body.style.overflow = "hidden";

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const percentCounter = { value: 0 };
    const typingCounter = { i: 0 };
    const command = t("loader.command");

    const ctx = gsap.context(() => {
      const phase1 = gsap.timeline({ onStart: () => setPhase("design") });

      phase1.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: "power2.inOut",
          onUpdate: function () {
            if (!pen) return;
            const progress = this.progress();
            const at = path.getPointAtLength(progress * length);
            const ahead = path.getPointAtLength(
              Math.min(progress * length + 1, length)
            );
            const angle =
              (Math.atan2(ahead.y - at.y, ahead.x - at.x) * 180) / Math.PI;
            pen.setAttribute(
              "transform",
              `translate(${at.x} ${at.y}) rotate(${angle})`
            );
          },
        },
        0
      );
      phase1.to(
        percentCounter,
        {
          value: 100,
          duration: 1.8,
          ease: "power1.inOut",
          onUpdate: () => setPercent(Math.round(percentCounter.value)),
        },
        0
      );
      phase1.call(() => setDoneSteps((d) => ({ ...d, design: true })));
      phase1.to({}, { duration: 0.5 });

      const phase2 = gsap.timeline({
        onStart: () => {
          setPhase("code");
          percentCounter.value = 0;
          setPercent(0);
        },
      });

      phase2.to(
        typingCounter,
        {
          i: command.length,
          duration: 1.3,
          ease: "none",
          snap: "i",
          onUpdate: () => setTyped(command.slice(0, typingCounter.i)),
        },
        0
      );
      phase2.to(
        percentCounter,
        {
          value: 100,
          duration: 1.3,
          ease: "power1.inOut",
          onUpdate: () => setPercent(Math.round(percentCounter.value)),
        },
        0
      );
      phase2.call(() => setShowOutput(true));
      phase2.call(() => setDoneSteps((d) => ({ ...d, code: true })));
      phase2.to({}, { duration: 0.6 });

      const phase3 = gsap.timeline({
        onStart: () => {
          setPhase("launch");
          percentCounter.value = 0;
          setPercent(0);
          setShowOutput(false);
          setTyped("");
        },
      });

      phase3.to({}, { duration: 0.7 });
      phase3.call(() => setArrowState("approach"));
      phase3.to({}, { duration: 0.85 });
      phase3.call(() => setArrowState("click"));
      if (buttonRef.current) {
        phase3.to(buttonRef.current, {
          scale: 0.9,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        });
      } else {
        phase3.to({}, { duration: 0.2 });
      }
      phase3.call(() => setDoneSteps((d) => ({ ...d, launch: true })));
      phase3.to({}, { duration: 0.7 });

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          onDoneRef.current?.();
        },
      });

      tl.add(phase1)
        .add(phase2)
        .add(phase3)
        .to(overlay, { yPercent: -100, duration: 0.7, ease: "power3.inOut" });
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps: { key: Phase; number: string }[] = [
    { key: "design", number: "01" },
    { key: "code", number: "02" },
    { key: "launch", number: "03" },
  ];

  return (
    <div className="loader" ref={overlayRef}>
      <div className="loader-stage">
        <div
          className={`loader-stage-panel ${
            phase === "design" ? "is-active" : ""
          }`}
        >
          <svg
            className="loader-pen-svg"
            viewBox="0 0 320 180"
            width="280"
            height="160"
          >
            <path
              ref={pathRef}
              d="M20 130 C 60 20, 120 20, 160 90 S 260 160, 300 60"
              stroke="#c9951a"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <g ref={penRef} className="loader-pen-nib">
              <path d="M-4 -8 L12 0 L-4 8 Z" fill="#c9951a" />
              <circle r="2.5" fill="#c9951a" />
            </g>
          </svg>
        </div>

        <div
          className={`loader-stage-panel ${
            phase === "code" ? "is-active" : ""
          }`}
        >
          <div className="loader-terminal">
            <div className="loader-terminal-bar">
              <span className="loader-terminal-dot loader-terminal-dot--red" />
              <span className="loader-terminal-dot loader-terminal-dot--yellow" />
              <span className="loader-terminal-dot loader-terminal-dot--green" />
            </div>
            <div className="loader-terminal-body">
              <p className="loader-terminal-line">
                <span className="loader-terminal-prompt">$</span> {typed}
                <span className="loader-terminal-caret" />
              </p>
              <p
                className={`loader-terminal-output ${
                  showOutput ? "is-visible" : ""
                }`}
              >
                {t("loader.installOutput")}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`loader-stage-panel ${
            phase === "launch" ? "is-active" : ""
          }`}
        >
          <div className="loader-launch">
            <button
              className={`loader-publish-btn ${
                arrowState === "click" ? "loader-publish-btn--pressed" : ""
              }`}
              ref={buttonRef}
              type="button"
              tabIndex={-1}
            >
              {t("loader.publishButton")}
            </button>

            <div
              className={`loader-arrow-cursor loader-arrow-cursor--${arrowState}`}
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                <path
                  d="M4 2 L4 20 L9 15.6 L12.4 22 L15.2 20.6 L11.7 14.2 L18 14 Z"
                  fill="#F2F1E9"
                  stroke="#111"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="loader-hud">
        <ul className="loader-hud-steps">
          {steps.map((step) => (
            <li
              key={step.key}
              className={`loader-hud-step ${
                doneSteps[step.key]
                  ? "is-done"
                  : phase === step.key
                  ? "is-current"
                  : ""
              }`}
            >
              <span className="loader-hud-bullet">
                {doneSteps[step.key] ? "✓" : "›"}
              </span>
              {step.number} — {t(`loader.steps.${step.key}`)}
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`loader-percent ${
          phase === "launch" ? "loader-percent--hidden" : ""
        }`}
      >
        {percent}%
      </div>
    </div>
  );
}

export default Loader;
