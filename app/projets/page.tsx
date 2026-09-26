import type { Metadata } from "next";
import { PageIntro } from "@/components/content";
import { ProjectFilter } from "@/components/project-filter";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = { title: "Projets", description: "Projets en systèmes embarqués, vision industrielle, Edge AI, maintenance prédictive et validation automobile." };

export default function ProjectsPage() {
  return <main><PageIntro kicker="Portfolio technique" title="Des architectures pensées pour le terrain." lead="Des études de cas issues de projets industriels, académiques et personnels, de la conception PCB à la vision et aux systèmes distribués." /><section className="section shell page-section"><ProjectFilter projects={[...portfolio.projects]} /></section></main>;
}
