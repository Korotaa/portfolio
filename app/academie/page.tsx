import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro, SectionHeading } from "@/components/content";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Académie",
  description: "Formations, cours et certifications de Korota Arsène Coulibaly.",
};

export default function AcademyPage() {
  const education = portfolio.academia.filter((item) => item.type === "Formation");
  const courses = portfolio.academia.filter((item) => item.type === "Cours");
  const certifications = portfolio.academia.filter((item) => item.type === "Certification");

  return <main>
    <PageIntro kicker="Académie" title="Apprendre, expérimenter, puis transmettre." lead="Cette chronologie rassemble les formations diplômantes et les cours confirmés dans le CV. Sa source de données centralisée permet d’ajouter facilement une nouvelle formation, un cours ou une certification." />

    <section className="section shell academic-path">
      <SectionHeading kicker="Chronologie" title="Une expertise construite par étapes." description="Du socle scientifique à la recherche doctorale en systèmes embarqués intelligents." />
      <div className="academic-timeline">{education.map((item, index) => <article key={item.id} className="academic-step">
        <time>{item.period}</time><div className="academic-marker"><span>0{index + 1}</span></div>
        <div className="academy-card">
          <div className="academy-card-head">
            <div className="academy-card-meta"><span>Formation</span><span>{item.institution}</span></div>
            <a className="academy-institution-logo" href={item.institutionUrl} target="_blank" rel="noreferrer" aria-label={item.logoAlt}>
              <Image src={item.logo} alt={item.logoAlt} width={240} height={100} unoptimized />
            </a>
          </div>
          <h3>{item.title}</h3><p>{item.description}</p>
        </div>
      </article>)}</div>
    </section>

    <section className="section academy-courses"><div className="shell">
      <SectionHeading kicker="Cours & ateliers" title="Des enseignements ancrés dans la pratique." description="Robotique, systèmes autonomes, IoT multi-capteurs et vision Edge AI." />
      <div className="academy-course-grid">{courses.map((item, index) => <article className="academy-course-card" key={item.id}>
        <span>0{index + 1}</span><small>{item.period}</small><h3>{item.title}</h3><strong>{item.institution}</strong><p>{item.description}</p>
      </article>)}</div>
    </div></section>

    <section className="section shell certification-strip"><div><span className="kicker">Certifications</span><h2>Des justificatifs vérifiés uniquement.</h2></div>
      {certifications.length ? <div className="academy-grid">{certifications.map((item) => <article className="academy-card" key={item.id}><div className="academy-card-meta"><span>{item.period}</span><span>{item.institution}</span></div><h3>{item.title}</h3><p>{item.description}</p></article>)}</div> : <div className="certification-empty"><strong>En cours de vérification</strong><p>Les certifications seront publiées ici dès que leurs intitulés, organismes, dates et justificatifs auront été confirmés.</p></div>}
    </section>
  </main>;
}
