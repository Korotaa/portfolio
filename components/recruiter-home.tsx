import Image from "next/image";
import Link from "next/link";
import { companyLogos, socialLogos } from "@/data/brand-assets";
import { localizedPath, translateDeep, type Language } from "@/data/localization";
import { portfolio } from "@/data/portfolio";
import { publications } from "@/data/publications";

export function RecruiterHome({ language }: { language: Language }) {
  const isEnglish = language === "en";
  const content = isEnglish ? translateDeep(portfolio, "en") : portfolio;
  const articles = isEnglish ? translateDeep(publications, "en") : publications;
  const selectedProjectSlugs = ["queue-monitoring-edge-ai", "testeur-faisceaux-connecteurs", "carte-relais-usb-rp2040"];
  const featured = selectedProjectSlugs.flatMap((slug) => {
    const project = content.projects.find((item) => item.slug === slug);
    return project ? [project] : [];
  });
  const degrees = content.academia.filter((item) => "logo" in item).slice(0, 3);
  const cv = content.profile.cvDocuments[0];
  const loc = (path: string) => localizedPath(path, language);

  const labels = isEnglish ? {
    profile: "Embedded systems · Computer vision · Edge AI",
    role: "Embedded Systems & Intelligent Vision Engineer",
    summary: "I design deployable industrial systems, from electronics and firmware to computer vision on Edge platforms.",
    availability: "Available for industrial, scientific, and educational collaborations",
    projectsAction: "View selected projects",
    cvAction: "Download resume",
    proofLabel: "Profile at a glance",
    metrics: [
      { value: "4+ years", label: "Embedded engineering" },
      { value: "5 services", label: "Orchestrated Edge AI stack" },
      { value: String(articles.length), label: "Scientific publications" },
      { value: "15", label: "Courses and labs documented" },
    ],
    projectsKicker: "Selected work",
    projectsTitle: "Three projects, three concrete engineering problems.",
    projectsLead: "The essentials are visible here. Each case study provides the architecture, my contribution, and the available evidence.",
    caseStudy: "View case study",
    allProjects: "View all projects",
    journeyKicker: "Professional journey",
    journeyTitle: "Experience and skills at a glance.",
    experience: "Experience",
    expertise: "Core expertise",
    education: "Education",
    fullJourney: "View full experience",
    fullEducation: "View academic journey",
    researchKicker: "Research & teaching",
    researchTitle: "Applied research, documented publications, and project-based teaching.",
    doctoralResearch: "Doctoral research",
    publications: "Publications",
    teaching: "Teaching",
    researchAction: "Explore research",
    publicationsAction: "View all publications",
    teachingAction: "Browse courses and labs",
    contactKicker: "Contact",
    contactTitle: "Need an engineer who can connect hardware, AI, and industrial constraints?",
    contactLead: "Let’s discuss an embedded, computer-vision, research, or teaching project.",
    contactAction: "Contact me",
  } : {
    profile: "Systèmes embarqués · Vision industrielle · Edge AI",
    role: "Ingénieur en systèmes embarqués & vision intelligente",
    summary: "Je conçois des systèmes industriels déployables, de l’électronique et du firmware jusqu’à la vision par ordinateur sur plateformes Edge.",
    availability: "Disponible pour des collaborations industrielles, scientifiques et pédagogiques",
    projectsAction: "Voir les projets sélectionnés",
    cvAction: "Télécharger le CV",
    proofLabel: "Le profil en un regard",
    metrics: [
      { value: "4+ ans", label: "d’ingénierie embarquée" },
      { value: "5 services", label: "stack Edge AI orchestrée" },
      { value: String(articles.length), label: "publications scientifiques" },
      { value: "15", label: "cours et TP documentés" },
    ],
    projectsKicker: "Travaux sélectionnés",
    projectsTitle: "Trois projets, trois problèmes d’ingénierie concrets.",
    projectsLead: "L’essentiel est visible ici. Chaque étude détaille l’architecture, ma contribution et les preuves disponibles.",
    caseStudy: "Voir l’étude de cas",
    allProjects: "Voir tous les projets",
    journeyKicker: "Parcours professionnel",
    journeyTitle: "L’expérience et les compétences en un regard.",
    experience: "Expérience",
    expertise: "Expertises clés",
    education: "Parcours universitaire",
    fullJourney: "Voir le parcours complet",
    fullEducation: "Voir le parcours académique",
    researchKicker: "Recherche & enseignement",
    researchTitle: "Une recherche appliquée, des publications documentées et une pédagogie par projet.",
    doctoralResearch: "Recherche doctorale",
    publications: "Publications",
    teaching: "Enseignement",
    researchAction: "Découvrir la recherche",
    publicationsAction: "Voir toutes les publications",
    teachingAction: "Consulter les cours et TP",
    contactKicker: "Contact",
    contactTitle: "Besoin d’un ingénieur capable de relier matériel, IA et contraintes industrielles ?",
    contactLead: "Échangeons autour d’un projet embarqué, de vision, de recherche ou d’enseignement.",
    contactAction: "Me contacter",
  };

  return <main className="recruiter-home">
    <section className="recruiter-hero" id="profil">
      <div className="shell recruiter-hero-grid">
        <div className="recruiter-hero-copy">
          <span className="recruiter-kicker">{labels.profile}</span>
          <h1>{content.profile.fullName}</h1>
          <p className="recruiter-role">{labels.role}</p>
          <p className="recruiter-summary">{labels.summary}</p>
          <div className="recruiter-expertise" aria-label={isEnglish ? "Main areas of expertise" : "Expertises principales"}>
            {content.profile.expertise.map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="recruiter-actions">
            <a className="button button-primary" href="#projets">{labels.projectsAction} <span aria-hidden="true">↓</span></a>
            <a className="button recruiter-cv-button" href={cv.file} download>{labels.cvAction} <span aria-hidden="true">↓</span></a>
          </div>
          <div className="recruiter-socials">
            {content.profile.socialLinks.filter((item) => item.url).map((item) => {
              const logo = socialLogos[item.type];
              return <a key={item.type} href={item.url} target="_blank" rel="noreferrer">
                {logo && <Image src={logo.src} alt={logo.alt} width={17} height={17} unoptimized />}
                {item.label}<span aria-hidden="true">↗</span>
              </a>;
            })}
          </div>
        </div>

        <aside className="recruiter-portrait-card" aria-label={isEnglish ? "Professional profile" : "Profil professionnel"}>
          <div className="recruiter-portrait">
            <Image src={content.profile.profilePhoto} alt={content.profile.profilePhotoAlt} fill priority unoptimized sizes="(max-width: 760px) 82vw, 360px" />
          </div>
          <div className="recruiter-status"><span aria-hidden="true" />{labels.availability}</div>
          <div className="recruiter-location"><strong>{content.profile.location}</strong><span>{content.profile.publicEmail}</span></div>
        </aside>
      </div>
    </section>

    <section className="recruiter-proof" aria-label={labels.proofLabel}>
      <dl className="shell recruiter-proof-grid">
        {labels.metrics.map((item) => <div key={item.label}><dt>{item.value}</dt><dd>{item.label}</dd></div>)}
      </dl>
    </section>

    <section className="recruiter-section shell" id="projets">
      <header className="recruiter-section-heading">
        <div><span className="recruiter-kicker">{labels.projectsKicker}</span><h2>{labels.projectsTitle}</h2></div>
        <p>{labels.projectsLead}</p>
      </header>
      <div className="recruiter-project-grid">
        {featured.map((project) => <article className="recruiter-project-card" key={project.slug}>
          <Link className="recruiter-project-image" href={loc(`/projets/${project.slug}`)} aria-label={`${labels.caseStudy} — ${project.title}`}>
            <Image src={project.coverImage} alt={project.coverAlt} fill unoptimized sizes="(max-width: 760px) 100vw, 33vw" />
            <span>{project.domain}</span>
          </Link>
          <div className="recruiter-project-body">
            <div className="recruiter-project-meta"><span>{project.period}</span><strong>{project.metric.value}</strong></div>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <div className="recruiter-project-tech">{project.technologies.slice(0, 3).map((item) => <span key={item}>{item}</span>)}</div>
            <Link className="recruiter-link" href={loc(`/projets/${project.slug}`)}>{labels.caseStudy} <span aria-hidden="true">→</span></Link>
          </div>
        </article>)}
      </div>
      <div className="recruiter-section-action"><Link className="button button-secondary" href={loc("/projets")}>{labels.allProjects} <span aria-hidden="true">→</span></Link></div>
    </section>

    <section className="recruiter-journey" id="parcours">
      <div className="shell recruiter-section">
        <header className="recruiter-section-heading">
          <div><span className="recruiter-kicker">{labels.journeyKicker}</span><h2>{labels.journeyTitle}</h2></div>
        </header>
        <div className="recruiter-journey-grid">
          <div className="recruiter-experience-panel">
            <h3>{labels.experience}</h3>
            <div className="recruiter-experience-list">
              {content.experiences.map((item) => {
                const logo = companyLogos[item.company];
                return <article key={`${item.company}-${item.role}`}>
                  <div className="recruiter-experience-identity">
                    {logo && <span className="recruiter-company-logo"><Image src={logo.src} alt={logo.alt} width={92} height={42} unoptimized /></span>}
                    <time>{item.period}</time>
                  </div>
                  <div><h4>{item.role}</h4><strong>{item.company} · {item.location}</strong><p>{item.points[0]}</p></div>
                </article>;
              })}
            </div>
            <Link className="recruiter-link" href={loc("/experience")}>{labels.fullJourney} <span aria-hidden="true">→</span></Link>
          </div>
          <div className="recruiter-skills-panel" id="competences">
            <h3>{labels.expertise}</h3>
            <div className="recruiter-skills-grid">
              {content.expertise.map((item) => <article key={item.number}>
                <header><span>{item.number}</span><h4>{item.title}</h4></header>
                <p>{item.text}</p>
                <div className="recruiter-skill-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>)}
            </div>
            <a className="button recruiter-cv-button" href={cv.file} download>{labels.cvAction} <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="recruiter-academic-panel">
          <div className="recruiter-academic-heading"><h3>{labels.education}</h3><Link className="recruiter-link" href={loc("/academie")}>{labels.fullEducation} <span aria-hidden="true">→</span></Link></div>
          <div className="recruiter-academic-grid">
            {degrees.map((item) => <article key={item.id}>
              <span className="recruiter-university-logo"><Image src={item.logo} alt={item.logoAlt} width={130} height={58} unoptimized /></span>
              <div><time>{item.period}</time><h4>{item.title}</h4><strong>{item.institution}</strong></div>
            </article>)}
          </div>
        </div>
      </div>
    </section>

    <section className="recruiter-section shell recruiter-insight" id="recherche">
      <header className="recruiter-section-heading">
        <div><span className="recruiter-kicker">{labels.researchKicker}</span><h2>{labels.researchTitle}</h2></div>
      </header>
      <div className="recruiter-insight-grid">
        <article className="recruiter-research-card">
          <span>01</span><h3>{labels.doctoralResearch}</h3><strong>{content.research.title}</strong><p>{content.research.plainLanguageAbstract}</p>
          <Link className="recruiter-link" href={loc("/recherche")}>{labels.researchAction} <span aria-hidden="true">→</span></Link>
        </article>
        <article className="recruiter-publication-card">
          <span>02</span><h3>{labels.publications}</h3>
          <div>{articles.slice(0, 3).map((article) => <a key={article.title} href={article.primaryLink.url} target="_blank" rel="noreferrer"><time>{article.year}</time><strong>{article.title}</strong><span aria-hidden="true">↗</span></a>)}</div>
          <Link className="recruiter-link" href={loc("/publications")}>{labels.publicationsAction} <span aria-hidden="true">→</span></Link>
        </article>
        <article className="recruiter-teaching-card">
          <span>03</span><h3>{labels.teaching}</h3>
          <div>{content.teaching.modules.slice(0, 4).map((course) => <div key={course.title}><strong>{course.title}</strong><small>{course.institution}</small></div>)}</div>
          <Link className="recruiter-link" href={loc("/enseignement")}>{labels.teachingAction} <span aria-hidden="true">→</span></Link>
        </article>
      </div>
    </section>

    <section className="recruiter-contact" id="contact">
      <div className="shell recruiter-contact-grid">
        <div><span className="recruiter-kicker">{labels.contactKicker}</span><h2>{labels.contactTitle}</h2><p>{labels.contactLead}</p></div>
        <div className="recruiter-contact-actions"><Link className="button" href={loc("/contact")}>{labels.contactAction} <span aria-hidden="true">↗</span></Link><a href={`mailto:${content.profile.publicEmail}`}>{content.profile.publicEmail}</a></div>
      </div>
    </section>
  </main>;
}
