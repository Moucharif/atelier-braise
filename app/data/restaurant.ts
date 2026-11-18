export interface MenuItem {
  id: string
  name: string
  category: 'grillades' | 'specialites' | 'accompagnements' | 'desserts' | 'boissons'
  description: string
  price: number // in FCFA
  isChefSpecial?: boolean
  isPopular?: boolean
  prepTime?: string
  image: string // Obligatoire : tous les plats affichés ont une image soignée
}

export interface Review {
  id: string
  author: string
  role?: string
  rating: number
  date: string
  comment: string
  verified: boolean
}

export interface DeliveryZone {
  id: string
  name: string
  shortLabel: string
  fee: number
  neighborhoods: string
  estimatedTime: string
}

export const LOME_DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'zone-1',
    name: 'Zone 1 - Centre-Ville & Proximité',
    shortLabel: 'Nyékonakpoé / Décon / Centre',
    fee: 1000,
    neighborhoods: 'Nyékonakpoé, Kodjoviakopé, Décon, Boulevard Circulaire, Marina, Grand Marché',
    estimatedTime: '25 à 35 min'
  },
  {
    id: 'zone-2',
    name: 'Zone 2 - Quartiers Est & Proches',
    shortLabel: 'Tokoin / Bè / Hédzranawoé',
    fee: 1500,
    neighborhoods: 'Tokoin, Bè, Hédzranawoé, Casablanca, Lomé 2, GTA, Hanoukopé, Atikpodji',
    estimatedTime: '35 à 45 min'
  },
  {
    id: 'zone-3',
    name: 'Zone 3 - Nord & Ouest Lomé',
    shortLabel: 'Agoè / Totsi / Adidogomé',
    fee: 2000,
    neighborhoods: 'Agoè-Nyivé, Totsi, Adidogomé, Cacaveli, Kégué, Avédji, Légbassito',
    estimatedTime: '45 à 60 min'
  },
  {
    id: 'zone-4',
    name: 'Zone 4 - Périphérie & Côte Est',
    shortLabel: 'Baguida / Avépozo / Zanguéra',
    fee: 3000,
    neighborhoods: 'Baguida, Avépozo, Djagblé, Sagbado, Zanguéra, Noépé',
    estimatedTime: '55 à 75 min'
  }
]

