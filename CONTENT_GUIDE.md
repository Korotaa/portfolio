# Mettre à jour le portfolio

## Contenus

Modifiez `data/portfolio.ts`. Toutes les pages utilisent cette source unique : profil, expertises, projets, recherche, expériences, enseignements et parcours académique.

## Langues

Le français est la langue par défaut. Ajoutez ou ajustez les équivalents anglais dans `data/translations.ts`. Le toggle FR/EN mémorise le choix du visiteur dans son navigateur.

## Académie

Ajoutez une entrée dans `portfolio.academia` avec les champs `id`, `type`, `title`, `institution`, `period` et `description`. Pour une formation, ajoutez aussi `institutionUrl`, `logo` et `logoAlt`; placez le fichier optimisé dans `public/images/institutions/`. Les types acceptés par la page sont `Formation`, `Cours` et `Certification`; la nouvelle carte sera publiée automatiquement dans le bon groupe.

## Photo et logo

Le site utilise actuellement un portrait professionnel retouché par IA à partir de la photo du portfolio source dans `public/images/profile/engineer-portrait.webp`, ainsi que le monogramme vectoriel `public/images/brand/monogram.svg`. Pour utiliser une nouvelle photo, conservez le même chemin ou modifiez `profile.profilePhoto`, puis fournissez un texte alternatif descriptif dans `profile.profilePhotoAlt`.

## Images de projets

Chaque projet possède une couverture optimisée dans `public/images/projects/<slug>/cover.webp`. Les projets repris de l’ancien portfolio utilisent des images authentiques extraites du PDF et leurs vues complémentaires sont rangées dans `gallery/`. Modifiez `coverImage`, `coverAlt`, `visualCredit` et `metric` dans `data/portfolio.ts` pour personnaliser la carte. Pour ajouter des photos, schémas ou captures, renseignez aussi `gallery` avec `src`, `alt` et `caption`.

## Publications

Les références scientifiques et leurs fiches de valorisation sont centralisées dans `data/publications.ts`. Pour ajouter une publication, dupliquez un objet existant puis renseignez le titre officiel, les auteurs, le statut réel, la problématique, l’apport scientifique, la méthodologie, les résultats, l’utilité industrielle, les perspectives et les liens DOI ou éditeur. Les prépublications doivent rester identifiées comme telles tant qu’aucune acceptation éditoriale n’est confirmée.

## Liens

Renseignez `profile.socialLinks` et les tableaux `links` des projets. Utilisez uniquement des URL HTTPS vérifiées.

## Documents

Placez les versions autorisées du CV et du résumé de thèse dans `public/documents/`, puis renseignez-les dans `profile.cvDocuments` dans `data/portfolio.ts`.

## Contenus non encore fournis

Avant publication définitive, compléter ou confirmer : intitulé officiel de la thèse, laboratoires, établissements et volumes d’enseignement, encadrements, certifications et distinctions. Remplacez progressivement les illustrations conceptuelles restantes par des médias réels quand ils sont disponibles.
