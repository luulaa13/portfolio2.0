import "./style/Navbar.css";
import logo from "../assets/avatar.ico";

import { useEffect, useState } from "react";
import { Menu} from "lucide-react";

function Navbar() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [query, setQuery] = useState("");

 const handleEnter = () => {
  if (filtered.length === 0) return;

  const match =
    filtered.find((a) =>
      a.label.toLowerCase() === query.toLowerCase()
    ) || filtered[0];

  handleNavigate(match.target);
};


  // ⌨️ Keyboard shortcut ⌘K
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

  const actions = [
    { label: "Proyectos", target: "#projects" },
    { label: "Stack", target: "#stack" },
    { label: "Contacto", target: "#contact" },
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

  return (
    <>
      {/* NAVBAR MINIMAL */}
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo">
            <img src={logo} alt="Logo" />
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
            <span>Disponible</span>
          </a>
        
        <button
          className="menu-btn"
          onClick={() => setCommandOpen(true)}
        >
          <Menu size={16} />

          <span className="menu-text">Menu</span>

          <span className="menu-shortcut">⌘K</span>
        </button>

        </div>
      </nav>

      {/* COMMAND MENU */}
      {commandOpen && (
        <div className="cmd-overlay" onClick={() => setCommandOpen(false)}>
          <div className="cmd-box" onClick={(e) => e.stopPropagation()}>
            
          <input
            autoFocus
            className="cmd-input"
            placeholder="Search or jump to..."
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
                <div className="cmd-empty">No results</div>
              )}
            </div>

            <div className="cmd-hint">
              Press ESC to close • ⌘K to open
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;