export const RESTAURANT_INFO = {
  name: "L'Atelier Braisé",
  tagline: "Grillades au feu de bois & Saveurs Authentiques - Lomé",
  shortDescription: "Poissons braisés de la côte, poulets fermiers marinés aux épices du terroir et brochettes fumées au feu de bois à Lomé. Une cuisine authentique préparée à la minute dans un cadre convivial.",
  country: "Togo",
  phoneDisplay: "+228 70 44 43 06",
  phoneRaw: "+22870444306",
  whatsappNumber: "+22870444306",
  whatsappDefaultMessage: "Bonjour L'Atelier Braisé Lomé, je souhaite faire une réservation / passer une commande.",
  address: "Boulevard de la Paix, Quartier Nyékonakpoé",
  city: "Lomé, Togo",
  landmark: "Repère : À 200m du carrefour Nyékonakpoé, non loin de l'Hôtel Palm Beach et de la plage.",
  googleMapsUrl: "https://maps.google.com/?q=Nyekonakpoe+Lome+Togo",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15867.70119293427!2d1.205934!3d6.136829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023e1c0d45362ff%3A0x6b77242a1ecf1766!2sNy%C3%A9konakpo%C3%A9%2C%20Lom%C3%A9%2C%20Togo!5e0!3m2!1sfr!2stg!4v1710000000000!5m2!1sfr!2stg",
  hours: [
    { day: "Lundi", hours: "Fermé (Repos de l'équipe)", isOpen: false },
    { day: "Mardi", hours: "12:00 - 15:00 & 18:30 - 23:30", isOpen: true },
    { day: "Mercredi", hours: "12:00 - 15:00 & 18:30 - 23:30", isOpen: true },
    { day: "Jeudi", hours: "12:00 - 15:00 & 18:30 - 23:30", isOpen: true },
    { day: "Vendredi", hours: "12:00 - 15:30 & 18:30 - 00:30", isOpen: true },
    { day: "Samedi", hours: "12:00 - 16:00 & 18:30 - 01:00", isOpen: true },
    { day: "Dimanche", hours: "12:00 - 16:30 & 18:30 - 23:00", isOpen: true }
  ],
  payments: [
    { name: "T-Money (Togocom)", icon: "fa-solid fa-mobile-screen-button" },
    { name: "Moov Money (Flooz)", icon: "fa-solid fa-money-bill-transfer" },
    { name: "Espèces (FCFA)", icon: "fa-solid fa-coins" }
  ],
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com"
  },
  demoPitch: {
    closingQuestion: "Si vous voulez, je vous prépare votre version avec votre menu et vos photos. Vous préférez que je commence cette semaine ?",
    points: [
      {
        title: "Le titre clair",
        desc: "Le client comprend instantanément le type de cuisine et le positionnement du restaurant à Lomé."
      },
      {
        title: "Bouton WhatsApp direct (+228 70 44 43 06)",
        desc: "Réservation et commande en 1 clic sans faire sonner le téléphone en cuisine."
      },
      {
        title: "Le menu & les prix en FCFA",
        desc: "Tous les plats ont une photo soignée et leurs prix réels sont immédiatement visibles."
      },
      {
        title: "Horaires & adresse à Lomé (Togo)",
        desc: "Repères précis à Nyékonakpoé et gestion des paiements T-Money et Flooz."
      },
      {
        title: "Affichage mobile ergonomique",
        desc: "Barre d'accès rapide sous le pouce avec panier de commande multi-plats."
      },
      {
        title: "Mode sombre & clair",
        desc: "S'adapte confortablement à l'ambiance lumineuse du smartphone du client."
      }
    ]
  }
}

export const MENU_CATEGORIES = [
  { id: 'all', label: 'Tout le menu' },
  { id: 'grillades', label: 'Grillades Signature' },
  { id: 'specialites', label: 'Spécialités & Plats' },
  { id: 'accompagnements', label: 'Accompagnements' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'boissons', label: 'Boissons & Cocktails' }
]

