import { translations } from "@/data/translations";

export type Language = "fr" | "en";

export function translate(value: string, language: Language = "en") {
  if (language === "fr") return value;
  return translations[value] ?? value;
}

export function translateDeep<T>(value: T, language: Language = "en"): T {
  if (language === "fr") return value;
  if (typeof value === "string") return translate(value, language) as T;
  if (Array.isArray(value)) return value.map((item) => translateDeep(item, language)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateDeep(item, language)])) as T;
  }
  return value;
}

export function languageFromPath(pathname: string): Language {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
}

export function localizedPath(pathname: string, language: Language) {
  const normalized = pathname || "/";
  const withoutEnglishPrefix = normalized === "/en" ? "/" : normalized.replace(/^\/en(?=\/)/, "");
  if (language === "fr") return withoutEnglishPrefix;
  return withoutEnglishPrefix === "/" ? "/en" : `/en${withoutEnglishPrefix}`;
}

