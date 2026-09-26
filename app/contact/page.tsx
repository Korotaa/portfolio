import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/content";
import { socialLogos } from "@/data/brand-assets";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = { title: "Contact", description: "Contacter Korota Arsène Coulibaly pour un projet industriel, scientifique, pédagogique ou une opportunité professionnelle." };

export default function ContactPage() {
  const activeSocials = portfolio.profile.socialLinks.filter(item => item.url);
  return <main><PageIntro kicker="Prendre contact" title="Commençons par le problème à résoudre." lead="Projet industriel, collaboration scientifique, intervention pédagogique ou opportunité professionnelle : présentez-moi le contexte et nous identifierons la prochaine étape utile." />
    <section className="section shell contact-layout"><aside><span className="kicker">Coordonnées</span><a className="contact-email" href={`mailto:${portfolio.profile.publicEmail}`}>{portfolio.profile.publicEmail}</a><span>{portfolio.profile.location}</span><div className="availability"><i /><p>{portfolio.profile.availability}</p></div><div className="social-list">{activeSocials.length ? activeSocials.map(item => {
      const logo = socialLogos[item.type];
      return <a key={item.type} href={item.url} rel="noreferrer" target="_blank"><span>{logo && <Image src={logo.src} alt={logo.alt} width={20} height={20} unoptimized />}{item.label}</span><b aria-hidden="true">↗</b></a>;
    }) : <p>Les liens GitHub, GitLab, LinkedIn et ORCID seront affichés ici après renseignement.</p>}</div></aside><ContactForm email={portfolio.profile.publicEmail} /></section>
  </main>;
}
