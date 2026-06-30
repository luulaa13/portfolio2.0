import { useTranslation } from "react-i18next";
import "./style/LanguageSwitch.css";

export default function LanguageSwitch() {
  const { i18n } = useTranslation();

  const current = i18n.language.startsWith("en") ? "en" : "es";

  const toggleLanguage = () => {
    const next = current === "en" ? "es" : "en";
    i18n.changeLanguage(next);
  };

  return (
    <button className="lang-toggle" onClick={toggleLanguage}>
      {current.toUpperCase()}
    </button>
  );
}