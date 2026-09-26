export type Publication = {
  id: string;
  title: string;
  year: string;
  type: string;
  status: string;
  venue: string;
  authors: string[];
  summary: string;
  researchProblem: string;
  scientificContribution: string;
  methodology: string;
  industrialValue: string[];
  perspectives: string[];
  highlights: { value: string; label: string }[];
  keywords: string[];
  citation: string;
  primaryLink: { label: string; url: string };
  doi?: string;
};

export const publications: Publication[] = [
  {
    id: "pedagogical-factory-digital-twin",
    title: "Industry 4.0: Internet of Things and Cyber-Physical Systems for the Implementation of Pedagogical Factory Digital Twin",
    year: "2024",
    type: "Article de conférence",
    status: "Publié",
    venue: "Smart Applications and Data Analysis · SADASC 2024 · Springer CCIS, vol. 2168",
    authors: ["Korota Arsène Coulibaly", "Alvaro Llaria", "Mohamed Hamlich", "Octavian Curea", "Rabiae Saidi"],
    summary: "Un cadre de référence pour passer des concepts de l’Industrie 4.0 à l’implémentation interopérable d’un jumeau numérique de fabrique pédagogique.",
    researchProblem: "Les solutions Industrie 4.0 associent des équipements, logiciels et organisations hétérogènes. Sans architecture commune ni standards partagés, leurs données et services communiquent difficilement, ce qui fragilise la conception d’un jumeau numérique réellement exploitable.",
    scientificContribution: "L’article relie les concepts IoT et systèmes cyber-physiques aux principaux modèles d’architecture industrielle afin d’identifier les standards et le processus de développement adaptés à une fabrique pédagogique. Il met en perspective l’architecture 5C, IEC 62264/ISA-95, RAMI 4.0 et IMSA.",
    methodology: "Analyse structurée des composants IoT, des architectures CPS et des modèles de référence de l’Industrie 4.0, puis traduction de ces concepts en étapes d’implémentation pour un jumeau numérique destiné à l’apprentissage et à l’expérimentation.",
    industrialValue: [
      "Réduit les ambiguïtés d’architecture lors de la numérisation d’un atelier ou d’une ligne pilote.",
      "Facilite l’interopérabilité entre équipements, systèmes de contrôle et applications de supervision.",
      "Offre un banc pédagogique représentatif pour former aux technologies de l’usine intelligente avant un déploiement industriel.",
    ],
    perspectives: [
      "Instanciation du cadre sur une fabrique pédagogique connectée.",
      "Intégration de l’Asset Administration Shell pour normaliser la représentation des actifs.",
      "Validation des échanges entre niveaux terrain, contrôle, MES et entreprise.",
    ],
    highlights: [
      { value: "5C", label: "architecture CPS étudiée" },
      { value: "ISA-95", label: "hiérarchie industrielle" },
      { value: "RAMI 4.0", label: "modèle de référence" },
    ],
    keywords: ["Industry 4.0", "IoT", "CPS", "Digital Twin", "ISA-95", "RAMI 4.0", "AAS"],
    citation: "Coulibaly, K. A., Llaria, A., Hamlich, M., Curea, O., & Saidi, R. (2024). In Smart Applications and Data Analysis, CCIS 2168, pp. 16–29. Springer.",
    primaryLink: { label: "Consulter chez Springer", url: "https://link.springer.com/chapter/10.1007/978-3-031-77043-2_2" },
    doi: "https://doi.org/10.1007/978-3-031-77043-2_2",
  },
  {
    id: "synthetic-data-gravure-printing",
    title: "Synthetic data generation framework for quality control automation in gravure printing",
    year: "2026",
    type: "Prépublication",
    status: "arXiv",
    venue: "arXiv:2607.21577 · Computer Vision and Pattern Recognition",
    authors: ["Korota Arsène Coulibaly", "Mohamed Hamlich", "Khalid Hmali", "Andrea Trombin"],
    summary: "Un générateur de défauts d’impression physiquement plausibles qui produit automatiquement les images et leurs annotations pour entraîner une inspection visuelle industrielle.",
    researchProblem: "En héliogravure, l’inspection manuelle est lente, coûteuse et dépend de l’opérateur. L’automatisation par deep learning est freinée par la rareté des défauts réels, la diversité permanente des motifs imprimés et le coût d’une annotation précise à grande échelle.",
    scientificContribution: "Le travail propose un framework multi-classes qui simule les causes visuelles et mécaniques des fisheyes, stries, défauts de repérage et plis. Chaque défaut est généré avec son masque de segmentation exact, supprimant l’étape d’annotation manuelle.",
    methodology: "Des images saines sont transformées par des modèles paramétriques combinant déformations géométriques, profils photométriques, bruit de Perlin et décalage de cylindres. Les 7 533 images obtenues entraînent un RF-DETR Large, ensuite évalué uniquement sur des défauts réels capturés en production.",
    industrialValue: [
      "Accélère la création d’un jeu de données sans attendre l’apparition rare de milliers de défauts réels.",
      "Réduit fortement le coût et les erreurs de l’annotation manuelle grâce aux masques générés automatiquement.",
      "Facilite l’adaptation du contrôle qualité à de nouveaux décors, supports et campagnes d’impression.",
      "Prépare une inspection plus objective, reproductible et déployable sur une ligne de production.",
    ],
    perspectives: [
      "Étendre la simulation à d’autres familles de défauts et conditions d’éclairage.",
      "Combiner données synthétiques et réelles par adaptation de domaine.",
      "Optimiser l’inférence pour une inspection temps réel sur plateforme Edge.",
    ],
    highlights: [
      { value: "7 533", label: "images synthétiques" },
      { value: "80,9 %", label: "mAP@50 sur données réelles" },
      { value: "85,6 %", label: "précision" },
      { value: "81,7 %", label: "F1-score" },
    ],
    keywords: ["Synthetic Data", "RF-DETR", "Computer Vision", "Segmentation", "Quality Control", "Rotogravure"],
    citation: "Coulibaly, K. A., Hamlich, M., Hmali, K., & Trombin, A. (2026). arXiv:2607.21577 [cs.CV].",
    primaryLink: { label: "Lire la prépublication", url: "https://arxiv.org/abs/2607.21577" },
    doi: "https://doi.org/10.48550/arXiv.2607.21577",
  },
  {
    id: "mas-driven-digital-twins",
    title: "Multi-Agent System-driven Digital Twins for predictive maintenance: architectures, technologies and open research challenges",
    year: "2026",
    type: "Prépublication",
    status: "arXiv",
    venue: "arXiv:2607.21873 · Artificial Intelligence",
    authors: ["Korota Arsène Coulibaly", "Mohamed Hamlich"],
    summary: "Une revue systématique et une architecture de référence pour distribuer la perception, le diagnostic et la décision entre agents embarqués et jumeaux numériques hiérarchiques.",
    researchProblem: "Les jumeaux numériques industriels deviennent complexes et restent souvent dépendants d’une intelligence centralisée. Cette organisation augmente la latence, crée des points uniques de défaillance et répond mal aux contraintes de maintenance prédictive sur des nœuds embarqués limités.",
    scientificContribution: "L’étude établit une taxonomie multidimensionnelle des architectures hybrides MAS–Digital Twin, compare leurs mécanismes de communication et de déploiement, puis formule trois questions de recherche. Elle fait émerger une architecture tripartite Edge–Fog–Cloud intégrant agents, jumeaux numériques et Asset Administration Shell.",
    methodology: "Revue systématique inspirée de PRISMA couvrant IEEE Xplore, Scopus, Web of Science, ScienceDirect, SpringerLink et MDPI. Sur 547 références initialement identifiées, 63 travaux ont alimenté l’analyse qualitative selon l’architecture, le niveau de déploiement, les protocoles, les modèles IA et la validation.",
    industrialValue: [
      "Rapproche la détection et la décision des machines afin de réduire la latence et la dépendance au Cloud.",
      "Améliore la résilience grâce à l’autonomie locale et à la coordination distribuée entre composants.",
      "Structure l’intégration avec les systèmes MES et ERP au moyen de modèles d’actifs standardisés.",
      "Oriente la maintenance vers des décisions explicables combinant diagnostic, estimation de durée de vie restante et supervision humaine.",
    ],
    perspectives: [
      "Déployer Autoencoder et CNN 1D sur des microcontrôleurs à ressources contraintes.",
      "Valider une coordination multi-nœuds légère par MQTT, MQTT-SN ou sérialisation compacte.",
      "Orchestrer des jumeaux hiérarchiques avec estimation RUL et intelligence artificielle explicable.",
    ],
    highlights: [
      { value: "547", label: "références identifiées" },
      { value: "63", label: "travaux analysés en profondeur" },
      { value: "5", label: "familles d’architectures" },
      { value: "3", label: "questions de recherche ouvertes" },
    ],
    keywords: ["Multi-Agent Systems", "Digital Twin", "Predictive Maintenance", "Edge AI", "TinyML", "Industry 5.0", "AAS"],
    citation: "Coulibaly, K. A., & Hamlich, M. (2026). arXiv:2607.21873 [cs.AI].",
    primaryLink: { label: "Lire la prépublication", url: "https://arxiv.org/abs/2607.21873" },
    doi: "https://doi.org/10.48550/arXiv.2607.21873",
  },
];
