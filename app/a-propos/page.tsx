import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ExpertiseGrid, PageIntro, SectionHeading } from "@/components/content";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = { title: "À propos", description: "Parcours, approche et domaines d’expertise de Korota Arsène Coulibaly." };

export default function AboutPage() {
  return <main><PageIntro kicker="À propos" title="Ingénieur de terrain, chercheur par exigence, enseignant par conviction." lead={portfolio.profile.longBio} />
    <section className="about-profile shell"><div className="about-portrait"><Image src={portfolio.profile.profilePhoto} alt={portfolio.profile.profilePhotoAlt} fill unoptimized sizes="(max-width: 720px) 100vw, 430px" /></div><div className="about-manifesto"><span className="kicker">Ma manière de travailler</span><h2>Comprendre le système complet avant d’optimiser chaque brique.</h2><p>Je pars des contraintes physiques et fonctionnelles, puis je construis la chaîne de décision : acquisition, traitement, modèle, communication, supervision et validation. Cette lecture de bout en bout me permet de faire des choix réalistes et traçables.</p><blockquote>« Une innovation n’a de valeur industrielle que lorsqu’elle devient mesurable, explicable et déployable. »</blockquote></div></section>
    <section className="section shell"><SectionHeading kicker="Compétences" title="Un profil transverse, du bas niveau à l’IA." /><ExpertiseGrid /></section>
    <section className="section values-section"><div className="shell"><SectionHeading kicker="Principes" title="Trois repères dans chaque mission." /><div className="values-grid"><article><span>01</span><h3>Rigueur</h3><p>Exigences, hypothèses, mesures et résultats doivent rester traçables.</p></article><article><span>02</span><h3>Utilité</h3><p>La technologie sert un problème concret, une décision ou un apprentissage.</p></article><article><span>03</span><h3>Transmission</h3><p>Une solution bien documentée devient un capital pour l’équipe et les étudiants.</p></article></div></div></section>
    <section className="section shell about-cta"><h2>Découvrez mon parcours professionnel et mes réalisations.</h2><div><Link className="button button-primary" href="/experience">Voir l’expérience</Link><Link className="button button-secondary" href="/projets">Voir les projets</Link></div></section>
  </main>;
}
