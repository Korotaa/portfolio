# Portfolio — Korota Arsène Coulibaly

Portfolio bilingue français/anglais construit avec Next.js, React, Vinext et
Cloudflare Workers. Le formulaire de contact enregistre les messages dans D1 et
la boîte `/messages` est réservée au propriétaire via Cloudflare Access.

## Prérequis

- Node.js `>=22.13.0` (voir `.nvmrc`)
- npm
- un compte Cloudflare avec le Worker et la base D1 du portfolio

## Installation locale

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Renseignez l'UUID réel de D1 dans `.env.local`. Les valeurs locales et les
secrets Cloudflare ne doivent jamais être ajoutés au dépôt Git.

## Commandes

- `npm run dev` : serveur de développement
- `npm test` : build complet et tests HTML
- `npm run deploy:dry` : simulation du déploiement Wrangler
- `npm run deploy` : build et déploiement manuel du Worker

## Déploiement automatique

Le workflow `.github/workflows/deploy-cloudflare.yml` teste et déploie chaque
push sur `main`. Il attend trois secrets GitHub :

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_D1_DATABASE_ID`

La variable GitHub `NEXT_PUBLIC_SITE_URL` définit l'URL canonique du site.

## Accès privé

La route `/messages` vérifie l'identité transmise par Cloudflare Access et
renvoie une page introuvable lorsque l'assertion ou l'adresse autorisée manque.
La politique Access doit donc cibler `/messages` et n'autoriser que l'adresse du
propriétaire.

Le guide pas à pas se trouve dans
[`CLOUDFLARE_DEPLOYMENT.md`](CLOUDFLARE_DEPLOYMENT.md).
