"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";

export function ContactForm({ email }: { email: string }) {
  const { language } = useLanguage();
  const en = language === "en";
  const startedAt = useRef(0);
  const [status, setStatus] = useState<"" | "missing" | "invalid-email" | "consent" | "sending" | "success" | "error">("");
  useEffect(() => { startedAt.current = Date.now(); }, []);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const sender = String(formData.get("email") ?? "").trim();
    const organization = String(formData.get("organization") ?? "").trim();
    const subject = String(formData.get("subject") ?? "Prise de contact").trim();
    const message = String(formData.get("message") ?? "").trim();
    const consent = formData.get("consent") === "accepted";
    if (!name || !sender || !message) { setStatus("missing"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sender)) { setStatus("invalid-email"); return; }
    if (!consent) { setStatus("consent"); return; }
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email: sender, organization, subject, message, language, website: formData.get("website"), startedAt: startedAt.current }),
      });
      if (!response.ok) throw new Error("submission-failed");
      form.reset();
      startedAt.current = Date.now();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }
  return <form className="contact-form" onSubmit={submit} noValidate aria-describedby={status ? "contact-form-status" : undefined}>
    <label className="form-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <div className="form-row"><label>{en ? "Full name" : "Nom complet"}<input name="name" autoComplete="name" required /></label><label>{en ? "Email address" : "Adresse e-mail"}<input name="email" type="email" autoComplete="email" required /></label></div>
    <div className="form-row"><label>{en ? "Organization" : "Organisation"} <span>({en ? "optional" : "optionnel"})</span><input name="organization" autoComplete="organization" /></label><label>{en ? "Subject" : "Sujet"}<select name="subject" defaultValue={en ? "Industrial project" : "Projet industriel"}>{(en ? ["Industrial project", "Scientific collaboration", "Teaching engagement", "Recruitment", "Other"] : ["Projet industriel", "Collaboration scientifique", "Intervention pédagogique", "Recrutement", "Autre"]).map((option) => <option key={option}>{option}</option>)}</select></label></div>
    <label>{en ? "Your message" : "Votre message"}<textarea name="message" rows={7} required placeholder={en ? "Briefly describe your needs, context, and timeline." : "Décrivez brièvement votre besoin, le contexte et l’échéance."} /></label>
    <label className="consent"><input type="checkbox" name="consent" value="accepted" required /> <span>{en ? "I agree that this information may be used solely to reply to my request." : "J’accepte que ces informations soient utilisées uniquement pour répondre à ma demande."}</span></label>
    <button className="button button-primary" type="submit" disabled={status === "sending"}>{status === "sending" ? (language === "en" ? "Sending…" : "Envoi…") : (language === "en" ? "Send message" : "Envoyer le message")} <span aria-hidden="true">↗</span></button>
    {status === "missing" && <p className="form-status form-status-error" id="contact-form-status" role="status">{language === "en" ? "Please complete your name, email address, and message." : "Merci de compléter le nom, l’adresse e-mail et le message."}</p>}
    {status === "invalid-email" && <p className="form-status form-status-error" id="contact-form-status" role="status">{language === "en" ? "Please enter a valid email address." : "Merci de saisir une adresse e-mail valide."}</p>}
    {status === "consent" && <p className="form-status form-status-error" id="contact-form-status" role="status">{language === "en" ? "Please accept the consent statement before continuing." : "Merci d’accepter la mention de consentement avant de continuer."}</p>}
    {status === "success" && <p className="form-status" id="contact-form-status" role="status">{language === "en" ? "Message sent. Thank you — I will reply as soon as possible." : "Message envoyé. Merci — je vous répondrai dès que possible."}</p>}
    {status === "error" && <p className="form-status form-status-error" id="contact-form-status" role="alert">{language === "en" ? <>The form is temporarily unavailable. You can <a href={`mailto:${email}`}>email me directly</a>.</> : <>Le formulaire est momentanément indisponible. Vous pouvez <a href={`mailto:${email}`}>m’écrire directement par e-mail</a>.</>}</p>}
  </form>;
}