// TOUS les plats ont une photo haute définition réelle et appétissante.
// Classés en priorité avec photo conformément à la consigne.
export const MENU_ITEMS: MenuItem[] = [
  // 1. Grillades Signature
  {
    id: 'capitaine-braise',
    name: 'Capitaine Braisé Royal (Portion Entière)',
    category: 'grillades',
    description: 'Pêche fraîche du jour, marinade secrète aux épices sauvages, cuit lentement à la braise. Servi avec oignons et piment doux.',
    price: 9500,
    isChefSpecial: true,
    isPopular: true,
    prepTime: '25-30 min',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'poulet-bicyclette',
    name: 'Poulet Bicyclette Fermier Crapaudine',
    category: 'grillades',
    description: 'Poulet fermier tendre et croustillant, mariné au gingembre, ail pays et épices locales. Braisé au charbon de bois.',
    price: 8000,
    isPopular: true,
    prepTime: '20-25 min',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'brochettes-suya',
    name: 'Trio de Brochettes Filet de Bœuf (Tchitchinga / Suya)',
    category: 'grillades',
    description: 'Brochettes généreuses de cœur de filet de bœuf, enrobées d\'épices tchitchinga douces, grillées à la flamme.',
    price: 5500,
    isChefSpecial: false,
    isPopular: true,
    prepTime: '15 min',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'carpe-rouge-braisee',
    name: 'Carpe Rouge Braisée à la Braise de Bois',
    category: 'grillades',
    description: 'Carpe rouge entière dorée sur la grille, persillade maison, tomate concassée et lamelles d\'oignons caramélisés.',
    price: 7500,
    isPopular: false,
    prepTime: '20 min',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'travers-porc-braise',
    name: 'Travers de Porc Braisés Sauce Miel & Épices',
    category: 'grillades',
    description: 'Côtes caramélisées au feu de bois, laquées d\'un miel local doux et piment fumé. Fondant garanti.',
    price: 7000,
    isChefSpecial: true,
    isPopular: false,
    prepTime: '20 min',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80'
  },

  // 2. Spécialités & Plats
  {
    id: 'kedjenou-pintade',
    name: 'Pintade Mijotée en Canari Terre Cuite',
    category: 'specialites',
    description: 'Pintade mijotée à l\'étouffée dans son canari en terre cuite, tomates fraîches, petits légumes et poivre sauvage.',
    price: 8500,
    isChefSpecial: true,
    prepTime: '30 min',
    image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'soupe-pecheur',
    name: 'Soupe du Pêcheur Épicée de la Côte',
    category: 'specialites',
    description: 'Bouillon parfumé aux fruits de mer de Lomé (crevettes fraîches, mérou, crabes), relevé au poivre et basilic.',
    price: 9000,
    isPopular: true,
    prepTime: '20 min',
    image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=700&q=80'
  },

  // 3. Accompagnements
  {
    id: 'alloco-dore',
    name: 'Alloco Banane Plantain Dorée',
    category: 'accompagnements',
    description: 'Bananes plantains mûres à point, frites à l\'huile claire, servies avec notre sauce piment doux maison.',
    price: 1500,
    isPopular: true,
    prepTime: '10 min',
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'frites-patate-douce',
    name: 'Frites Croustillantes de Patate Douce',
    category: 'accompagnements',
    description: 'Patates douces locales coupées main, sel marin et mayonnaise relevée maison.',
    price: 1500,
    isPopular: true,
    prepTime: '10 min',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'riz-parfume-legumes',
    name: 'Riz Parfumé aux Petits Légumes Croquants',
    category: 'accompagnements',
    description: 'Riz mijoté aux herbes douces, poivrons, carottes et échalotes suées au beurre doux.',
    price: 1500,
    isPopular: false,
    prepTime: '5 min',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=80'
  },

  // 4. Desserts
  {
    id: 'degue-artisanal',
    name: 'Dégué Traditionnel & Fleur d\'Oranger',
    category: 'desserts',
    description: 'Couscous de mil tendre lié au yaourt frais onctueux, muscade douce et fleur d\'oranger.',
    price: 2500,
    isChefSpecial: true,
    isPopular: true,
    prepTime: '5 min',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'ananas-roti',
    name: 'Ananas Victoria Rôti à la Cannelle & Glace',
    category: 'desserts',
    description: 'Tranches d\'ananas braisées à la flamme, sirop caramélisé au miel et boule de glace vanille.',
    price: 3000,
    isPopular: false,
    prepTime: '10 min',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80'
  },

  // 5. Boissons & Cocktails
  {
    id: 'bissap-menthe',
    name: 'Bissap Frais Menthe & Hibiscus (50cl)',
    category: 'boissons',
    description: 'Infusion maison de calices d\'hibiscus pourpre, menthe fraîchement cueillie, légèrement sucré au miel.',
    price: 1500,
    isPopular: true,
    prepTime: 'Immédiat',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'gnamankoudji-gingembre',
    name: 'Pur Jus de Gingembre Frais & Citron Vert (50cl)',
    category: 'boissons',
    description: 'Pur jus de gingembre frais extrait à froid, ananas et zeste de citron vert pressé.',
    price: 1500,
    isPopular: true,
    prepTime: 'Immédiat',
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'cocktail-braise',
    name: 'Cocktail Signature « Braise Tropicale »',
    category: 'boissons',
    description: 'Rhum ambré, purée de fruit de la passion, nectar de mangue fraîche, trait de citron et cannelle flambée.',
    price: 4500,
    isChefSpecial: true,
    prepTime: '5 min',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80'
  }
]

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Koffi A.',
    role: 'Client régulier - Nyékonakpoé',
    rating: 5,
    date: 'Il y a 2 jours',
    comment: 'Le meilleur capitaine braisé de Lomé ! La cuisson au feu de bois est parfaitement maîtrisée, le poisson est juteux et l\'alloco croustillant. Réservation sur WhatsApp super pratique.',
    verified: true
  },
  {
    id: '2',
    author: 'Afiwa M.',
    role: 'Dîner entre amis',
    rating: 5,
    date: 'La semaine dernière',
    comment: 'Ambiance chaleureuse et terrasse très agréable le soir à Nyékonakpoé. Paiement en T-Money rapide à table, accueil au top.',
    verified: true
  },
  {
    id: '3',
    author: 'Edem D.',
    role: 'Repas de famille',
    rating: 5,
    date: 'Il y a 2 semaines',
    comment: 'Le poulet bicyclette croustillant avec les brochettes tchitchinga, un vrai régal. On a pu se garer très facilement juste devant.',
    verified: true
  }
]

