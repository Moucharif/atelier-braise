<script setup lang="ts">
import { RESTAURANT_INFO } from '~/data/restaurant'
import { useCart } from '~/composables/useCart'

const { isCartOpen } = useCart()

// SEO and Meta Tags
useSeoMeta({
  title: `${RESTAURANT_INFO.name} | ${RESTAURANT_INFO.tagline}`,
  ogTitle: `${RESTAURANT_INFO.name} | ${RESTAURANT_INFO.tagline}`,
  description: `${RESTAURANT_INFO.shortDescription} Consultez notre carte avec les prix en FCFA et réservez directement sans attente sur WhatsApp.`,
  ogDescription: `${RESTAURANT_INFO.shortDescription} Réservation directe en ligne et sur WhatsApp.`,
  ogImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
  twitterCard: 'summary_large_image',
  robots: 'index, follow'
})

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#FAFAF8] dark:bg-charcoal-950 text-charcoal-800 dark:text-charcoal-100 transition-colors duration-200 overflow-x-hidden max-w-full w-full relative">
    <!-- Top Reading / Scroll Progress Bar -->
    <div id="scroll-progress" aria-hidden="true"></div>

    <!-- Header with Live Status, Navigation & WhatsApp CTA -->
    <TheHeader />

    <!-- Main Content Area -->
    <main class="flex-grow overflow-x-hidden max-w-full w-full relative">
      <!-- 1. Hero Section: Nom, phrase d'accroche, photo principale, bouton WhatsApp -->
      <HeroSection />

      <!-- 2. Highlights / Preuves rassurantes -->
      <HighlightsSection />

      <!-- 3. Menu: Plats, descriptions courtes, prix en FCFA + commande WhatsApp par plat -->
      <MenuSection />

      <!-- 4. Infos pratiques: Adresse, horaires midi/soir, téléphones, moyens de paiement -->
      <PracticalInfoSection />

      <!-- 5. Localisation: Carte Google Maps intégrée & itinéraires -->
      <LocationSection />

      <!-- 6. Réservation & Contact: Formulaire instantané WhatsApp + appel -->
      <ReservationSection />

      <!-- 7. Section optionnelle: Avis clients Google vérifiés (4.9/5) -->
      <ReviewsSection />

      <!-- 8. Section optionnelle: Galerie photos d'ambiance et des grillades -->
      <GallerySection />

      <!-- 9. Section optionnelle: Événements, anniversaires et service traiteur à domicile -->
      <EventsSection />

      <!-- 10. FAQ Pratique: Questions fréquentes (Parking, Temps de braise, Réservations) -->
      <FaqSection />
    </main>

    <!-- Pied de page: Nom, adresse, mentions, Facebook & Instagram -->
    <TheFooter />

    <!-- Panier de Commande Multi-Plats WhatsApp (Slide-over avec calcul des frais de livraison Lomé) -->
    <CartDrawer />

    <!-- Floating Scroll-To-Top Button (Desktop only: avoids covering content and form controls on mobile) -->
    <button
      id="back-to-top-btn"
      type="button"
      @click="scrollToTop"
      class="hidden md:flex fixed bottom-6 left-6 z-30 w-11 h-11 rounded-2xl bg-white/90 dark:bg-charcoal-800/90 backdrop-blur-md border border-charcoal-200 dark:border-charcoal-700 text-charcoal-700 dark:text-charcoal-200 shadow-lg items-center justify-center opacity-0 pointer-events-none translate-y-4 transition-all duration-300 hover:border-braise-500 hover:text-braise-600 active:scale-95 group"
      aria-label="Retour en haut de page"
      title="Retour en haut"
    >
      <i class="fa-solid fa-arrow-up text-xs transition-transform group-hover:-translate-y-0.5"></i>
    </button>

    <!-- Mobile-Only Fixed Bottom Action Bar (Appeler, Menu, Accès, WhatsApp) -->
    <MobileStickyBar />
  </div>
</template>
