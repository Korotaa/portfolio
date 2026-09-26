import { getDb } from "@/db";
import { contactMessages } from "@/db/schema";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  try {
    const payload = await request.json() as Record<string, unknown>;
    const name = clean(payload.name, 120);
    const email = clean(payload.email, 180).toLowerCase();
    const organization = clean(payload.organization, 180);
    const subject = clean(payload.subject, 160);
    const message = clean(payload.message, 5000);
    const language = payload.language === "en" ? "en" : "fr";
    const website = clean(payload.website, 200);
    const elapsed = Date.now() - Number(payload.startedAt ?? 0);

    if (website || !Number.isFinite(elapsed) || elapsed < 1800) {
      return Response.json({ ok: true }, { status: 201 });
    }
    if (!name || !email || !subject || message.length < 10 || !emailPattern.test(email)) {
      return Response.json({ error: "invalid-contact-message" }, { status: 400 });
    }

    const { env } = await import("cloudflare:workers");
    const db = getDb(env.DB);
    await db.insert(contactMessages).values({ name, email, organization, subject, message, language });
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Contact form submission failed", error);
    return Response.json({ error: "contact-service-unavailable" }, { status: 500 });
  }
}
