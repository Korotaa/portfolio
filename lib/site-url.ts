const fallbackSiteUrl = "https://korota-arsene-portfolio.korota.workers.dev";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallbackSiteUrl
).replace(/\/$/, "");
