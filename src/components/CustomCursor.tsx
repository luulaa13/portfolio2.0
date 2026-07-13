import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./style/CustomCursor.css";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [role="link"], input, textarea, select, summary, [data-cursor]';

function themeFromPath(pathname: string): string {
  if (pathname.startsWith("/projects/artmus")) return "theme-artmus";
  if (pathname.startsWith("/projects/next")) return "theme-next";
  return "theme-home";
}

function CustomCursor() {
  const { pathname } = useLocation();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const moveCursor = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };

    const handleMouseOver = (e: Event) => {
      const target = (e.target as HTMLElement).closest(INTERACTIVE_SELECTOR);
      setActive(Boolean(target));
      setLabel(target?.getAttribute("data-cursor") || "");
    };

    const handleMouseOut = (e: Event) => {
      const related = (e as MouseEvent).relatedTarget as HTMLElement | null;
      if (related?.closest(INTERACTIVE_SELECTOR)) return;
      setActive(false);
      setLabel("");
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`custom-cursor ${themeFromPath(pathname)} ${
        active ? "custom-cursor--active" : ""
      }`}
    >
      <span className="custom-cursor-corner custom-cursor-corner--tl" />
      <span className="custom-cursor-corner custom-cursor-corner--tr" />
      <span className="custom-cursor-corner custom-cursor-corner--bl" />
      <span className="custom-cursor-corner custom-cursor-corner--br" />
      <span className="custom-cursor-dot" />
      {label && <span className="custom-cursor-label">{label}</span>}
    </div>
  );
}

export default CustomCursor;
