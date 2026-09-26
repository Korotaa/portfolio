import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SectionHeading } from "@/components/content";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = { title: "Recherche & doctorat", description: "Recherche doctorale en systèmes embarqués intelligents, maintenance prédictive, systèmes multi-agents et jumeaux numériques." };

export default function ResearchPage() {
  const research = portfolio.research;
  return <main><PageIntro kicker="Recherche & doctorat" title={research.title} lead={research.plainLanguageAbstract} />
    <section className="research-identity"><div className="shell research-identity-grid"><div><span className="kicker light">Parcours</span><h2>{research.period}</h2></div><div><span className="kicker light">Affiliation</span><h2>{research.affiliation}</h2></div><p>L’intitulé officiel de la thèse et les noms des laboratoires pourront être ajoutés dans le fichier de contenu après validation.</p></div></section>
    <section className="section shell research-abstract"><SectionHeading kicker="Problématique" title="Décider localement, coordonner globalement." /><div className="research-text"><p>{research.scientificAbstract}</p><div className="method-cloud">{research.methods.map((method) => <span key={method}>{method}</span>)}</div></div></section>
    <section className="section research-contributions"><div className="shell"><SectionHeading kicker="Contributions" title="Une intelligence distribuée à plusieurs niveaux." />
      <div className="architecture-flow" aria-label="Architecture de recherche"><div><span>01</span><strong>Edge</strong><small>Détection & décision locale</small></div><i>→</i><div><span>02</span><strong>Fog</strong><small>Coordination multi-agents</small></div><i>→</i><div><span>03</span><strong>Cloud</strong><small>Jumeau global & RUL</small></div></div>
      <ol className="contribution-list">{research.contributions.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}</ol>
    </div></section>
    <section className="section shell research-links"><div><span className="kicker">Production scientifique</span><h2>Les publications et communications sont regroupées dans un espace dédié.</h2></div><Link className="button button-primary" href="/publications">Voir les publications →</Link></section>
  </main>;
}
