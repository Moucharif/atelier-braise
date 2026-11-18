# L'Atelier Braisé — Lomé, Togo

> Site vitrine moderne, responsive et optimisé pour le restaurant **L'Atelier Braisé**, spécialiste des poissons braisés et grillades au feu de bois à Nyékonakpoé, Lomé (Togo).

[![Nuxt 3](https://img.shields.io/badge/Nuxt-3.15-00DC82?logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-6-538DD7?logo=font-awesome&logoColor=white)](https://fontawesome.com/)

---

## Sommaire

- [Présentation](#présentation)
- [Fonctionnalités Clés](#fonctionnalités-clés)
- [Spécificités Locales (Togo)](#spécificités-locales-togo)
- [Guide de Démonstration Client](#guide-de-démonstration-client)
- [Architecture du Projet](#architecture-du-projet)
- [Stack Technique](#stack-technique)
- [Installation et Démarrage](#installation-et-démarrage)
- [Configuration et Déploiement](#configuration-et-déploiement)
- [Contact](#contact)

---

## Présentation

**L'Atelier Braisé** est une plateforme web conçue pour convertir les visiteurs en clients sans friction :
1. **Compréhension immédiate :** Dès l'arrivée sur le site, le positionnement est clair (grillades au feu de bois, poissons frais de la côte, terrasse aérée).
2. **Commande et réservation sans appel :** Intégration WhatsApp directe avec messages pré-remplis pour réserver une table ou commander à emporter / en livraison.
3. **Transparence tarifaire :** Menu complet avec prix en Francs CFA (FCFA) et tri visuel valorisant les spécialités en photo.
4. **Zéro attente à table :** Pré-commande des plats à la réservation pour lancer la braise (25-30 min de cuisson) avant l'arrivée du client.

---

## Fonctionnalités Clés

### 1. Navigation et Expérience Utilisateur
- **Thème Clair par Défaut & Mode Sombre :** Palette chaleureuse (`#FAFAF8` terracotta / charbon) avec commutateur universel accessible dans le header, le menu mobile et le footer.
- **Micro-barre d'état en direct :** Indication automatique du statut d'ouverture (ouvert / fermé selon l'heure locale de Lomé) et accès rapide aux contacts.
- **Barre d'action mobile fixe :** Raccourcis tactiles permanents en bas d'écran (Appel direct, Carte, Plan Lomé, WhatsApp).
- **Animations douces au défilement :** Effet d'apparition progressif via `IntersectionObserver` sans surcharge visuelle.

### 2. Menu et Commande en Ligne
- **Filtrage par Catégorie :** Grillades Signature, Spécialités & Plats, Accompagnements, Desserts, Cocktails & Boissons.
- **Tri intelligent :** Priorité systématique aux plats avec photos réelles.
- **Fiche détail produit :** Modal détaillant les ingrédients, le temps de cuisson au charbon et les suggestions d'accompagnements (Alloco, frites de patate douce).
- **Panier Multi-Plats WhatsApp :** Slide-over latéral permettant de constituer une commande complète, d'indiquer le type de service (Sur place, À emporter, Livraison) et d'envoyer le récapitulatif directement sur WhatsApp.

### 3. Réservation et Pré-commande
- **Sélecteur ergonomique sans débordement :** Boîte de dialogue dédiée (`<Teleport to="body">`) avec recherche textuelle et filtres par catégorie.
- **Plateau récapitulatif :** Affichage clair des plats pré-sélectionnés avec miniatures, prix individuels, suppression en un clic et total estimé.

### 4. Galerie et Lightbox
- **4 univers photographiques :** Poissons & Grillades, Terrasse & Cadre, Braise & Savoir-faire, Cocktails & Boissons.
- **Visionneuse plein écran :** Navigation clavier ($\leftarrow / \rightarrow$, Échap), boutons tactiles et boutons d'action contextuels vers la carte ou la réservation.

---

## Spécificités Locales (Togo)

| Paramètre | Configuration |
| :--- | :--- |
| **Numéro WhatsApp** | `+228 70 44 43 06` (lien direct universel `wa.me/22870444306`) |
| **Téléphone direct** | `+228 70 44 43 06` |
| **Devise** | Franc CFA (FCFA) avec séparateur de milliers |
| **Moyens de paiement** | T-Money (Togocom), Moov Money (Flooz), Espèces (FCFA) |
| **Zones de livraison** | Nyékonakpoé (gratuit dès 10 000 FCFA), Tokoin, Kodjoviakopé, Bè, Agoè, Baguida, etc. avec calcul automatique des frais |
| **Localisation** | Boulevard de la Paix, Quartier Nyékonakpoé, Lomé — avec carte Google Maps interactive intégrée |

---

## Guide de Démonstration Client

Lors de la présentation du site à un restaurateur ou client potentiel, déroulez ces 6 points clés :

1. **Le titre :** On comprend tout de suite quel type de restaurant c'est (grillades au feu de bois, poissons braisés frais).
2. **Le bouton WhatsApp :** Le client réserve ou commande en 1 clic sans avoir besoin d'appeler.
3. **Le menu avec les prix en FCFA :** C'est la première chose que les clients cherchent, avec les photos réelles mises en avant.
4. **Horaires et adresse à Lomé :** Plus besoin de répondre aux mêmes questions tous les jours (accès Nyékonakpoé, parking gardé).
5. **L'affichage sur téléphone :** Montrez-lui directement sur son smartphone la barre d'action rapide et la fluidité de commande.
6. **Le mode sombre / clair :** Le site s'adapte au confort visuel du visiteur.

> **Phrase de conclusion recommandée :**  
> *« Si vous voulez, je vous prépare votre version avec votre menu et vos photos. Vous préférez que je commence cette semaine ? »*

---

## Architecture du Projet

```text
atelier-braise/
├── app/
│   ├── app.vue                         # Layout racine et balises SEO OpenGraph
│   ├── assets/
│   │   └── css/main.css                # Styles Tailwind, polices, barres de défilement
│   ├── components/
│   │   ├── CartDrawer.vue              # Panier slide-over & calcul des frais de livraison
│   │   ├── DishDetailModal.vue         # Modal détail d'un plat (cuisson, accord)
│   │   ├── EventsSection.vue           # Section service traiteur & privatisation
│   │   ├── FaqSection.vue              # Accordéon des questions fréquentes
│   │   ├── GallerySection.vue          # Galerie avec tri par catégorie & lightbox
│   │   ├── HeroSection.vue             # Accroche, bénéfices, CTA WhatsApp
│   │   ├── HighlightsSection.vue       # 4 piliers de réassurance
│   │   ├── LocationSection.vue         # Google Maps interactif et itinéraire
│   │   ├── MenuSection.vue             # Carte complète, filtres et recherche
│   │   ├── MobileStickyBar.vue         # Barre fixe 4 boutons pour mobile
│   │   ├── PracticalInfoSection.vue    # Horaires en direct, paiements, adresse
│   │   ├── ReservationSection.vue      # Formulaire avec modal de pré-commande
│   │   ├── ReviewsSection.vue          # Avis clients vérifiés (note 4.9/5)
│   │   ├── TheFooter.vue               # Liens rapides, mentions et toggle thème
│   │   └── TheHeader.vue               # Navigation desktop/mobile, statut live
│   ├── composables/
│   │   ├── useCart.ts                  # Gestion réactive du panier et livraison Lomé
│   │   ├── useRestaurantStatus.ts      # Calcul d'ouverture selon l'heure locale
│   │   └── useTheme.ts                 # Gestion du mode clair / sombre (localStorage)
│   ├── data/
│   │   └── restaurant.ts               # Source de vérité (infos, menu, avis, photos)
│   └── plugins/
│       └── scroll-reveal.client.ts     # Détection de défilement (IntersectionObserver)
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── nuxt.config.ts                      # Configuration Nuxt, Tailwind & Head SEO
├── package.json
├── tailwind.config.ts                  # Couleurs braise/charcoal & polices
└── tsconfig.json
```

---

## Stack Technique

- **Framework :** [Nuxt 3](https://nuxt.com/) (Vue 3, Vite, Nitro Server)
- **Styling :** [Tailwind CSS](https://tailwindcss.com/)
- **Typographie :**
  - Titres : *Playfair Display* (Google Fonts)
  - Textes : *Plus Jakarta Sans* (Google Fonts)
- **Icônes :** Font Awesome 6 Free (`@fortawesome/fontawesome-free`)
- **Langage :** TypeScript strict

---

## Installation et Démarrage

### Prérequis
- **Node.js** : version 18.x ou 20.x recommandée
- **npm** (ou pnpm / yarn)

### 1. Cloner le dépôt

```bash
git clone https://github.com/Moucharif/atelier-braise.git
cd atelier-braise
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer le serveur de développement

```bash
npm run dev
```

L'application est disponible sur : **`http://localhost:3000`**

---

## Configuration et Déploiement

### Compiler pour la production

```bash
npm run build
```

### Tester le serveur de production localement

```bash
PORT=3000 node .output/server/index.mjs
```

### Déploiement en 1 clic
Le projet est prêt à être hébergé sur :
- **Vercel** / **Netlify** (détection automatique de Nuxt 3)
- **Render** / **Railway** / **VPS** avec `node .output/server/index.mjs`

---

## Contact

- **Établissement :** L'Atelier Braisé — Lomé, Togo
- **WhatsApp :** [+228 70 44 43 06](https://wa.me/22870444306)
- **Quartier :** Nyékonakpoé, Boulevard de la Paix
- **Dépôt GitHub :** [https://github.com/Moucharif/atelier-braise](https://github.com/Moucharif/atelier-braise)
