import "./style/Navbar.css";
import logo from "../assets/avatar.ico";

import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "lucide-react";
import LanguageSwitch from "./LanguageSwitch";

function Navbar() {
  const { t } = useTranslation();

  const [commandOpen, setCommandOpen] = useState(false);
  const [query, setQuery] = useState("");

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);

  // 🌍 actions ahora dependen de idioma
  const actions = [
    { label: t("nav.actions.projects"), target: "#projects" },
    { label: t("nav.actions.stack"), target: "#stack" },
    { label: t("nav.actions.about"), target: "#about" },
    { label: t("nav.actions.contact"), target: "#contact" },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleNavigate = (target: string) => {
    document.querySelector(target)?.scrollIntoView({
      behavior: "smooth",
    });
    setCommandOpen(false);
    setQuery("");
  };

  const handleEnter = () => {
    if (filtered.length === 0) return;

    const match =
      filtered.find(
        (a) => a.label.toLowerCase() === query.toLowerCase()
      ) || filtered[0];

    handleNavigate(match.target);
  };

  // ⌨️ Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen(true);
      }

      if (e.key === "Escape") {
        setCommandOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // scroll behavior
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;

      setScrolled(current > 30);

      if (current > lastScroll.current && current > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScroll.current = current;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""} ${hidden ? "hidden" : ""}`}>

        <div className="nav-left">
          <div className="logo">
            <p>LUCIA GARCIA</p>
          </div>
        </div>

        <div className="nav-right">
          <a
            href="https://www.linkedin.com/in/luciauxui/"
            target="_blank"
            rel="noopener noreferrer"
            className="status"
          >
            <span className="dot"></span>
            <span>{t("nav.available")}</span>
          </a>

          <button
            className="menu-btn"
            onClick={() => setCommandOpen(true)}
          >
            <Menu size={16} />
            <span className="menu-text">{t("nav.menu")}</span>
            <span className="menu-shortcut">⌘K</span>
          </button>
          <LanguageSwitch />

        </div>
      </nav>

      {/* COMMAND MENU */}
      {commandOpen && (
        <div className="cmd-overlay" onClick={() => setCommandOpen(false)}>
          <div className="cmd-box" onClick={(e) => e.stopPropagation()}>

            <input
              autoFocus
              className="cmd-input"
              placeholder={t("nav.search")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEnter();
                }
              }}
            />

            <div className="cmd-list">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <div
                    key={item.label}
                    className="cmd-item"
                    onClick={() => handleNavigate(item.target)}
                  >
                    {item.label}
                  </div>
                ))
              ) : (
                <div className="cmd-empty">
                  {t("nav.noResults")}
                </div>
              )}
            </div>

            <div className="cmd-hint">
              {t("nav.hint")}
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;