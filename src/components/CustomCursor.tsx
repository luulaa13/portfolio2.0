import { useEffect, useState } from "react";
import "./style/CustomCursor.css";

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [label, setLabel] = useState("");

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      const cursorText = target.closest("[data-cursor]")?.getAttribute("data-cursor");

      setLabel(cursorText || "");
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${label ? "active" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {label}
    </div>
  );
}

export default CustomCursor;