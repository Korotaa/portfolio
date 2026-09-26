import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro, SectionHeading } from "@/components/content";
import { companyLogos } from "@/data/brand-assets";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = { title: "Expérience", description: "Expérience industrielle en systèmes embarqués, vision robotique, firmware et validation automobile." };

export default function ExperiencePage() {
  const skillGroups = [
    { title: "Langages", items: ["C", "C++", "Python", "Shell"] },
    { title: "Plateformes", items: ["STM32", "ESP32", "ARM Cortex-M", "Jetson"] },
    { title: "Temps réel & bus", items: ["FreeRTOS", "CMSIS-RTOS", "CAN/CAN-FD", "LIN", "SPI", "I²C"] },
    { title: "Validation", items: ["MIL/HIL", "CANoe", "JTAG/SWD", "ISO 26262", "MISRA C"] },
  ];
  return <main><PageIntro kicker="Parcours professionnel" title="Plus de quatre ans entre firmware, perception et validation." lead="Une expérience construite au contact des cartes, des bancs de test, des modèles d’IA et des contraintes de production." />
    <section className="section shell timeline-section"><div className="timeline">{portfolio.experiences.map((experience) => {
      const logo = companyLogos[experience.company];
      return <article key={`${experience.company}-${experience.role}`}><div className="timeline-date">{experience.period}</div><div className="timeline-dot" /><div className="timeline-card"><div className="timeline-company"><div><small>{experience.company} · {experience.location}</small><h2>{experience.role}</h2></div>{logo && <span><Image src={logo.src} alt={logo.alt} width={116} height={52} unoptimized /></span>}</div><ul>{experience.points.map(point => <li key={point}>{point}</li>)}</ul></div></article>;
    })}</div></section>
    <section className="section skills-section"><div className="shell"><SectionHeading light kicker="Socle technique" title="Des compétences mobilisées dans des systèmes complets." /><div className="skill-groups">{skillGroups.map(group => <article key={group.title}><h2>{group.title}</h2>{group.items.map(item => <span key={item}>{item}</span>)}</article>)}</div></div></section>
    <section className="section shell responsibilities"><SectionHeading kicker="Responsabilités complémentaires" title="Recherche, laboratoire et transmission." /><div className="values-grid"><article><span>R</span><h3>Recherche appliquée</h3><p>Prototypage et expérimentation d’architectures Edge–Fog–Cloud.</p></article><article><span>L</span><h3>Support laboratoire</h3><p>Responsabilité informatique, maintenance des outils et du réseau du laboratoire.</p></article><article><span>E</span><h3>Encadrement</h3><p>Espace prévu pour les projets, mémoires et stages encadrés à documenter.</p></article></div></section>
  </main>;
}
