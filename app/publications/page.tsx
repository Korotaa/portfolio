import type { Metadata } from "next";
import { PageIntro } from "@/components/content";
import { CitationButton } from "@/components/citation-button";
import { publications } from "@/data/publications";

export const metadata: Metadata = {
  title: "Publications scientifiques",
  description: "Publications de Korota Arsène Coulibaly en Industrie 4.0, vision industrielle, systèmes multi-agents et jumeaux numériques.",
};

export default function PublicationsPage() {
  return <main>
    <PageIntro
      kicker="Production scientifique"
      title="Publications scientifiques"
      lead="Des travaux à l’interface entre systèmes embarqués, intelligence artificielle et industrie. Chaque référence est présentée avec sa problématique, son apport scientifique et sa valeur pour le terrain."
    />

    <section className="section shell publication-section">
      <div className="scientific-identity"><div><span className="kicker">Références vérifiées</span><h2>Chaque publication renvoie vers un éditeur, un DOI ou une archive ouverte.</h2></div><div className="scientific-identity-links"><a href="https://link.springer.com/chapter/10.1007/978-3-031-77043-2_2" target="_blank" rel="noreferrer">Springer DOI ↗</a><a href="https://arxiv.org/abs/2607.21577" target="_blank" rel="noreferrer">arXiv 2607.21577 ↗</a><a href="https://arxiv.org/abs/2607.21873" target="_blank" rel="noreferrer">arXiv 2607.21873 ↗</a></div></div>
      <div className="publication-dashboard" aria-label="Synthèse des publications">
        <div><strong>{publications.length}</strong><span>publications documentées</span></div>
        <div><strong>2024–2026</strong><span>période couverte</span></div>
        <div><strong>2</strong><span>prépublications ouvertes</span></div>
        <div><strong>1</strong><span>publication Springer</span></div>
      </div>

      <div className="publication-list">
        {publications.map((publication, index) => <article className="publication-card" id={publication.id} key={publication.id}>
          <header className="publication-card-header">
            <span className="publication-number">{String(index + 1).padStart(2, "0")}</span>
            <div className="publication-heading">
              <div className="publication-badges"><span>{publication.type}</span><span>{publication.status}</span><time>{publication.year}</time></div>
              <h2>{publication.title}</h2>
              <p className="publication-authors">{publication.authors.join(" · ")}</p>
              <p className="publication-venue">{publication.venue}</p>
            </div>
          </header>

          <p className="publication-summary">{publication.summary}</p>

          <div className="publication-highlights">
            {publication.highlights.map((highlight) => <div key={highlight.label}><strong>{highlight.value}</strong><span>{highlight.label}</span></div>)}
          </div>

          <div className="publication-analysis">
            <section><span>01</span><h3>Problématique de recherche</h3><p>{publication.researchProblem}</p></section>
            <section><span>02</span><h3>Apport scientifique</h3><p>{publication.scientificContribution}</p></section>
            <section><span>03</span><h3>Méthodologie</h3><p>{publication.methodology}</p></section>
            <section><span>04</span><h3>Utilité industrielle</h3><ul>{publication.industrialValue.map((item) => <li key={item}>{item}</li>)}</ul></section>
            <section className="publication-perspectives"><span>05</span><h3>Perspectives & prolongements</h3><ul>{publication.perspectives.map((item) => <li key={item}>{item}</li>)}</ul></section>
          </div>

          <div className="publication-keywords" aria-label="Mots-clés">{publication.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div>

          <footer className="publication-footer">
            <div><small>Citation recommandée</small><p>{publication.citation}</p><CitationButton citation={publication.citation} /></div>
            <div className="publication-actions">
              <a className="button button-primary" href={publication.primaryLink.url} target="_blank" rel="noreferrer">{publication.primaryLink.label} <span aria-hidden="true">↗</span></a>
              {publication.doi && <a className="text-link" href={publication.doi} target="_blank" rel="noreferrer">Accéder par le DOI</a>}
            </div>
          </footer>
        </article>)}
      </div>

      <p className="publication-source-note">Références fournies depuis ORCID et informations scientifiques vérifiées sur les pages officielles des éditeurs et archives ouvertes.</p>
    </section>
  </main>;
}
