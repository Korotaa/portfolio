import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CitationButton } from "@/components/citation-button";
import { RecruiterHome } from "@/components/recruiter-home";
import { ContactForm } from "@/components/contact-form";
import { ExpertiseGrid, PageIntro, ProjectCard, ProjectVisual, SectionHeading } from "@/components/content";
import { PrintButton } from "@/components/print-button";
import { ProjectFilter } from "@/components/project-filter";
import { companyLogos, socialLogos } from "@/data/brand-assets";
import { translate, translateDeep } from "@/data/localization";
import { portfolio } from "@/data/portfolio";
import { publications } from "@/data/publications";

const content = translateDeep(portfolio);
const translatedPublications = translateDeep(publications);
const tr = (value: string) => translate(value);

type PageParams = { path?: string[] };

function frenchPath(path: string[]) {
  return path.length ? `/${path.join("/")}` : "/";
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { path = [] } = await params;
  const route = path.join("/");
  const project = path[0] === "projets" && path[1] ? content.projects.find((item) => item.slug === path[1]) : undefined;
  const titles: Record<string, string> = {
    "": "Portfolio",
    "a-propos": "About",
    projets: "Projects",
    recherche: "Research & PhD",
    publications: "Scientific publications",
    enseignement: "Teaching",
    academie: "Academy",
    experience: "Experience",
    cv: "Resume & documents",
    contact: "Contact",
  };
  const title = project?.title ?? titles[route] ?? "Portfolio";
  const description = project?.summary ?? content.profile.shortBio;
  const enPath = route ? `/en/${route}` : "/en";
  const frPath = frenchPath(path);
  return {
    title,
    description,
    alternates: { canonical: enPath, languages: { "fr-FR": frPath, "en-US": enPath } },
    other: { "content-language": "en" },
    openGraph: project ? { title, description, locale: "en_US", images: [{ url: project.coverImage, alt: project.coverAlt }] } : { title, description, locale: "en_US" },
    twitter: project ? { title, description, images: [project.coverImage] } : { title, description },
  };
}

function EnglishHome() {
  return <RecruiterHome language="en" />;
}

function EnglishAbout() {
  return <main><PageIntro kicker="About" title="Hands-on engineer, rigorous researcher, committed educator." lead={content.profile.longBio} />
    <section className="about-profile shell"><div className="about-portrait"><Image src={content.profile.profilePhoto} alt={content.profile.profilePhotoAlt} fill unoptimized sizes="(max-width: 720px) 100vw, 430px" /></div><div className="about-manifesto"><span className="kicker">How I work</span><h2>Understand the complete system before optimizing each component.</h2><p>{tr("Je pars des contraintes physiques et fonctionnelles, puis je construis la chaîne de décision : acquisition, traitement, modèle, communication, supervision et validation. Cette lecture de bout en bout me permet de faire des choix réalistes et traçables.")}</p><blockquote>{tr("« Une innovation n’a de valeur industrielle que lorsqu’elle devient mesurable, explicable et déployable. »")}</blockquote></div></section>
    <section className="section shell"><SectionHeading kicker="Skills" title="A cross-functional profile, from low-level systems to AI." /><ExpertiseGrid items={content.expertise} /></section>
    <section className="section values-section"><div className="shell"><SectionHeading kicker="Principles" title="Three principles for every assignment." /><div className="values-grid"><article><span>01</span><h3>Rigor</h3><p>Requirements, assumptions, measurements, and results must remain traceable.</p></article><article><span>02</span><h3>Purpose</h3><p>Technology must serve a concrete problem, decision, or learning goal.</p></article><article><span>03</span><h3>Knowledge sharing</h3><p>A well-documented solution becomes a lasting asset for teams and students.</p></article></div></div></section>
    <section className="section shell about-cta"><h2>Explore my professional journey and projects.</h2><div><Link className="button button-primary" href="/en/experience">View experience</Link><Link className="button button-secondary" href="/en/projets">View projects</Link></div></section>
  </main>;
}

function EnglishProjects() {
  return <main><PageIntro kicker="Technical portfolio" title="Architectures engineered for the field." lead="Case studies from industrial, academic, and personal projects, from PCB design to computer vision and distributed systems." /><section className="section shell page-section"><ProjectFilter projects={[...content.projects]} basePath="/en/projets" /></section></main>;
}

