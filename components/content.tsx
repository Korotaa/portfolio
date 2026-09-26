import Link from "next/link";
import Image from "next/image";
import { portfolio, type Project } from "@/data/portfolio";

export function SectionHeading({ kicker, title, description, light = false }: { kicker: string; title: string; description?: string; light?: boolean }) {
  return <div className={`section-heading ${light ? "light" : ""}`}><span className="kicker">{kicker}</span><div><h2>{title}</h2>{description && <p>{description}</p>}</div></div>;
}

export function ExpertiseGrid({ items = portfolio.expertise }: { items?: readonly { number: string; title: string; text: string; tags: readonly string[] }[] }) {
  return <div className="expertise-grid">{items.map((item) => <article className="expertise-card" key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><div className="tag-row">{item.tags.map(tag => <small key={tag}>{tag}</small>)}</div></article>)}</div>;
}

export function ProjectVisual({ project, index, priority = false, language = "fr" }: { project: Project; index: number; priority?: boolean; language?: "fr" | "en" }) {
  return <div className={`project-visual visual-${((index - 1) % 4) + 1}`}>
    <Image className="project-cover" src={project.coverImage} alt={project.coverAlt} fill priority={priority} unoptimized sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 720px" />
    <div className="project-cover-shade" aria-hidden="true" />
    <span className="visual-domain">{project.domain}</span>
    <small className="visual-note">{project.visualCredit ?? (language === "en" ? "Generated conceptual visual" : "Visuel conceptuel généré")}</small>
  </div>;
}

export function ProjectCard({ project, index, basePath = "/projets", language = "fr" }: { project: Project; index: number; basePath?: string; language?: "fr" | "en" }) {
  const labels = language === "en" ? { evidence: "Available evidence", study: "Detailed case study", sources: "Sources", visuals: "Visuals", action: "View case study", aria: "Explore the project" } : { evidence: "Éléments de preuve disponibles", study: "Étude détaillée", sources: "Sources", visuals: "Visuels", action: "Voir l’étude de cas", aria: "Découvrir le projet" };
  return <article className="project-card"><ProjectVisual project={project} index={index} language={language}/><div className="project-card-body"><div className="project-meta"><span>{project.period}</span><span>{project.domain}</span></div><h3>{project.title}</h3><p>{project.summary}</p><div className="project-proof"><strong>{project.metric.value}</strong><span>{project.metric.label}</span></div>
    <div className="project-evidence" aria-label={labels.evidence}><span>{labels.study}</span>{project.links.length > 0 && <span><strong>{project.links.length}</strong> {labels.sources}</span>}{project.gallery.length > 0 && <span><strong>{project.gallery.length}</strong> {labels.visuals}</span>}</div>
    <div className="tag-row">{project.technologies.slice(0, 3).map(tag => <small key={tag}>{tag}</small>)}</div><Link className="stretched-link" href={`${basePath}/${project.slug}`} aria-label={`${labels.aria} ${project.title}`}>{labels.action} <span aria-hidden="true">↗</span></Link></div></article>;
}

export function PageIntro({ kicker, title, lead }: { kicker: string; title: string; lead: string }) {
  return <section className="page-intro shell"><span className="kicker">{kicker}</span><h1>{title}</h1><p>{lead}</p></section>;
}
