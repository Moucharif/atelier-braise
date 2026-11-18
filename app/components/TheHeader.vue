<script setup lang="ts">
import { ref } from 'vue'
import { RESTAURANT_INFO } from '~/data/restaurant'
import { useTheme } from '~/composables/useTheme'
import { useRestaurantStatus } from '~/composables/useRestaurantStatus'
import { useCart } from '~/composables/useCart'

const { isDark, toggleTheme } = useTheme()
const { status } = useRestaurantStatus()
const { isCartOpen, totalCount } = useCart()
const isMobileMenuOpen = ref(false)

const desktopNavLinks = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#menu', label: 'La Carte & Tarifs' },
  { href: '#infos', label: 'Horaires & Accès' },
  { href: '#localisation', label: 'Plan Lomé' },
  { href: '#avis', label: 'Avis' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#reservation', label: 'Réserver' }
]

const allNavLinks = [
  { href: '#accueil', label: 'Accueil', icon: 'fa-solid fa-house' },
  { href: '#menu', label: 'La Carte & Prix FCFA', icon: 'fa-solid fa-utensils' },
  { href: '#infos', label: 'Horaires & Paiements', icon: 'fa-regular fa-clock' },
  { href: '#localisation', label: 'Plan d\'Accès Lomé', icon: 'fa-solid fa-location-dot' },
  { href: '#reservation', label: 'Réserver une Table', icon: 'fa-solid fa-calendar-check' },
  { href: '#avis', label: 'Avis Clients Vérifiés', icon: 'fa-solid fa-star' },
  { href: '#galerie', label: 'Galerie & Ambiance', icon: 'fa-solid fa-camera' },
  { href: '#evenements', label: 'Service Traiteur & Fêtes', icon: 'fa-solid fa-champagne-glasses' },
  { href: '#faq', label: 'Foire Aux Questions (FAQ)', icon: 'fa-solid fa-circle-question' }
]

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-40 w-full bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-md border-b border-charcoal-200/80 dark:border-charcoal-800 transition-colors">
    <!-- Top Demonstration Notice Banner (Visible on Mobile & Desktop) -->
    <div class="bg-amber-500/10 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-b border-amber-500/20 px-3 py-1.5 text-center text-[11px] sm:text-xs overflow-hidden break-words">
      <div class="max-w-7xl mx-auto flex items-center justify-center gap-x-2 gap-y-1 flex-wrap">
        <span class="inline-flex items-center gap-1 font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded-md bg-amber-500/20">
          <i class="fa-solid fa-flask text-[10px]"></i>
          Site de démonstration
        </span>
        <span class="hidden sm:inline">•</span>
        <span class="text-charcoal-700 dark:text-charcoal-200">
          Modèle d'application clé en main pour restaurant & grillades à Lomé.
        </span>
        <a
          :href="'https://wa.me/' + RESTAURANT_INFO.whatsappNumber.replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent('Bonjour, j\'ai vu le site de démonstration L\'Atelier Braisé et je souhaite créer mon propre site de restaurant à Lomé.')"
          target="_blank"
          rel="noopener noreferrer"
          class="font-bold underline text-braise-700 dark:text-braise-300 hover:text-braise-900 dark:hover:text-white transition-colors"
        >
          Créer votre version WhatsApp (+228 70 44 43 06) →
        </a>
      </div>
    </div>

    <!-- Top Micro Bar: Status & Direct Contact (Adapts to Light & Dark) -->
    <div class="hidden md:block bg-[#F2F2EE] dark:bg-charcoal-950 text-charcoal-700 dark:text-charcoal-300 text-xs py-2 px-4 border-b border-charcoal-200/80 dark:border-charcoal-800 transition-colors">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-medium" :class="status.badgeColor">
            <span class="w-1.5 h-1.5 rounded-full" :class="status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'"></span>
            {{ status.label }}
          </span>
          <a href="#localisation" class="inline-flex items-center gap-1.5 text-charcoal-600 dark:text-charcoal-400 hover:text-braise-600 dark:hover:text-white transition-colors">
            <i class="fa-solid fa-location-dot text-braise-500 dark:text-braise-400 text-xs"></i>
            {{ RESTAURANT_INFO.address }}, {{ RESTAURANT_INFO.city }}
          </a>
        </div>
        <div class="flex items-center space-x-4">
          <a
            :href="'tel:' + RESTAURANT_INFO.phoneRaw"
            class="inline-flex items-center gap-1.5 hover:text-braise-600 dark:hover:text-white transition-colors"
          >
            <i class="fa-solid fa-phone text-braise-500 dark:text-braise-400 text-xs"></i>
            <span>{{ RESTAURANT_INFO.phoneDisplay }}</span>
          </a>
          <span class="text-charcoal-300 dark:text-charcoal-700">|</span>
          <a
            :href="'https://wa.me/' + RESTAURANT_INFO.whatsappNumber.replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent(RESTAURANT_INFO.whatsappDefaultMessage)"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold transition-colors"
          >
            <i class="fa-brands fa-whatsapp text-sm"></i>
            <span>WhatsApp (+228 70 44 43 06)</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
      <!-- Brand Logo / Name with refined border radius -->
      <a href="#accueil" class="flex items-center gap-3.5 group">
        <div class="w-11 h-11 rounded-2xl bg-braise-500 text-white flex items-center justify-center shadow-md group-hover:bg-braise-600 transition-colors">
          <i class="fa-solid fa-fire text-amber-200 text-lg"></i>
        </div>
        <div>
          <span class="text-xl sm:text-2xl font-bold tracking-tight text-charcoal-900 dark:text-white font-serif block leading-none">
            {{ RESTAURANT_INFO.name }}
          </span>
        </div>
      </a>

      <!-- Desktop Navigation Links -->
      <nav class="hidden lg:flex items-center space-x-6 text-sm font-medium text-charcoal-600 dark:text-charcoal-300">
        <a
          v-for="link in desktopNavLinks"
          :key="link.href"
          :href="link.href"
          class="hover:text-braise-600 dark:hover:text-braise-400 transition-colors py-1"
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- Right Action CTAs -->
      <div class="flex items-center space-x-2 sm:space-x-3">
        <!-- Dark / Light Mode Toggle Button -->
        <button
          type="button"
          @click="toggleTheme"
          class="w-10 h-10 rounded-xl bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 hover:bg-charcoal-200 dark:hover:bg-charcoal-750 border border-charcoal-200 dark:border-charcoal-700 transition-colors flex items-center justify-center shadow-2xs"
          :title="isDark ? 'Passer en mode clair' : 'Passer en mode sombre'"
          aria-label="Basculer le thème clair / sombre"
        >
          <i v-if="isDark" class="fa-solid fa-sun text-amber-400 text-base"></i>
          <i v-else class="fa-solid fa-moon text-charcoal-700 text-base"></i>
        </button>

        <!-- Header Cart Button with Badge -->
        <button
          type="button"
          @click="isCartOpen = true"
          class="relative w-10 h-10 rounded-xl bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-200 hover:bg-charcoal-200 dark:hover:bg-charcoal-750 border border-charcoal-200 dark:border-charcoal-700 transition-colors flex items-center justify-center shadow-2xs"
          title="Voir ma commande"
        >
          <i class="fa-solid fa-bag-shopping text-sm"></i>
          <span
            v-if="totalCount > 0"
            class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-braise-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse"
          >
            {{ totalCount }}
          </span>
        </button>

        <!-- Direct WhatsApp CTA Button (Desktop) with Togo Number -->
        <a
          :href="'https://wa.me/' + RESTAURANT_INFO.whatsappNumber.replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent(RESTAURANT_INFO.whatsappDefaultMessage)"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-semibold shadow-sm transition-all transform hover:-translate-y-0.5"
        >
          <i class="fa-brands fa-whatsapp text-base"></i>
          <span>WhatsApp</span>
        </a>

        <!-- Mobile Menu Toggle Button -->
        <button
          type="button"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="lg:hidden w-10 h-10 rounded-xl bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 hover:bg-charcoal-200 dark:hover:bg-charcoal-750 border border-charcoal-200 dark:border-charcoal-700 transition-colors flex items-center justify-center"
          aria-label="Ouvrir le menu"
        >
          <i v-if="isMobileMenuOpen" class="fa-solid fa-xmark text-lg"></i>
          <i v-else class="fa-solid fa-bars text-lg"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden bg-white dark:bg-charcoal-900 border-b border-charcoal-200 dark:border-charcoal-800 px-5 pt-3 pb-6 shadow-xl space-y-3 max-h-[80vh] overflow-y-auto"
      >
        <!-- Mobile Live status badge -->
        <div class="pb-3 border-b border-charcoal-100 dark:border-charcoal-800 flex items-center justify-between">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium" :class="status.badgeColor">
            <span class="w-1.5 h-1.5 rounded-full" :class="status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'"></span>
            {{ status.label }}
          </span>
          <span class="text-xs text-charcoal-500 dark:text-charcoal-400">
            {{ status.sublabel }}
          </span>
        </div>

        <!-- Prominent Mobile Theme Switcher Bar -->
        <div class="p-3 rounded-2xl bg-charcoal-100 dark:bg-charcoal-800 flex items-center justify-between transition-colors">
          <div class="flex items-center gap-2.5 text-xs font-semibold text-charcoal-800 dark:text-charcoal-200">
            <i v-if="isDark" class="fa-solid fa-moon text-braise-500 text-sm"></i>
            <i v-else class="fa-solid fa-sun text-amber-500 text-sm"></i>
            <span>{{ isDark ? 'Mode Sombre actif' : 'Mode Clair actif' }}</span>
          </div>
          <button
            type="button"
            @click="toggleTheme"
            class="px-3 py-1.5 rounded-xl bg-white dark:bg-charcoal-700 text-xs font-bold text-charcoal-900 dark:text-white shadow-xs border border-charcoal-200 dark:border-charcoal-600 hover:border-braise-500 transition-colors"
          >
            {{ isDark ? 'Basculer en clair' : 'Basculer en sombre' }}
          </button>
        </div>

        <nav class="flex flex-col space-y-1 pt-1">
          <a
            v-for="link in allNavLinks"
            :key="link.href"
            :href="link.href"
            @click="closeMobileMenu"
            class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-charcoal-800 dark:text-charcoal-200 hover:bg-charcoal-50 dark:hover:bg-charcoal-800 hover:text-braise-600 transition-colors"
          >
            <i :class="link.icon" class="text-braise-500 w-4 text-center"></i>
            <span>{{ link.label }}</span>
          </a>
        </nav>

        <div class="pt-3 border-t border-charcoal-100 dark:border-charcoal-800 flex flex-col gap-2.5">
          <a
            :href="'https://wa.me/' + RESTAURANT_INFO.whatsappNumber.replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent(RESTAURANT_INFO.whatsappDefaultMessage)"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 text-white font-semibold text-sm shadow-sm"
          >
            <i class="fa-brands fa-whatsapp text-lg"></i>
            <span>WhatsApp (+228 70 44 43 06)</span>
          </a>

          <a
            :href="'tel:' + RESTAURANT_INFO.phoneRaw"
            class="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-800 dark:text-charcoal-200 font-semibold text-sm"
          >
            <i class="fa-solid fa-phone text-braise-500"></i>
            <span>Appeler : {{ RESTAURANT_INFO.phoneDisplay }}</span>
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>
