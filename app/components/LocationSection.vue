<script setup lang="ts">
import { RESTAURANT_INFO } from '~/data/restaurant'
</script>

<template>
  <section id="localisation" class="py-16 bg-[#FAFAF8] dark:bg-charcoal-950 transition-colors reveal-on-scroll">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center mb-10 space-y-3">
        <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-braise-500/10 text-braise-700 dark:text-braise-300 border border-braise-500/20">
          <i class="fa-solid fa-location-dot text-braise-500"></i>
          Plan d'Accès à Lomé
        </span>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900 dark:text-white font-serif">
          Venez Nous Rendre Visite à Nyékonakpoé
        </h2>
        <p class="text-sm sm:text-base text-charcoal-600 dark:text-charcoal-300">
          Situé en plein cœur de Lomé, facilement accessible par le Boulevard Circulaire.
        </p>
      </div>

      <div class="bg-white dark:bg-charcoal-900 rounded-3xl border border-charcoal-200/80 dark:border-charcoal-800 overflow-hidden shadow-sm">
        <!-- Interactive Map Embed centered in Lomé -->
        <div class="relative w-full h-80 sm:h-96 bg-charcoal-100 dark:bg-charcoal-850">
          <iframe
            :src="RESTAURANT_INFO.googleMapsEmbed"
            width="100%"
            height="100%"
            style="border:0;"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="w-full h-full filter dark:grayscale-[20%] dark:contrast-110"
            title="Localisation Google Maps L'Atelier Braisé Lomé Togo"
          ></iframe>
        </div>

        <!-- Action Bar under the map -->
        <div class="p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-charcoal-200/80 dark:border-charcoal-800">
          <div class="space-y-1 text-center md:text-left">
            <h4 class="text-base font-bold text-charcoal-900 dark:text-white font-serif">
              {{ RESTAURANT_INFO.name }} — Lomé, Togo
            </h4>
            <p class="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300">
              {{ RESTAURANT_INFO.address }}, {{ RESTAURANT_INFO.city }} • Tél : {{ RESTAURANT_INFO.phoneDisplay }}
            </p>
          </div>

          <div class="flex items-center">
            <a
              :href="RESTAURANT_INFO.googleMapsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-braise-500 hover:bg-braise-600 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors"
            >
              <i class="fa-solid fa-map-location-dot"></i>
              <span>Ouvrir dans Google Maps</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-[10px] ml-1 opacity-80"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
