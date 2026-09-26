import type { Metadata } from "next";
import { desc } from "drizzle-orm";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getDb } from "@/db";
import { contactMessages } from "@/db/schema";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Messages reçus", robots: { index: false, follow: false } };

const ownerEmail = "korotaarsne.coulibaly@usmba.ac.ma";

export default async function MessagesPage() {
  const requestHeaders = await headers();
  const authenticatedEmail = requestHeaders
    .get("cf-access-authenticated-user-email")
    ?.trim()
    .toLowerCase();
  const accessAssertion = requestHeaders.get("cf-access-jwt-assertion");

  // Cloudflare Access injects both headers only after a successful policy
  // decision. Keep the page closed if Access is absent or the user is not the
  // portfolio owner, including during local development.
  if (!accessAssertion || authenticatedEmail !== ownerEmail) notFound();

  const { env } = await import("cloudflare:workers");
  const messages = await getDb(env.DB).select().from(contactMessages).orderBy(desc(contactMessages.createdAt), desc(contactMessages.id)).limit(100);

  return <main className="shell private-inbox">
    <header><span className="kicker">Espace privé</span><h1>Messages reçus</h1><p>{messages.length} demande{messages.length > 1 ? "s" : ""} enregistrée{messages.length > 1 ? "s" : ""} via le portfolio.</p></header>
    <div className="inbox-list">{messages.length ? messages.map((message) => <article key={message.id}>
      <div className="inbox-meta"><time>{message.createdAt}</time><span>{message.subject}</span><span>{message.language.toUpperCase()}</span></div>
      <h2>{message.name}</h2><p className="inbox-sender"><a href={`mailto:${message.email}`}>{message.email}</a>{message.organization && <> · {message.organization}</>}</p>
      <p className="inbox-message">{message.message}</p><a className="button button-primary" href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`}>Répondre par e-mail ↗</a>
    </article>) : <div className="inbox-empty"><h2>Aucun message pour le moment.</h2><p>Les nouvelles demandes apparaîtront ici.</p></div>}</div>
  </main>;
}
