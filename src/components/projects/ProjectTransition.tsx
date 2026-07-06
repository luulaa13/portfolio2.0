import {
  useEffect,
  useRef,
  useState,
  type JSX,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

import "../style/ProjectTransition.css";
import {
  ProjectTransitionContext,
  type TransitionPayload,
} from "./projectTransitionContext";

interface ProjectTransitionProviderProps {
  children: ReactNode;
}

export function ProjectTransitionProvider({
  children,
}: ProjectTransitionProviderProps): JSX.Element {
  const [payload, setPayload] = useState<TransitionPayload | null>(null);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const navigate = useNavigate();

  const startTransition = (next: TransitionPayload) => {
    setPayload(next);
    window.scrollTo(0, 0);
    navigate(`/projects/${next.slug}`);
  };

  useEffect(() => {
    if (!payload || !overlayRef.current || !imageRef.current) {
      return;
    }

    const image = imageRef.current;
    const { rect } = payload;

    gsap.set(image, {
      position: "fixed",
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });

    const tl = gsap.timeline({
      onComplete: () => setPayload(null),
    });

    tl.to(image, {
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      duration: 0.9,
      ease: "power4.inOut",
    }).to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
      delay: 0.2,
    });

    return () => {
      tl.kill();
    };
  }, [payload]);

  return (
    <ProjectTransitionContext.Provider value={{ startTransition }}>
      {children}

      {payload && (
        <div ref={overlayRef} className="project-transition-overlay">
          <img
            ref={imageRef}
            src={payload.image}
            alt=""
            className="project-transition-image"
          />
          <div className="project-transition-scrim" />
        </div>
      )}
    </ProjectTransitionContext.Provider>
  );
}
