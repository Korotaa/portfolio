import type { MetadataRoute } from "next";
import { portfolio } from "@/data/portfolio";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl;
  const pages = ["", "/a-propos", "/projets", "/recherche", "/publications", "/enseignement", "/academie", "/experience", "/cv", "/contact"];
  const topLevel = pages.flatMap(path => [
    { url: `${base}${path}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: path === "" ? 1 : .7, alternates: { languages: { fr: `${base}${path}`, en: `${base}/en${path}` } } },
    { url: `${base}/en${path}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: path === "" ? .9 : .7, alternates: { languages: { fr: `${base}${path}`, en: `${base}/en${path}` } } },
  ]);
  const projectPages = portfolio.projects.flatMap(project => [
    { url: `${base}/projets/${project.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .6, alternates: { languages: { fr: `${base}/projets/${project.slug}`, en: `${base}/en/projets/${project.slug}` } } },
    { url: `${base}/en/projets/${project.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .6, alternates: { languages: { fr: `${base}/projets/${project.slug}`, en: `${base}/en/projets/${project.slug}` } } },
  ]);
  return [...topLevel, ...projectPages];
}
