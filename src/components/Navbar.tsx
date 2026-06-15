import "./Navbar.css";
import logo from "../assets/avatar.ico";

import { useEffect, useState } from "react";

import { Moon, Sun } from "lucide-react";
import { Menu, X } from "lucide-react";

function Navbar() {
 const [darkMode, setDarkMode] = useState(false);
 const [menuOpen, setMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

return (
  <>
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <div className="status">
          <span className="dot"></span>
          <span>Disponible</span>
        </div>
      </div>

      <div className="nav-right">
        <ul className="nav-links">
          <li>Proyectos</li>
          <li>Sobre mí</li>
          <li>Stack</li>
          <li>Contacto</li>
        </ul>

        <button className="theme-btn" onClick={toggleDarkMode}>
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        >
        {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </nav>

   <div className={`mobile-overlay ${menuOpen ? "open" : ""}`}>
    <div className="mobile-menu-content">
        <a href="#projects" onClick={() => setMenuOpen(false)}>
        PROYECTOS
        </a>

        <a href="#about" onClick={() => setMenuOpen(false)}>
        SOBRE MÍ
        </a>

        <a href="#stack" onClick={() => setMenuOpen(false)}>
        STACK
        </a>

        <a href="#contact" onClick={() => setMenuOpen(false)}>
        CONTACTO
        </a>
    </div>
    </div>
  </>
);
}

export default Navbar;