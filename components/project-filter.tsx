"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/content";
import { useLanguage } from "@/components/language-provider";
import type { Project } from "@/data/portfolio";
import { translations } from "@/data/translations";

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function ProjectFilter({ projects, basePath = "/projets" }: { projects: Project[]; basePath?: string }) {
  const { language } = useLanguage();
  const allLabel = language === "en" ? "All" : "Tous";
  const domains = [allLabel, ...Array.from(new Set(projects.map((project) => project.domain)))];
  const [active, setActive] = useState(allLabel);
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    return projects.filter((project) => {
      if (active !== allLabel && project.domain !== active) return false;
      if (!normalizedQuery) return true;
      const values = [project.title, project.summary, project.domain, ...project.technologies];
      const searchable = values.flatMap((value) => [value, translations[value] ?? ""]).join(" ");
      return normalize(searchable).includes(normalizedQuery);
    });
  }, [active, allLabel, projects, query]);

  return <>
    <div className="project-controls">
      <div className="project-search" data-no-translate><label htmlFor="project-search">{language === "en" ? "Search projects" : "Rechercher un projet"}</label><input id="project-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={language === "en" ? "Project, technology, or field…" : "Projet, technologie ou domaine…"} autoComplete="off" />{query && <button type="button" onClick={() => setQuery("")} aria-label={language === "en" ? "Clear search" : "Effacer la recherche"}>×</button>}</div>
      <div className="filter-bar" role="group" aria-label="Filtrer les projets par domaine">{domains.map((domain) => <button key={domain} type="button" className={active === domain ? "active" : ""} onClick={() => setActive(domain)} aria-pressed={active === domain}>{domain}</button>)}</div>
    </div>
    <p className="result-count" aria-live="polite" data-no-translate>{visible.length} {language === "en" ? `project${visible.length > 1 ? "s" : ""}` : `projet${visible.length > 1 ? "s" : ""}`}</p>
    <div className="project-grid project-grid-light">{visible.length ? visible.map((project, index) => <ProjectCard key={project.slug} project={project} index={index + 1} basePath={basePath} language={language} />) : <div className="project-empty" data-no-translate><h2>{language === "en" ? "No projects found" : "Aucun projet trouvé"}</h2><p>{language === "en" ? "Change the search or choose another field." : "Modifiez la recherche ou choisissez un autre domaine."}</p></div>}</div>
  </>;
}
