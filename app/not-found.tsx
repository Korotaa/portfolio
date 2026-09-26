import Link from "next/link";

export default function NotFound() {
  return <main className="not-found shell"><span>404</span><h1>Cette page n’existe pas.</h1><p>Le contenu a peut-être été déplacé ou n’est pas encore publié.</p><Link className="button button-primary" href="/">Retour à l’accueil</Link></main>;
}
