import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SectionHeading } from "@/components/content";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = { title: "Enseignement", description: "Approche pédagogique et domaines d’enseignement en systèmes embarqués, IA, réseaux industriels et validation." };

export default function TeachingPage() {
  const resourceUrl = (title: string) => portfolio.teaching.modules.find(course => course.title === title)?.url ?? portfolio.teaching.repository.url;

  return <main><PageIntro kicker="Enseignement" title="Former des ingénieurs capables d’expliquer leurs choix." lead={portfolio.teaching.philosophy} />
    <nav className="teaching-page-index shell" aria-label="Navigation de la page"><span>Accès rapide</span><a href="#methode">Méthode</a><a href="#modules">Modules</a><a href="#bibliotheque">Cours, TD & TP</a><a href="#depot">Dépôt GitHub</a></nav>
    <section className="teaching-method" id="methode"><div className="shell"><span className="kicker light">Méthode pédagogique</span><div className="learning-flow"><article><span>01</span><h2>Comprendre</h2><p>Relier le concept à l’architecture et aux contraintes du système.</p></article><article><span>02</span><h2>Expérimenter</h2><p>Mesurer, simuler, coder et observer les comportements réels.</p></article><article><span>03</span><h2>Justifier</h2><p>Comparer les options et argumenter les compromis techniques.</p></article><article><span>04</span><h2>Transmettre</h2><p>Documenter et présenter une solution claire, reproductible et testable.</p></article></div></div></section>
    <section className="section shell teaching-catalog" id="modules"><SectionHeading kicker="Enseignements documentés" title="Quinze modules, de la théorie au système fonctionnel." description="Les contenus ci-dessous sont extraits des supports fournis et du dépôt pédagogique GitHub : intitulés, objectifs, outils, niveaux et années académiques." />
      <div className="teaching-dashboard" aria-label="Synthèse des activités pédagogiques">{portfolio.teaching.repository.stats.map(stat => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
      <div className="course-grid teaching-course-grid">{portfolio.teaching.modules.map((course, index) => <article className="teaching-course-card" key={course.title}>
        <header><span>{String(index + 1).padStart(2, "0")}</span><div><small>{course.period}</small><strong>{course.institution}</strong></div></header>
        <p className="course-format">{course.level} · {course.format}</p><h2>{course.title}</h2><p className="course-description">{course.description}</p><p className="course-evidence">{course.evidence}</p>
        <div className="tag-row">{course.topics.map(topic => <small key={topic}>{topic}</small>)}</div><a className="text-link course-link" href={course.url} target="_blank" rel="noreferrer">Consulter les supports <span aria-hidden="true">↗</span></a>
      </article>)}</div>
    </section>
    <section className="section teaching-materials" id="bibliotheque"><div className="shell"><SectionHeading kicker="Ressources à consulter" title="Une bibliothèque classée en cours, TD et TP." description={portfolio.teaching.materialLibrary.description} />
      <div className="teaching-library-dashboard" aria-label="Synthèse des ressources pédagogiques">{portfolio.teaching.materialLibrary.stats.map(stat => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
      <nav className="teaching-library-nav" aria-label="Catégories de ressources"><span>Afficher directement</span>{portfolio.teaching.materialLibrary.categories.map(category => <a href={"#ressources-" + category.id} key={category.id}><b>{category.number}</b>{category.title}</a>)}</nav>
      <div className="teaching-resource-categories">{portfolio.teaching.materialLibrary.categories.map(category => <section className="teaching-resource-category" id={`ressources-${category.id}`} key={category.id}>
        <header><span>{category.number}</span><div><small>{category.items.length} {category.items.length > 1 ? "ensembles" : "ensemble"}</small><h2>{category.title}</h2><p>{category.description}</p></div></header>
        <div className="teaching-resource-grid">{category.items.map(item => <article className="teaching-resource-card" key={item.title}>
          <div className="teaching-resource-meta"><time>{item.period}</time><span>{item.institution}</span></div><h3>{item.title}</h3><p>{item.description}</p><div className="tag-row">{item.topics.map(topic => <small key={topic}>{topic}</small>)}</div>
          <div className="teaching-file-list">{item.files.map(file => <a href={file.url} target="_blank" rel="noreferrer" download key={file.url}><span>{file.label}</span><strong>{file.type} · {file.size}</strong><b aria-hidden="true">↓</b></a>)}</div>
        </article>)}</div>
      </section>)}</div>
    </div></section>
    <section className="section teaching-repository" id="depot"><div className="shell teaching-repository-inner"><div><span className="kicker light">Bibliothèque pédagogique</span><h2>{portfolio.teaching.repository.title}</h2><p>{portfolio.teaching.repository.description}</p><a className="button button-inverse" href={portfolio.teaching.repository.url} target="_blank" rel="noreferrer">Explorer le dépôt GitHub <span aria-hidden="true">↗</span></a></div><div className="resource-stack">
      <a href={resourceUrl("Automatique des systèmes linéaires")} target="_blank" rel="noreferrer"><span>Automatique & API</span><em>Cours, TD, TP et projets</em><b aria-hidden="true">↗</b></a>
      <a href={resourceUrl("Électronique analogique")} target="_blank" rel="noreferrer"><span>Électronique & électrotechnique</span><em>Analogique, numérique et machines</em><b aria-hidden="true">↗</b></a>
      <a href={resourceUrl("Introduction à la robotique mobile")} target="_blank" rel="noreferrer"><span>Robotique mobile</span><em>Cours, TP et mini-projet</em><b aria-hidden="true">↗</b></a>
      <a href={portfolio.teaching.repository.url} target="_blank" rel="noreferrer"><span>Programmation & données</span><em>SQL, Python et Linux</em><b aria-hidden="true">↗</b></a>
    </div></div></section>
    <section className="contact-strip"><div className="shell contact-strip-inner"><div><span className="kicker">Intervention pédagogique</span><h2>Besoin d’un cours, d’un atelier ou d’un encadrement ?</h2></div><Link className="button button-primary" href="/contact">Échanger sur le besoin ↗</Link></div></section>
  </main>;
}