function EnglishProject({ slug }: { slug: string }) {
  const project = content.projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const index = content.projects.findIndex((item) => item.slug === slug) + 1;
  const next = content.projects[index % content.projects.length];
  return <main>
    <section className="case-hero shell"><div><Link className="breadcrumb" href="/en/projets">← All projects</Link><span className="kicker">{project.domain} · {project.period}</span><h1>{project.title}</h1><p>{project.summary}</p><div className="case-proof"><strong>{project.metric.value}</strong><span>{project.metric.label}</span></div></div><ProjectVisual project={project} index={index} priority language="en" /></section>
    <section className="project-verification shell" aria-label="Project evidence"><div><strong>{project.metric.value}</strong><span>Measured indicator</span></div><div><strong>{project.links.length}</strong><span>Public source{project.links.length === 1 ? "" : "s"}</span></div><div><strong>{project.gallery.length}</strong><span>Documented visual{project.gallery.length === 1 ? "" : "s"}</span></div></section>
    <section className="case-body shell"><aside><span className="kicker">Technologies</span><div className="tech-stack">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div></aside><div className="case-content">
      <article><span>01</span><h2>Context</h2><p>{project.context}</p></article><article><span>02</span><h2>Problem</h2><p>{project.problem}</p></article><article><span>03</span><h2>My contribution</h2><p>{project.personalRole}</p></article><article><span>04</span><h2>Solution</h2><p>{project.solution}</p></article><article className="result-panel"><span>05</span><h2>Results</h2><ul>{project.results.map((result) => <li key={result}>{result}</li>)}</ul></article>
      {project.gallery.length > 0 && <article className="project-gallery">{project.gallery.map((media) => <figure key={media.src}><Image src={media.src} alt={media.alt} width={1200} height={800} unoptimized sizes="(max-width: 720px) 100vw, 760px"/><figcaption>{media.caption}</figcaption></figure>)}</article>}
      {project.links.length > 0 && <article className="project-links"><span>Links</span><h2>Project resources</h2>{project.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</article>}
    </div></section><section className="next-project"><div className="shell"><span className="kicker light">Next project</span><Link href={`/en/projets/${next.slug}`}>{next.title} →</Link></div></section>
  </main>;
}

function EnglishResearch() {
  const research = content.research;
  return <main><PageIntro kicker="Research & PhD" title={research.title} lead={research.plainLanguageAbstract} />
    <section className="research-identity"><div className="shell research-identity-grid"><div><span className="kicker light">Journey</span><h2>{research.period}</h2></div><div><span className="kicker light">Affiliation</span><h2>{research.affiliation}</h2></div><p>The official thesis title and laboratory names will be added once they are verified.</p></div></section>
    <section className="section shell research-abstract"><SectionHeading kicker="Research question" title="Decide locally, coordinate globally." /><div className="research-text"><p>{research.scientificAbstract}</p><div className="method-cloud">{research.methods.map((method) => <span key={method}>{method}</span>)}</div></div></section>
    <section className="section research-contributions"><div className="shell"><SectionHeading kicker="Contributions" title="Distributed intelligence across several levels." /><div className="architecture-flow" aria-label="Research architecture"><div><span>01</span><strong>Edge</strong><small>Local detection & decision</small></div><i>→</i><div><span>02</span><strong>Fog</strong><small>Multi-agent coordination</small></div><i>→</i><div><span>03</span><strong>Cloud</strong><small>Global twin & RUL</small></div></div><ol className="contribution-list">{research.contributions.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}</ol></div></section>
    <section className="section shell research-links"><div><span className="kicker">Scientific output</span><h2>Publications and communications are gathered in a dedicated space.</h2></div><Link className="button button-primary" href="/en/publications">View publications →</Link></section>
  </main>;
}

function EnglishPublications() {
  return <main><PageIntro kicker="Scientific output" title="Scientific publications" lead="Work at the intersection of embedded systems, artificial intelligence, and industry, presented through its research question, scientific contribution, and practical value." />
    <section className="section shell publication-section"><div className="scientific-identity"><div><span className="kicker">Verified references</span><h2>Every publication links to a publisher, DOI, or open archive.</h2></div><div className="scientific-identity-links"><a href="https://link.springer.com/chapter/10.1007/978-3-031-77043-2_2" target="_blank" rel="noreferrer">Springer DOI ↗</a><a href="https://arxiv.org/abs/2607.21577" target="_blank" rel="noreferrer">arXiv 2607.21577 ↗</a><a href="https://arxiv.org/abs/2607.21873" target="_blank" rel="noreferrer">arXiv 2607.21873 ↗</a></div></div>
      <div className="publication-dashboard" aria-label="Publication summary"><div><strong>{translatedPublications.length}</strong><span>documented publications</span></div><div><strong>2024–2026</strong><span>covered period</span></div><div><strong>2</strong><span>open preprints</span></div><div><strong>1</strong><span>Springer publication</span></div></div>
      <div className="publication-list">{translatedPublications.map((publication, index) => <article className="publication-card" id={publication.id} key={publication.id}><header className="publication-card-header"><span className="publication-number">{String(index + 1).padStart(2, "0")}</span><div className="publication-heading"><div className="publication-badges"><span>{publication.type}</span><span>{publication.status}</span><time>{publication.year}</time></div><h2>{publication.title}</h2><p className="publication-authors">{publication.authors.join(" · ")}</p><p className="publication-venue">{publication.venue}</p></div></header><p className="publication-summary">{publication.summary}</p>
        <div className="publication-highlights">{publication.highlights.map((highlight) => <div key={highlight.label}><strong>{highlight.value}</strong><span>{highlight.label}</span></div>)}</div><div className="publication-analysis"><section><span>01</span><h3>Research problem</h3><p>{publication.researchProblem}</p></section><section><span>02</span><h3>Scientific contribution</h3><p>{publication.scientificContribution}</p></section><section><span>03</span><h3>Methodology</h3><p>{publication.methodology}</p></section><section><span>04</span><h3>Industrial value</h3><ul>{publication.industrialValue.map((item) => <li key={item}>{item}</li>)}</ul></section><section className="publication-perspectives"><span>05</span><h3>Perspectives & next steps</h3><ul>{publication.perspectives.map((item) => <li key={item}>{item}</li>)}</ul></section></div>
        <div className="publication-keywords">{publication.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div><footer className="publication-footer"><div><small>Recommended citation</small><p>{publication.citation}</p><CitationButton citation={publication.citation} /></div><div className="publication-actions"><a className="button button-primary" href={publication.primaryLink.url} target="_blank" rel="noreferrer">{publication.primaryLink.label} ↗</a>{publication.doi && <a className="text-link" href={publication.doi} target="_blank" rel="noreferrer">Open via DOI</a>}</div></footer>
      </article>)}</div></section>
  </main>;
}

function EnglishTeaching() {
  return <main><PageIntro kicker="Teaching" title="Train engineers who can explain their decisions." lead={content.teaching.philosophy} />
    <nav className="teaching-page-index shell" aria-label="Page navigation"><span>Quick access</span><a href="#method">Method</a><a href="#modules">Modules</a><a href="#library">Lectures, tutorials & labs</a><a href="#repository">GitHub repository</a></nav>
    <section className="teaching-method" id="method"><div className="shell"><span className="kicker light">Teaching method</span><div className="learning-flow"><article><span>01</span><h2>Understand</h2><p>Connect the concept to the architecture and system constraints.</p></article><article><span>02</span><h2>Experiment</h2><p>Measure, simulate, code, and observe real behavior.</p></article><article><span>03</span><h2>Justify</h2><p>Compare options and explain technical trade-offs.</p></article><article><span>04</span><h2>Share</h2><p>Document and present a clear, reproducible, and testable solution.</p></article></div></div></section>
    <section className="section shell teaching-catalog" id="modules"><SectionHeading kicker="Documented teaching" title="Fifteen modules, from theory to a working system." description="Titles, objectives, tools, levels, and academic years are drawn from the supplied materials and the public teaching repository." /><div className="teaching-dashboard">{content.teaching.repository.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div><div className="course-grid teaching-course-grid">{content.teaching.modules.map((course, index) => <article className="teaching-course-card" key={course.title}><header><span>{String(index + 1).padStart(2, "0")}</span><div><small>{course.period}</small><strong>{course.institution}</strong></div></header><p className="course-format">{course.level} · {course.format}</p><h2>{course.title}</h2><p className="course-description">{course.description}</p><p className="course-evidence">{course.evidence}</p><div className="tag-row">{course.topics.map((topic) => <small key={topic}>{topic}</small>)}</div><a className="text-link course-link" href={course.url} target="_blank" rel="noreferrer">View materials ↗</a></article>)}</div></section>
    <section className="section teaching-materials" id="library"><div className="shell"><SectionHeading kicker="Learning resources" title="A library organized into lectures, tutorials, and labs." description={content.teaching.materialLibrary.description} /><div className="teaching-library-dashboard">{content.teaching.materialLibrary.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div><div className="teaching-resource-categories">{content.teaching.materialLibrary.categories.map((category) => <section className="teaching-resource-category" key={category.id}><header><span>{category.number}</span><div><small>{category.items.length} resource set{category.items.length === 1 ? "" : "s"}</small><h2>{category.title}</h2><p>{category.description}</p></div></header><div className="teaching-resource-grid">{category.items.map((item) => <article className="teaching-resource-card" key={item.title}><div className="teaching-resource-meta"><time>{item.period}</time><span>{item.institution}</span></div><h3>{item.title}</h3><p>{item.description}</p><div className="tag-row">{item.topics.map((topic) => <small key={topic}>{topic}</small>)}</div><div className="teaching-file-list">{item.files.map((file) => <a href={file.url} target="_blank" rel="noreferrer" download key={file.url}><span>{file.label}</span><strong>{file.type} · {file.size}</strong><b>↓</b></a>)}</div></article>)}</div></section>)}</div></div></section>
    <section className="section teaching-repository" id="repository"><div className="shell teaching-repository-inner"><div><span className="kicker light">Teaching library</span><h2>{content.teaching.repository.title}</h2><p>{content.teaching.repository.description}</p><a className="button button-inverse" href={content.teaching.repository.url} target="_blank" rel="noreferrer">Explore the GitHub repository ↗</a></div><div className="resource-stack"><a href={content.teaching.repository.url} target="_blank" rel="noreferrer"><span>Public teaching repository</span><em>Lectures, tutorials, labs, and projects</em><b>↗</b></a></div></div></section>
  </main>;
}

function EnglishAcademy() {
  const education = content.academia.filter((item) => item.type === tr("Formation"));
  const courses = content.academia.filter((item) => item.type === tr("Cours"));
  const certifications = content.academia.filter((item) => item.type === tr("Certification"));
  return <main><PageIntro kicker="Academy" title="Learn, experiment, then teach." lead="A verified timeline of degree programs and courses, driven by centralized content that makes future additions straightforward." />
    <section className="section shell academic-path"><SectionHeading kicker="Timeline" title="Expertise built step by step." description="From scientific foundations to doctoral research in intelligent embedded systems." /><div className="academic-timeline">{education.map((item, index) => <article key={item.id} className="academic-step"><time>{item.period}</time><div className="academic-marker"><span>0{index + 1}</span></div><div className="academy-card"><div className="academy-card-head"><div className="academy-card-meta"><span>Degree</span><span>{item.institution}</span></div>{"logo" in item && <a className="academy-institution-logo" href={item.institutionUrl} target="_blank" rel="noreferrer"><Image src={item.logo} alt={item.logoAlt} width={240} height={100} unoptimized /></a>}</div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div></section>
    <section className="section academy-courses"><div className="shell"><SectionHeading kicker="Courses & workshops" title="Practice-based teaching." description="Robotics, autonomous systems, multi-sensor IoT, and Edge AI vision." /><div className="academy-course-grid">{courses.map((item, index) => <article className="academy-course-card" key={item.id}><span>0{index + 1}</span><small>{item.period}</small><h3>{item.title}</h3><strong>{item.institution}</strong><p>{item.description}</p></article>)}</div></div></section>
    <section className="section shell certification-strip"><div><span className="kicker">Certifications</span><h2>Only verified credentials are published.</h2></div>{certifications.length ? <div className="academy-grid">{certifications.map((item) => <article className="academy-card" key={item.id}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div> : <div className="certification-empty"><strong>Verification in progress</strong><p>Certificates will be listed once their title, issuer, date, and evidence have been confirmed.</p></div>}</section>
  </main>;
}

function EnglishExperience() {
  return <main><PageIntro kicker="Professional journey" title="More than four years across firmware, perception, and validation." lead="Experience shaped by electronic boards, test benches, AI models, and production constraints." /><section className="section shell timeline-section"><div className="timeline">{content.experiences.map((experience) => {
    const logo = companyLogos[experience.company];
    return <article key={`${experience.company}-${experience.role}`}><div className="timeline-date">{experience.period}</div><div className="timeline-dot" /><div className="timeline-card"><div className="timeline-company"><div><small>{experience.company} · {experience.location}</small><h2>{experience.role}</h2></div>{logo && <span><Image src={logo.src} alt={logo.alt} width={116} height={52} unoptimized /></span>}</div><ul>{experience.points.map((point) => <li key={point}>{point}</li>)}</ul></div></article>;
  })}</div></section><section className="section skills-section"><div className="shell"><SectionHeading light kicker="Technical foundation" title="Skills applied across complete systems." /><div className="skill-groups"><article><h2>Languages</h2><span>C</span><span>C++</span><span>Python</span><span>Shell</span></article><article><h2>Platforms</h2><span>STM32</span><span>ESP32</span><span>Jetson</span></article><article><h2>Real-time & buses</h2><span>FreeRTOS</span><span>CAN/CAN-FD</span><span>SPI</span><span>I²C</span></article><article><h2>Validation</h2><span>MIL/HIL</span><span>CANoe</span><span>JTAG/SWD</span><span>ISO 26262</span></article></div></div></section></main>;
}

function EnglishCv() {
  return <main><PageIntro kicker="Resume & documents" title="A clear overview of my profile." lead="My experience, skills, and professional documents are gathered here in a printable bilingual format." /><section className="section shell cv-layout"><div className="cv-sheet"><header><div className="cv-monogram"><Image src={content.profile.logo} alt="" width={52} height={52} /></div><div><h2>{content.profile.fullName}</h2><p>{content.profile.professionalTitle}</p></div></header><div className="cv-summary"><span className="kicker">Profile</span><p>{content.profile.shortBio}</p></div><div className="cv-columns"><div><span className="kicker">Experience</span>{content.experiences.map((item) => <article key={item.company}><small>{item.period}</small><h3>{item.role}</h3><p>{item.company} · {item.location}</p></article>)}</div><div><span className="kicker">Expertise</span>{content.expertise.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.tags.join(" · ")}</p></article>)}</div></div></div><aside className="document-panel"><span className="kicker light">Documents</span><h2>Downloads</h2><div className="document-item"><div><span className="document-language">FR / EN</span><strong>Printable Web resume</strong><small>Always-up-to-date version</small></div><span>↗</span></div><PrintButton />{content.profile.cvDocuments.map((document) => <a className="document-item" key={document.file} href={document.file} download><div><span className="document-language">EN</span><strong>{document.label}</strong><small>PDF · Updated {document.updatedAt}</small></div><span>↓</span></a>)}<Link className="button button-inverse" href="/en/contact">Request a tailored resume</Link></aside></section></main>;
}

function EnglishContact() {
  const activeSocials = content.profile.socialLinks.filter((item) => item.url);
  return <main><PageIntro kicker="Get in touch" title="Let’s start with the problem to solve." lead="Industrial project, scientific collaboration, teaching engagement, or professional opportunity: share the context and we will identify the most useful next step." /><section className="section shell contact-layout"><aside><span className="kicker">Contact details</span><a className="contact-email" href={`mailto:${content.profile.publicEmail}`}>{content.profile.publicEmail}</a><span>{content.profile.location}</span><div className="availability"><i /><p>{content.profile.availability}</p></div><div className="social-list">{activeSocials.map((item) => {
    const logo = socialLogos[item.type];
    return <a key={item.type} href={item.url} rel="noreferrer" target="_blank"><span>{logo && <Image src={logo.src} alt={logo.alt} width={20} height={20} unoptimized />}{item.label}</span><b aria-hidden="true">↗</b></a>;
  })}</div></aside><ContactForm email={content.profile.publicEmail} /></section></main>;
}

export default async function EnglishPage({ params }: { params: Promise<PageParams> }) {
  const { path = [] } = await params;
  if (!path.length) return <EnglishHome />;
  if (path[0] === "projets" && path[1] && path.length === 2) return <EnglishProject slug={path[1]} />;
  if (path.length !== 1) notFound();
  const pages: Record<string, React.ReactNode> = {
    "a-propos": <EnglishAbout />,
    projets: <EnglishProjects />,
    recherche: <EnglishResearch />,
    publications: <EnglishPublications />,
    enseignement: <EnglishTeaching />,
    academie: <EnglishAcademy />,
    experience: <EnglishExperience />,
    cv: <EnglishCv />,
    contact: <EnglishContact />,
  };
  return pages[path[0]] ?? notFound();
}
