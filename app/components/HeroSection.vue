<script setup lang="ts">
import { RESTAURANT_INFO } from '~/data/restaurant'
import { useRestaurantStatus } from '~/composables/useRestaurantStatus'

const { status } = useRestaurantStatus()

const quickBenefits = [
  'Braise 100% au feu de bois',
  'Pêche fraîche du jour à Lomé',
  'Sans attente via WhatsApp',
  'Cadre aéré & terrasse Nyékonakpoé'
]
</script>

<template>
  <section id="accueil" class="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 isolate">
    <!-- Subtle warm glow background strictly contained -->
    <div class="absolute top-0 right-0 -z-10 w-64 h-64 sm:w-96 sm:h-96 bg-braise-500/5 rounded-full blur-2xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <!-- Left Column: Clear Pitch & Direct CTAs -->
        <div class="lg:col-span-7 space-y-6">
          <!-- Main Clear Title (Point démo 1: Compréhension immédiate) -->
          <div class="space-y-3">
            <h1 class="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal-900 dark:text-white font-serif leading-[1.2] sm:leading-[1.15]">
              L'Art de la Braise au Feu de Bois & des Saveurs Authentiques à Lomé.
            </h1>
            <p class="text-sm sm:text-base lg:text-lg text-charcoal-600 dark:text-charcoal-300 max-w-2xl leading-relaxed">
              Capitaines et carpes entières braisés à la minute, poulets fermiers marinés aux épices du terroir, accompagnés d'alloco doré et de frites fraîches de patate douce.
            </p>
          </div>

          <!-- Reassuring quick features with Font Awesome check -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 text-xs sm:text-sm text-charcoal-700 dark:text-charcoal-300">
            <div
              v-for="benefit in quickBenefits"
              :key="benefit"
              class="flex items-center gap-2.5"
            >
              <i class="fa-solid fa-circle-check text-emerald-600 dark:text-emerald-400 shrink-0"></i>
              <span>{{ benefit }}</span>
            </div>
          </div>

          <!-- Direct Action Buttons (Point démo 2: Bouton WhatsApp direct sans appel) -->
          <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <!-- Primary WhatsApp CTA with Togo Number -->
            <a
              :href="'https://wa.me/' + RESTAURANT_INFO.whatsappNumber.replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent('Bonjour L\'Atelier Braisé Lomé, je souhaite réserver une table ou commander.')"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2.5 py-3.5 px-5 sm:py-4 sm:px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm sm:text-base shadow-sm transition-all transform hover:-translate-y-0.5 group text-center"
            >
              <i class="fa-brands fa-whatsapp text-xl"></i>
              <span>Commander / Réserver sur WhatsApp</span>
            </a>

            <!-- Secondary Menu Button -->
            <a
              href="#menu"
              class="inline-flex items-center justify-center gap-2.5 px-5 py-4 rounded-2xl bg-charcoal-100 dark:bg-charcoal-800 hover:bg-charcoal-200 dark:hover:bg-charcoal-700 text-charcoal-900 dark:text-white font-semibold text-base transition-colors"
            >
              <i class="fa-solid fa-utensils text-braise-500"></i>
              <span>Voir la Carte & Prix en FCFA</span>
            </a>
          </div>

          <!-- Practical Micro Bar below CTA -->
          <div class="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-charcoal-500 dark:text-charcoal-400">
            <span class="inline-flex items-center gap-1.5">
              <i class="fa-solid fa-location-dot text-braise-500"></i>
              {{ RESTAURANT_INFO.address }}
            </span>
            <span class="inline-flex items-center gap-1.5">
              <i class="fa-regular fa-clock text-braise-500"></i>
              Mardi - Dimanche : 12h00 - 15h00 & 18h30 - 23h30
            </span>
          </div>
        </div>

        <!-- Right Column: Hero Image Card with rounded-3xl curve -->
        <div class="lg:col-span-5">
          <div class="relative mx-auto max-w-md lg:max-w-none">
            <!-- Main Photo Container -->
            <div class="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[5/4] border border-charcoal-200/80 dark:border-charcoal-800 bg-charcoal-100 dark:bg-charcoal-900">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=720&q=75"
                alt="Grillades au feu de bois - L'Atelier Braisé Lomé Togo"
                class="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              <!-- Floating badge on photo: Signature Dish -->
              <a
                href="#menu"
                class="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-md rounded-2xl p-4 border border-white/20 dark:border-charcoal-700 shadow-xl flex items-center justify-between hover:border-braise-500 transition-colors group/card"
                title="Voir ce plat sur la carte"
              >
                <div>
                  <span class="text-[11px] font-bold uppercase text-braise-600 dark:text-braise-400 tracking-wider block">
                    Spécialité du Chef
                  </span>
                  <span class="text-sm font-bold text-charcoal-900 dark:text-white block font-serif group-hover/card:text-braise-600 transition-colors">
                    Capitaine Braisé & Alloco Doré
                  </span>
                </div>
                <div class="text-right">
                  <span class="text-xs text-charcoal-500 dark:text-charcoal-400 block line-through">11 000 F</span>
                  <span class="text-base font-extrabold text-braise-600 dark:text-braise-400">9 500 FCFA</span>
                </div>
              </a>
            </div>

            <!-- Discrete decorative tag with Font Awesome star -->
            <div class="absolute -top-3 -right-3 hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-charcoal-900 text-white text-xs font-bold shadow-md border border-charcoal-700">
              <i class="fa-solid fa-fire-flame-curved text-amber-400"></i>
              <span>Cuisson Minute Lomé</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
