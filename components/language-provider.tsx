"use client";

import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { languageFromPath, localizedPath, type Language } from "@/data/localization";

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
}>({ language: "fr", setLanguage: () => undefined });

function storeLanguage(language: Language) {
  try {
    window.localStorage.setItem("portfolio-language", language);
  } catch {
    // The switch still works when browser storage is unavailable.
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const routeLanguage = languageFromPath(pathname);

  const setLanguage = useCallback((nextLanguage: Language) => {
    if (nextLanguage === languageFromPath(pathname)) return;
    storeLanguage(nextLanguage);
    window.location.assign(`${localizedPath(pathname, nextLanguage)}${window.location.hash}`);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.lang = routeLanguage;
    document.documentElement.dataset.language = routeLanguage;
    storeLanguage(routeLanguage);
  }, [routeLanguage]);

  const value = useMemo(() => ({ language: routeLanguage, setLanguage }), [routeLanguage, setLanguage]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const label = language === "fr" ? "Choisir la langue" : "Choose language";

  return <div className="language-toggle" role="group" aria-label={label} data-no-translate>
    <button type="button" className={language === "fr" ? "active" : ""} onClick={() => setLanguage("fr")} aria-pressed={language === "fr"}>FR</button>
    <button type="button" className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
  </div>;
}
