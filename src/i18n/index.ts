import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import es from "../locales/es.json";
import en from "../locales/en.json";

i18n
  .use(LanguageDetector) // detecta idioma del navegador
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    fallbackLng: "es", // idioma por defecto
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["navigator", "localStorage"],
      caches: ["localStorage"], // guarda la elección
    },
  });

export default i18n;