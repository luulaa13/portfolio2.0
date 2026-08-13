import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Footer from "../../components/Footer";
import { DIARIO_ENTRIES, formatDiarioDate } from "./entries";
import { getWeeklyStreak } from "./streak";
import "../../components/style/Diario.css";

export default function Diario(): JSX.Element {
  const { t } = useTranslation();
  const streak = getWeeklyStreak();

  return (
    <div className="diario-page">
      <header className="diario-header">
        <Link to="/" className="diario-back">
          {t("diario.back")}
        </Link>
        <span className="diario-eyebrow">{t("diario.eyebrow")}</span>
        <h1 className="diario-title">{t("diario.title")}</h1>
        <p className="diario-subtitle">{t("diario.subtitle")}</p>

        <div className="diario-streak">
          <span className="diario-streak-num">{streak}</span>
          <div className="diario-streak-text">
            <span className="diario-streak-label">
              {streak === 1
                ? t("diario.streak.labelOne")
                : t("diario.streak.labelOther")}
            </span>
            <span className="diario-streak-rule">{t("diario.streak.rule")}</span>
          </div>
        </div>
      </header>

      <main className="diario-list">
        {DIARIO_ENTRIES.length === 0 ? (
          <p className="diario-empty">{t("diario.empty")}</p>
        ) : (
          DIARIO_ENTRIES.map((entry) => (
            <Link
              key={entry.slug}
              to={`/diario/${entry.slug}`}
              className="diario-row"
            >
              <span className="diario-date">{formatDiarioDate(entry.date)}</span>
              <span className="diario-entry-title">{entry.title}</span>
              <span className="diario-arrow">→</span>
            </Link>
          ))
        )}
      </main>

      <Footer />
    </div>
  );
}
