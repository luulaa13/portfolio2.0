import { useEffect, useRef, useState, type JSX } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import artmusImg from "../assets/artmus2.png";
import nextImg from "../assets/next.png";

export default function ProjectCards(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [zooming, setZooming] = useState(false);
  const [zoomTarget, setZoomTarget] = useState<{
    slug: "artmus" | "next";
    color: string;
  } | null>(null);
  const zoomOverlayRef = useRef<HTMLDivElement | null>(null);

  const zoomColors: Record<"artmus" | "next", string> = {
    artmus: "#2A3462",
    next: "#050505",
  };

  const openProject = (slug: "artmus" | "next") => {
    setZoomTarget({ slug, color: zoomColors[slug] });
    setZooming(true);
  };

  useEffect(() => {
    if (!zooming || !zoomTarget) return;
    const overlay = zoomOverlayRef.current;
    if (!overlay) return;

    gsap.fromTo(
      overlay,
      { opacity: 0, scale: 1.15 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => navigate(`/projects/${zoomTarget.slug}`),
      }
    );
  }, [zooming, zoomTarget, navigate]);

  return (
    <>
      <div
        className="project-card project-1"
        onClick={() => openProject("artmus")}
        data-cursor={t("cursor.view")}
      >
        <div
          className="project-bg"
          style={{ backgroundImage: `url(${artmusImg})` }}
        />

        <div className="project-content">
          <span className="project-meta">01 — {t("projects.project")}</span>

          {t("projects.items.artmus")}

          <div className="project-tags">
            <span>{t("projects.tags.uxui")}</span>
            <span>{t("projects.tags.branding")}</span>
            <span>{t("projects.tags.react")}</span>
            <span>{t("projects.tags.research")}</span>
          </div>
        </div>

        <div className="project-action">
          <span>↗</span>
        </div>
      </div>

      <div
        className="project-card project-2"
        onClick={() => openProject("next")}
        data-cursor={t("cursor.view")}
      >
        <div
          className="project-bg"
          style={{ backgroundImage: `url(${nextImg})` }}
        />

        <div className="project-content">
          <span className="project-meta">02 — {t("projects.project")}</span>

          {t("projects.items.next")}

          <div className="project-tags">
            <span>{t("projects.tags.uxui")}</span>
            <span>{t("projects.tags.branding")}</span>
            <span>{t("projects.tags.react")}</span>
            <span>{t("projects.tags.research")}</span>
          </div>
        </div>

        <div className="project-action">
          <svg viewBox="0 0 24 24" width="16" height="16">
        <path
            d="M7 17L17 7M17 7H9M17 7V15"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      {zooming && (
        <div
          className="project-zoom-overlay"
          style={{ background: zoomTarget?.color }}
          ref={zoomOverlayRef}
        />
      )}
    </>
  );
}
