"use client";

import { useState } from "react";
import { useLanguage } from "@/components/language-provider";

export function CitationButton({ citation }: { citation: string }) {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  async function copyCitation() {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return <button className="citation-copy" type="button" onClick={copyCitation} data-no-translate>
    <span aria-live="polite">{copied ? (language === "en" ? "Citation copied" : "Citation copiée") : (language === "en" ? "Copy citation" : "Copier la citation")}</span>
    <b aria-hidden="true">{copied ? "✓" : "⧉"}</b>
  </button>;
}
