<script setup lang="ts">
import { RESTAURANT_INFO } from '~/data/restaurant'
import { useTheme } from '~/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
const currentYear = new Date().getFullYear()

const footerNavLinks = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#menu', label: 'La Carte & Tarifs en FCFA' },
  { href: '#infos', label: 'Horaires & Informations' },
  { href: '#localisation', label: 'Plan d\'Accès Nyékonakpoé' },
  { href: '#reservation', label: 'Réserver une Table' },
  { href: '#avis', label: 'Avis Clients Vérifiés' },
  { href: '#galerie', label: 'Galerie Photos & Ambiance' },
  { href: '#evenements', label: 'Service Traiteur & Fêtes' },
  { href: '#faq', label: 'Foire Aux Questions' }
]
</script>

<template>
  <footer class="bg-[#F2F2EE] dark:bg-charcoal-900 text-charcoal-700 dark:text-charcoal-300 border-t border-charcoal-200/90 dark:border-charcoal-800 transition-colors pt-16 pb-28 md:pb-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-charcoal-200/80 dark:border-charcoal-800">
        <!-- Brand Col -->
        <div class="lg:col-span-5 space-y-4">
          <div class="flex items-center gap-3.5">
            <div class="w-11 h-11 rounded-2xl bg-braise-500 text-white flex items-center justify-center shadow-sm">
              <i class="fa-solid fa-fire text-amber-200 text-lg"></i>
            </div>
            <div>
              <span class="text-xl sm:text-2xl font-bold tracking-tight text-charcoal-900 dark:text-white font-serif block leading-none">
                {{ RESTAURANT_INFO.name }}
              </span>
              <span class="text-[11px] font-semibold text-charcoal-500 dark:text-charcoal-400 tracking-wider uppercase block mt-1">
                {{ RESTAURANT_INFO.tagline }}
              </span>
            </div>
          </div>

          <p class="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 max-w-sm leading-relaxed">
            {{ RESTAURANT_INFO.shortDescription }}
          </p>

          <!-- Social Links & Theme Toggle with Font Awesome Icons -->
          <div class="flex items-center space-x-3 pt-2">
            <a
              :href="RESTAURANT_INFO.socials.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-xl bg-white dark:bg-charcoal-800 hover:bg-braise-500 text-charcoal-700 dark:text-charcoal-300 hover:text-white dark:hover:text-white border border-charcoal-200 dark:border-charcoal-700 flex items-center justify-center transition-colors text-base shadow-xs"
              aria-label="Instagram"
              title="Instagram L'Atelier Braisé"
            >
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a
              :href="RESTAURANT_INFO.socials.facebook"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-xl bg-white dark:bg-charcoal-800 hover:bg-braise-500 text-charcoal-700 dark:text-charcoal-300 hover:text-white dark:hover:text-white border border-charcoal-200 dark:border-charcoal-700 flex items-center justify-center transition-colors text-base shadow-xs"
              aria-label="Facebook"
              title="Facebook L'Atelier Braisé"
            >
              <i class="fa-brands fa-facebook-f"></i>
            </a>
            <a
              :href="'https://wa.me/' + RESTAURANT_INFO.whatsappNumber.replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent(RESTAURANT_INFO.whatsappDefaultMessage)"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-xl bg-white dark:bg-charcoal-800 hover:bg-emerald-600 text-charcoal-700 dark:text-charcoal-300 hover:text-white dark:hover:text-white border border-charcoal-200 dark:border-charcoal-700 flex items-center justify-center transition-colors text-base shadow-xs"
              aria-label="WhatsApp"
              title="WhatsApp direct +228 70 44 43 06"
            >
              <i class="fa-brands fa-whatsapp"></i>
            </a>

            <!-- Quick Theme Switch in Footer -->
            <button
              type="button"
              @click="toggleTheme"
              class="px-3 h-10 rounded-xl bg-white dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 hover:text-braise-600 dark:hover:text-white border border-charcoal-200 dark:border-charcoal-700 flex items-center gap-2 text-xs font-semibold transition-colors shadow-xs"
              :title="isDark ? 'Passer en mode clair' : 'Passer en mode sombre'"
            >
              <i v-if="isDark" class="fa-solid fa-sun text-amber-400"></i>
              <i v-else class="fa-solid fa-moon text-charcoal-700"></i>
              <span>{{ isDark ? 'Mode Clair' : 'Mode Sombre' }}</span>
            </button>
          </div>
        </div>

        <!-- Quick Links (Tous les liens de redirection vers chaque section) -->
        <div class="lg:col-span-3 space-y-3">
          <h4 class="text-sm font-semibold uppercase tracking-wider text-charcoal-900 dark:text-white font-serif">
            Navigation Rapide
          </h4>
          <ul class="space-y-2 text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400">
            <li v-for="item in footerNavLinks" :key="item.href">
              <a :href="item.href" class="hover:text-braise-600 dark:hover:text-braise-400 transition-colors">
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Hours & Contact Recap for Togo -->
        <div class="lg:col-span-4 space-y-3">
          <h4 class="text-sm font-semibold uppercase tracking-wider text-charcoal-900 dark:text-white font-serif">
            Nous Trouver & Nous Joindre
          </h4>
          <div class="space-y-2.5 text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400">
            <p class="flex items-start gap-2.5">
              <i class="fa-solid fa-location-dot text-braise-500 shrink-0 mt-1"></i>
              <a href="#localisation" class="hover:text-charcoal-900 dark:hover:text-white transition-colors">
                {{ RESTAURANT_INFO.address }}, {{ RESTAURANT_INFO.city }}
              </a>
            </p>
            <p class="flex items-center gap-2.5">
              <i class="fa-regular fa-clock text-braise-500 shrink-0"></i>
              <a href="#infos" class="hover:text-charcoal-900 dark:hover:text-white transition-colors">
                Mardi - Dimanche : 12h00 - 15h00 & 18h30 - 23h30
              </a>
            </p>
            <p class="flex items-center gap-2.5">
              <i class="fa-solid fa-phone text-braise-500 shrink-0"></i>
              <a :href="'tel:' + RESTAURANT_INFO.phoneRaw" class="hover:text-charcoal-900 dark:hover:text-white transition-colors">
                {{ RESTAURANT_INFO.phoneDisplay }}
              </a>
            </p>
            <p class="flex items-center gap-2.5">
              <i class="fa-brands fa-whatsapp text-emerald-500 shrink-0 text-sm"></i>
              <a
                :href="'https://wa.me/' + RESTAURANT_INFO.whatsappNumber.replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent(RESTAURANT_INFO.whatsappDefaultMessage)"
                target="_blank"
                rel="noopener noreferrer"
                class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold transition-colors"
              >
                WhatsApp : +228 70 44 43 06
              </a>
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom Micro Bar -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
        <p>
          © {{ currentYear }} {{ RESTAURANT_INFO.name }} — Lomé, Togo. Tous droits réservés.
        </p>
        <p class="flex items-center gap-1">
          <span>Spécialiste de la braise au feu de bois à Nyékonakpoé.</span>
        </p>
      </div>
    </div>
  </footer>
</template>