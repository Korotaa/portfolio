# Mise en production Cloudflare

## 1. Protéger `/messages` avec Cloudflare Access

Dans **Cloudflare Zero Trust → Access → Applications**, créez une application
**Self-hosted** avec le domaine d'application suivant :

`korota-arsene-portfolio.korota.workers.dev/messages`

Créez une politique **Allow** qui n'autorise que l'adresse :

`korotaarsne.coulibaly@usmba.ac.ma`

Activez **One-time PIN** comme méthode de connexion. Ne protégez pas tout le
domaine `workers.dev` : seule la route `/messages` doit être privée.

Lorsque le domaine professionnel est connecté, ajoutez aussi
`korotaarsene.com/messages` à cette même application Access.

## 2. Activer le déploiement automatique GitHub

Dans **GitHub → Settings → Secrets and variables → Actions**, ajoutez les
secrets de dépôt suivants :

- `CLOUDFLARE_API_TOKEN` : jeton créé avec le modèle **Edit Cloudflare Workers**
  et limité à votre seul compte.
- `CLOUDFLARE_ACCOUNT_ID` : identifiant du compte Cloudflare.
- `CLOUDFLARE_D1_DATABASE_ID` : UUID réel de la base D1 du portfolio.

Ajoutez ensuite la variable de dépôt `NEXT_PUBLIC_SITE_URL`. Sa valeur actuelle
peut être `https://korota-arsene-portfolio.korota.workers.dev`, puis
`https://korotaarsene.com` après la connexion du domaine.

Le workflow `.github/workflows/deploy-cloudflare.yml` teste puis déploie chaque
push sur `main`. Il peut aussi être lancé manuellement depuis l'onglet Actions.

Pour une première publication dans un nouveau dépôt GitHub :

```bash
git init
git add .
git commit -m "Deploy portfolio on Cloudflare Workers"
git branch -M main
git remote add origin https://github.com/VOTRE-COMPTE/VOTRE-DEPOT.git
git push -u origin main
```

Créez les secrets avant le premier `push`, ou relancez ensuite le workflow avec
**Actions → Deploy portfolio to Cloudflare Workers → Run workflow**.

## 3. Acheter et connecter le domaine

Le domaine recommandé est `korotaarsene.com`. Vérifiez sa disponibilité au
moment du paiement dans **Cloudflare → Domain Registration → Register Domains**.

Après l'achat :

1. Ouvrez **Workers & Pages → korota-arsene-portfolio**.
2. Allez dans **Settings → Domains & Routes → Add → Custom Domain**.
3. Saisissez `korotaarsene.com` et validez.
4. Ajoutez éventuellement `www.korotaarsene.com` puis redirigez-le vers le
   domaine principal.
5. Remplacez la variable GitHub `NEXT_PUBLIC_SITE_URL` par
   `https://korotaarsene.com` et relancez le workflow.
6. Ajoutez `korotaarsene.com/messages` à l'application Cloudflare Access.

## Développement local

Copiez `.env.example` vers `.env.local`, remplacez l'UUID D1 par sa vraie
valeur, puis lancez :

```bash
npm ci
npm test
npm run dev
```

Pour vérifier l'artefact Cloudflare sans publier :

```bash
npm run deploy:dry
```
