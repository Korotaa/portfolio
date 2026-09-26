import type { Metadata } from "next";
import { Footer, Header } from "@/components/navigation";
import { LanguageProvider } from "@/components/language-provider";
import { portfolio } from "@/data/portfolio";
import { publications } from "@/data/publications";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Portfolio — Korota Arsène Coulibaly", template: "%s — Korota Arsène Coulibaly" },
  description: portfolio.profile.shortBio,
  keywords: ["systèmes embarqués", "vision par ordinateur", "Edge AI", "DeepStream", "STM32", "enseignant", "recherche"],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { type: "website", locale: "fr_FR", title: "Portfolio — Korota Arsène Coulibaly", description: portfolio.profile.tagline, images: [{ url: "/og.png", width: 1200, height: 630, alt: "Korota Arsène Coulibaly — Systèmes embarqués, vision intelligente et Edge AI" }] },
  twitter: { card: "summary_large_image", title: "Portfolio — Korota Arsène Coulibaly", description: portfolio.profile.tagline, images: ["/og.png"] },
  alternates: { canonical: "/", languages: { "fr-FR": "/", "en-US": "/en" } },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = { "@context": "https://schema.org", "@graph": [
    { "@type": "Person", "@id": "#korota-arsene-coulibaly", name: portfolio.profile.fullName, jobTitle: portfolio.profile.professionalTitle, email: `mailto:${portfolio.profile.publicEmail}`, address: { "@type": "PostalAddress", addressLocality: "Casablanca", addressCountry: "MA" }, knowsAbout: portfolio.profile.expertise, sameAs: portfolio.profile.socialLinks.filter((item) => item.url).map((item) => item.url) },
    ...publications.map((publication) => ({ "@type": "ScholarlyArticle", headline: publication.title, datePublished: publication.year, author: { "@id": "#korota-arsene-coulibaly" }, sameAs: publication.primaryLink.url, identifier: publication.doi ?? publication.primaryLink.url, keywords: publication.keywords.join(", ") })),
  ] };
  return <html lang="fr"><body><LanguageProvider><a className="skip-link" href="#main-content">Aller au contenu</a><Header /><div id="main-content">{children}</div><Footer /></LanguageProvider><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></body></html>;
}
