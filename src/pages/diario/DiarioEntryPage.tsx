import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Footer from "../../components/Footer";
import { formatDiarioDate, type DiarioEntry } from "./entries";
import "../../components/style/Diario.css";

interface DiarioEntryPageProps {
  entry: DiarioEntry;
}

export default function DiarioEntryPage({
  entry,
}: DiarioEntryPageProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="diario-page">
      <header className="diario-header">
        <Link to="/diario" className="diario-back">
          {t("diario.backToList")}
        </Link>
        <span className="diario-eyebrow">{formatDiarioDate(entry.date)}</span>
        <h1 className="diario-title">{entry.title}</h1>
      </header>

      <main className="diario-entry-body">
        {entry.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </main>

      <Footer />
    </div>
  );
}
