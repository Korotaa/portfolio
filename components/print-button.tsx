"use client";

import { useLanguage } from "@/components/language-provider";

export function PrintButton() {
  const { language } = useLanguage();
  return <button className="button button-inverse print-cv-button" type="button" onClick={() => window.print()}>{language === "en" ? "Print or save as PDF" : "Imprimer ou enregistrer en PDF"} <span aria-hidden="true">↓</span></button>;
}