export interface GalleryPhoto {
  id: string
  url: string
  title: string
  desc: string
  category: 'grillades' | 'ambiance' | 'cuisine' | 'boissons'
  categoryLabel: string
  actionLabel?: string
  actionHref?: string
}

export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'Toutes les photos', icon: 'fa-solid fa-border-all' },
  { id: 'grillades', label: 'Poissons & Grillades', icon: 'fa-solid fa-fish' },
  { id: 'ambiance', label: 'Terrasse & Cadre', icon: 'fa-solid fa-tree' },
  { id: 'cuisine', label: 'Braise & Savoir-Faire', icon: 'fa-solid fa-fire-burner' },
  { id: 'boissons', label: 'Cocktails & Boissons', icon: 'fa-solid fa-martini-glass-citrus' }
]

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  // 1. Poissons & Grillades
  {
    id: 'g-1',
    url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
    title: 'Capitaine Braisé Royal de la Côte',
    desc: 'Pêche fraîche du jour grillée entière sur braises incandescentes avec piment vert et oignons.',
    category: 'grillades',
    categoryLabel: 'Poissons & Grillades',
    actionLabel: 'Commander ce plat sur la carte',
    actionHref: '#menu'
  },
  {
    id: 'g-2',
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
    title: 'Trio de Brochettes & Grillades Fumées',
    desc: 'Filet de bœuf assaisonné au tchitchinga traditionnel et doré à la minute.',
    category: 'grillades',
    categoryLabel: 'Poissons & Grillades',
    actionLabel: 'Voir les prix sur la carte',
    actionHref: '#menu'
  },
  {
    id: 'g-3',
    url: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1200&q=80',
    title: 'Poulet Bicyclette Fermier Crapaudine',
    desc: 'Poulet local mariné aux épices du terroir togolais avec sa peau croustillante.',
    category: 'grillades',
    categoryLabel: 'Poissons & Grillades',
    actionLabel: 'Commander ce plat sur la carte',
    actionHref: '#menu'
  },
  {
    id: 'g-4',
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    title: 'Travers de Porc Braisés Miel & Épices',
    desc: 'Côtes caramélisées lentement au feu de bois pour une texture fondante.',
    category: 'grillades',
    categoryLabel: 'Poissons & Grillades',
    actionLabel: 'Voir les grillades au menu',
    actionHref: '#menu'
  },
  {
    id: 'g-5',
    url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80',
    title: 'Carpe Rouge Braisée & Alloco Maison',
    desc: 'Chair fine et fondante sublimée par nos rondelles de plantain doré.',
    category: 'grillades',
    categoryLabel: 'Poissons & Grillades',
    actionLabel: 'Consulter la carte',
    actionHref: '#menu'
  },

  // 2. Terrasse & Ambiance
  {
    id: 'g-6',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    title: 'Notre Terrasse Végétalisée à Nyékonakpoé',
    desc: 'Un espace aéré et ventilé, parfait pour vos déjeuners et dîners conviviaux à Lomé.',
    category: 'ambiance',
    categoryLabel: 'Terrasse & Cadre',
    actionLabel: 'Réserver une table en terrasse',
    actionHref: '#reservation'
  },
  {
    id: 'g-7',
    url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80',
    title: 'Ambiance Soirée Lumineuse & Chaleureuse',
    desc: 'Lumières douces, musique d\'ambiance et service attentionné dès la tombée de la nuit.',
    category: 'ambiance',
    categoryLabel: 'Terrasse & Cadre',
    actionLabel: 'Réserver pour ce soir',
    actionHref: '#reservation'
  },
  {
    id: 'g-8',
    url: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80',
    title: 'Tables pour Groupes & Familles',
    desc: 'Espaces modulables pour vos repas de groupe, anniversaires et retrouvailles.',
    category: 'ambiance',
    categoryLabel: 'Terrasse & Cadre',
    actionLabel: 'Demande repas de groupe',
    actionHref: '#evenements'
  },
  {
    id: 'g-9',
    url: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=1200&q=80',
    title: 'Le Cadre Reposant en Plein Cœur de Lomé',
    desc: 'À 200m du carrefour Nyékonakpoé, un havre de paix loin du tumulte urbain.',
    category: 'ambiance',
    categoryLabel: 'Terrasse & Cadre',
    actionLabel: 'Voir le plan d\'accès',
    actionHref: '#localisation'
  },

  // 3. Cuisine & Feu de Bois
  {
    id: 'g-10',
    url: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80',
    title: 'Le Chef Grillardin en Action',
    desc: 'Maîtrise du feu et précision de cuisson pour chaque poisson et pièce de viande.',
    category: 'cuisine',
    categoryLabel: 'Braise & Savoir-Faire',
    actionLabel: 'Pré-commander vos plats',
    actionHref: '#reservation'
  },
  {
    id: 'g-11',
    url: 'https://images.unsplash.com/photo-1509315811345-672d83ef2fbc?auto=format&fit=crop&w=1200&q=80',
    title: 'Braises Incandescentes au Bois Naturel',
    desc: 'Le secret de notre saveur fumée : aucun gaz, uniquement des essences de bois dur.',
    category: 'cuisine',
    categoryLabel: 'Braise & Savoir-Faire',
    actionLabel: 'Voir les spécialités braisées',
    actionHref: '#menu'
  },
  {
    id: 'g-12',
    url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
    title: 'Marinades Artisanales & Épices Locales',
    desc: 'Piments sélectionnés, gingembre frais, ail et herbes fraîches pilés chaque matin.',
    category: 'cuisine',
    categoryLabel: 'Braise & Savoir-Faire',
    actionLabel: 'Découvrir la carte',
    actionHref: '#menu'
  },

  // 4. Cocktails & Boissons
  {
    id: 'g-13',
    url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80',
    title: 'Cocktail Frais aux Fruits Tropicaux',
    desc: 'Ananas doux de Tsévié, menthe fraîche et agrumes pressés à la commande.',
    category: 'boissons',
    categoryLabel: 'Cocktails & Boissons',
    actionLabel: 'Voir les boissons au menu',
    actionHref: '#menu'
  },
  {
    id: 'g-14',
    url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80',
    title: 'Jus de Bissap Maison Glacé & Infusion Menthe',
    desc: 'Recette rafraîchissante préparée selon la pure tradition de Lomé.',
    category: 'boissons',
    categoryLabel: 'Cocktails & Boissons',
    actionLabel: 'Consulter la carte des boissons',
    actionHref: '#menu'
  }
]
