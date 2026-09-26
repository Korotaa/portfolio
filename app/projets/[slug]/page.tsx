import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProjectVisual } from "@/components/content";
import { portfolio } from "@/data/portfolio";

export function generateStaticParams() { return portfolio.projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolio.projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary, images: [{ url: project.coverImage, width: 1400, height: 875, alt: project.coverAlt }] },
    twitter: { title: project.title, description: project.summary, images: [project.coverImage] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = portfolio.projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const index = portfolio.projects.findIndex((item) => item.slug === slug) + 1;
  const next = portfolio.projects[index % portfolio.projects.length];

  return <main>
    <section className="case-hero shell"><div><Link className="breadcrumb" href="/projets">← Tous les projets</Link><span className="kicker">{project.domain} · {project.period}</span><h1>{project.title}</h1><p>{project.summary}</p><div className="case-proof"><strong>{project.metric.value}</strong><span>{project.metric.label}</span></div></div><ProjectVisual project={project} index={index} priority /></section>
    <section className="project-verification shell" aria-label="Preuves du projet"><div><strong>{project.metric.value}</strong><span>Indicateur documenté</span></div><div><strong>{project.links.length}</strong><span>source{project.links.length > 1 ? "s" : ""} publique{project.links.length > 1 ? "s" : ""}</span></div><div><strong>{project.gallery.length}</strong><span>visuel{project.gallery.length > 1 ? "s" : ""} documenté{project.gallery.length > 1 ? "s" : ""}</span></div></section>
    <section className="case-body shell">
      <aside><span className="kicker">Technologies</span><div className="tech-stack">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div></aside>
      <div className="case-content">
        <article><span>01</span><h2>Contexte</h2><p>{project.context}</p></article>
        <article><span>02</span><h2>Problème</h2><p>{project.problem}</p></article>
        <article><span>03</span><h2>Ma contribution</h2><p>{project.personalRole}</p></article>
        <article><span>04</span><h2>Solution</h2><p>{project.solution}</p></article>
        <article className="result-panel"><span>05</span><h2>Résultats</h2><ul>{project.results.map((result) => <li key={result}>{result}</li>)}</ul></article>
        {project.gallery.length > 0 && <article className="project-gallery">{project.gallery.map((media) => <figure key={media.src}><Image src={media.src} alt={media.alt} width={1200} height={800} unoptimized sizes="(max-width: 720px) 100vw, 760px"/><figcaption>{media.caption}</figcaption></figure>)}</article>}
        {project.links.length > 0 && <article className="project-links"><span>Liens</span><h2>Ressources du projet</h2>{project.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</article>}
      </div>
    </section>
    <section className="next-project"><div className="shell"><span className="kicker light">Projet suivant</span><Link href={`/projets/${next.slug}`}>{next.title} <span aria-hidden="true">→</span></Link></div></section>
  </main>;
}
