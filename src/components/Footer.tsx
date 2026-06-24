import type { JSX } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaBehance,
} from "react-icons/fa";
import "./style/Footer.css";

export default function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <span>© 2026</span>
          <span>Designed & developed by Lucia.</span>
        </div>

        <div className="footer-right">
          <a
            href="https://github.com/luulaa13"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub/>
          </a>

          <a
            href="https://www.linkedin.com/in/luciauxui/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://www.behance.net/luciagarcia73"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Behance"
          >
           <FaBehance />
          </a>
        </div>
      </div>
    </footer>
  );
}