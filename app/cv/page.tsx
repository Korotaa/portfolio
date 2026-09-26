import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageIntro } from "@/components/content";
import { PrintButton } from "@/components/print-button";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = { title: "CV & documents", description: "Synthèse du profil, des compétences et des documents professionnels de Korota Arsène Coulibaly." };

export default function CvPage() {
  return <main><PageIntro kicker="CV & documents" title="Une synthèse claire du profil." lead="Le parcours, les compétences et les documents sont regroupés ici. Le CV joint est disponible au téléchargement." />
    <section className="section shell cv-layout"><div className="cv-sheet">
      <header><div className="cv-monogram"><Image src={portfolio.profile.logo} alt="" width={52} height={52} /></div><div><h2>{portfolio.profile.fullName}</h2><p>{portfolio.profile.professionalTitle}</p></div></header>
      <div className="cv-summary"><span className="kicker">Profil</span><p>{portfolio.profile.shortBio}</p></div>
      <div className="cv-columns"><div><span className="kicker">Expérience</span>{portfolio.experiences.map(item => <article key={item.company}><small>{item.period}</small><h3>{item.role}</h3><p>{item.company} · {item.location}</p></article>)}</div><div><span className="kicker">Expertise</span>{portfolio.expertise.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.tags.join(" · ")}</p></article>)}</div></div>
    </div><aside className="document-panel"><span className="kicker light">Documents</span><h2>Téléchargements</h2><div className="document-item"><div><span className="document-language">FR / EN</span><strong>CV web bilingue</strong><small>Version imprimable et toujours à jour</small></div><span>↗</span></div><PrintButton />{portfolio.profile.cvDocuments.length ? portfolio.profile.cvDocuments.map(document => <a className="document-item" key={document.file} href={document.file} download><div><span className="document-language">{document.language === "English" ? "EN" : "FR"}</span><strong>{document.label}</strong><small>PDF · <span>Mis à jour le</span> {document.updatedAt}</small></div><span>↓</span></a>) : null}<p>Le document public présente le parcours, les compétences techniques et les principales réalisations. Une version adaptée à une opportunité précise peut être demandée par e-mail.</p><Link className="button button-inverse" href="/contact">Demander le CV par e-mail</Link></aside></section>
    <section className="section shell certificates"><div><span className="kicker">Certifications & distinctions</span><h2>Des informations vérifiées avant publication.</h2></div><p>Les certifications, prix, bourses et responsabilités seront présentés avec leur organisme, leur date et, lorsque disponible, un justificatif public.</p></section>
  </main>;
}
