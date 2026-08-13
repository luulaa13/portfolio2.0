import "./style/Navbar.css";


import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import LanguageSwitch from "./LanguageSwitch";

function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isProjectPage = location.pathname.startsWith("/projects/");

  const [commandOpen, setCommandOpen] = useState(false);
  const [query, setQuery] = useState("");

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);

  // 🌍 actions ahora dependen de idioma
  const actions = [
    { label: t("nav.actions.projects"), href: "#projects" },
    { label: t("nav.actions.stack"), href: "#stack" },
    { label: t("nav.actions.about"), href: "#about" },
    { label: t("nav.actions.diario"), href: "/diario" },
    {
    label: "Newsletter",
    href: "https://luciauxui.substack.com/",
    external: true,
    },
    { label: t("nav.actions.contact"), href: "#contact"},
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

const handleNavigate = (item: (typeof actions)[number]) => {
  if (item.external) {
    window.open(item.href, "_blank", "noopener,noreferrer");
  } else if (item.href.startsWith("/")) {
    navigate(item.href);
  } else {
    document.querySelector(item.href)?.scrollIntoView({
      behavior: "smooth",
    });
  }

  setCommandOpen(false);
  setQuery("");
};
  const handleEnter = () => {
    if (filtered.length === 0) return;

    const match =
      filtered.find(
        (a) => a.label.toLowerCase() === query.toLowerCase()
      ) || filtered[0];

    handleNavigate(match);
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
      <nav className={`navbar ${scrolled ? "scrolled" : ""} ${(hidden || isProjectPage) ? "hidden" : ""}`}>

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
                    onClick={() => handleNavigate(item)}
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
