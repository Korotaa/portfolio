"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { LanguageToggle, useLanguage } from "@/components/language-provider";
import { portfolio } from "@/data/portfolio";
import { localizedPath, translate } from "@/data/localization";

function Brand({ light = false }: { light?: boolean }) {
  const { language } = useLanguage();
  return <Link className={`brand ${light ? "brand-light" : ""}`} href={localizedPath("/", language)} aria-label={translate("Accueil — Korota Arsène Coulibaly", language)}>
    <span className="brand-mark"><Image src={portfolio.profile.logo} alt="" width={42} height={42} priority /></span>
    <span>Korota Arsène<br/><small>Coulibaly</small></span>
  </Link>;
}

export function Header() {
  const { language } = useLanguage();
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const closeMobileMenu = () => mobileMenuRef.current?.removeAttribute("open");
  const home = localizedPath("/", language);
  const cv = portfolio.profile.cvDocuments[0];
  const isEnglish = language === "en";
  const links = isEnglish ? [
    { label: "Profile", href: `${home}#profil` },
    { label: "Projects", href: `${home}#projets` },
    { label: "Journey", href: `${home}#parcours` },
    { label: "Contact", href: `${home}#contact` },
  ] : [
    { label: "Profil", href: `${home}#profil` },
    { label: "Projets", href: `${home}#projets` },
    { label: "Parcours", href: `${home}#parcours` },
    { label: "Contact", href: `${home}#contact` },
  ];

  return <header className="site-header"><div className="shell nav-wrap">
    <Brand />
    <nav className="desktop-nav recruiter-nav" aria-label={isEnglish ? "Main navigation" : "Navigation principale"}>
      {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
    </nav>
    <LanguageToggle />
    <a className="nav-cv" href={cv.file} download>{isEnglish ? "Resume" : "CV"} <span aria-hidden="true">↓</span></a>
    <details className="mobile-menu" ref={mobileMenuRef}><summary aria-label={isEnglish ? "Open menu" : "Ouvrir le menu"}><span/><span/><span/></summary><nav aria-label={isEnglish ? "Mobile navigation" : "Navigation mobile"}>
      <div className="mobile-menu-head"><span>Menu</span><LanguageToggle /></div>
      {links.map((link) => <Link key={link.href} href={link.href} onClick={closeMobileMenu}>{link.label}</Link>)}
      <a className="mobile-cv" href={cv.file} download onClick={closeMobileMenu}>{isEnglish ? "Download resume" : "Télécharger le CV"} <span aria-hidden="true">↓</span></a>
    </nav></details>
  </div></header>;
}

export function Footer() {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const home = localizedPath("/", language);
  const loc = (path: string) => localizedPath(path, language);
  const essentials = isEnglish ? [
    { label: "Profile", href: `${home}#profil` },
    { label: "Projects", href: `${home}#projets` },
    { label: "Journey", href: `${home}#parcours` },
    { label: "Contact", href: `${home}#contact` },
  ] : [
    { label: "Profil", href: `${home}#profil` },
    { label: "Projets", href: `${home}#projets` },
    { label: "Parcours", href: `${home}#parcours` },
    { label: "Contact", href: `${home}#contact` },
  ];
  const details = isEnglish ? [
    { label: "Research", href: loc("/recherche") },
    { label: "Publications", href: loc("/publications") },
    { label: "Teaching", href: loc("/enseignement") },
    { label: "Academy", href: loc("/academie") },
  ] : [
    { label: "Recherche", href: loc("/recherche") },
    { label: "Publications", href: loc("/publications") },
    { label: "Enseignement", href: loc("/enseignement") },
    { label: "Académie", href: loc("/academie") },
  ];

  return <footer className="site-footer"><div className="shell footer-grid">
    <div><Brand light/><p>{translate(portfolio.profile.professionalTitle, language)}</p></div>
    <div><h2>{isEnglish ? "Essential" : "Essentiel"}</h2>{essentials.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div>
    <div><h2>{isEnglish ? "Detailed profile" : "Profil détaillé"}</h2>{details.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div>
    <div><h2>Contact</h2><a href={`mailto:${portfolio.profile.publicEmail}`}>{portfolio.profile.publicEmail}</a><span>{translate(portfolio.profile.location, language)}</span><Link className="text-link light" href={loc("/contact")}>{isEnglish ? "Contact form →" : "Formulaire de contact →"}</Link></div>
  </div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} Korota Arsène Coulibaly</span><span>{isEnglish ? "Embedded systems · Computer vision · Edge AI" : "Systèmes embarqués · Vision industrielle · Edge AI"}</span></div></footer>;
}
