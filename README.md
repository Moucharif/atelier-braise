# L'Atelier Braisé — Lomé, Togo 🍽️🔥

Site vitrine moderne et performant pour le restaurant **L'Atelier Braisé**, spécialiste des grillades au feu de bois et poissons braisés à Lomé (Nyékonakpoé), Togo.

Développé avec **Nuxt 3**, **Vue 3**, **Tailwind CSS** et **Font Awesome**.

---

## ✨ Fonctionnalités Principales

- **Bouton WhatsApp Direct & Intelligent :** Réservation de table et commandes sans attente vers le numéro togolais (`+228 70 44 43 06`).
- **Menu Interactif & Prix en FCFA :**
  - Carte complète classée par catégories (Grillades Signature, Spécialités, Accompagnements, Desserts, Cocktails).
  - Tri automatique : affichage prioritaire des plats disposant de visuels photographiques HD.
  - Modal de détail avec fiches plats, temps de cuisson au charbon et accords recommandés.
- **Panier de Commande & Frais de Livraison à Lomé :**
  - Calcul dynamique des frais selon la zone (Nyékonakpoé, Tokoin, Kodjoviakopé, Bè, Agoè, Baguida...).
  - Options : Sur place, À emporter ou Livraison.
  - Moyens de paiement togolais : T-Money (Togocom), Moov Money (Flooz) et Espèces (FCFA).
- **Formulaire de Réservation & Pré-commande :**
  - Sélection fluide des plats à lancer avant l'arrivée pour éviter l'attente de la braise.
  - Récapitulatif avec miniatures, calcul du sous-total estimé et boîte modale de sélection ergonomique.
- **Galerie Photos & Lightbox :**
  - Tri par univers : Poissons & Grillades, Terrasse & Cadre, Braise & Savoir-faire, Cocktails & Boissons.
  - Affichage plein écran avec redirections directes vers la carte et la réservation.
- **Design Noble & Épuré (« Pas trop IA ») :**
  - Polices Playfair Display (titres) & Plus Jakarta Sans (corps).
  - Icônes Font Awesome 6.
  - Thème par défaut clair avec bascule mode sombre sur l'ensemble des pages.
  - Animations discrètes au défilement (IntersectionObserver).
  - Localisation Google Maps intégrée à Nyékonakpoé et calcul d'itinéraires.

---

## 🛠️ Stack Technique

- **Framework :** [Nuxt 3](https://nuxt.com/) (Vue 3, Vite, Nitro)
- **Styling :** [Tailwind CSS](https://tailwindcss.com/) (mode `dark: 'class'`)
- **Icônes :** [@fortawesome/fontawesome-free](https://fontawesome.com/)
- **Langage :** TypeScript

---

## 🚀 Démarrage Rapide

### 1. Installation des dépendances

```bash
npm install
```

### 2. Lancer le serveur de développement

```bash
npm run dev
```

L'application est accessible sur `http://localhost:3000`.

### 3. Compilation pour la production

```bash
npm run build
```

Pour prévisualiser le build de production :

```bash
PORT=3000 node .output/server/index.mjs
```

---

## 📍 Localisation & Contact

- **Restaurant :** L'Atelier Braisé
- **Ville :** Lomé, Togo (Quartier Nyékonakpoé, Boulevard de la Paix)
- **WhatsApp Officiel :** [+228 70 44 43 06](https://wa.me/22870444306)
- **Paiements :** T-Money, Flooz, FCFA
