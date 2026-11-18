<script setup lang="ts">
import { REVIEWS, RESTAURANT_INFO } from '~/data/restaurant'
</script>

<template>
  <section id="avis" class="py-16 bg-[#FAFAF8] dark:bg-charcoal-950 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header with Aggregate Rating -->
      <div class="max-w-2xl mx-auto text-center mb-12 space-y-3">
        <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-braise-500/10 text-braise-700 dark:text-braise-300 border border-braise-500/20">
          <i class="fa-solid fa-star text-amber-400"></i>
          Avis Clients Vérifiés
        </span>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900 dark:text-white font-serif">
          Ce que disent nos habitués
        </h2>
        
        <!-- Google rating badge (Responsive and never breaking on mobile) -->
        <div class="pt-1 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300">
          <div class="flex items-center gap-2">
            <div class="flex items-center text-amber-400 gap-0.5">
              <i v-for="i in 5" :key="i" class="fa-solid fa-star text-sm"></i>
            </div>
            <span class="font-bold text-charcoal-900 dark:text-white whitespace-nowrap">4.9 / 5</span>
          </div>
          <span class="hidden sm:inline text-charcoal-400">•</span>
          <span class="text-[11px] sm:text-xs text-charcoal-500 dark:text-charcoal-400 whitespace-nowrap">Basé sur plus de 160 avis clients à Lomé</span>
        </div>
      </div>

      <!-- Reviews Cards Grid with rounded-3xl -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="review in REVIEWS"
          :key="review.id"
          class="bg-white dark:bg-charcoal-900 rounded-3xl p-6 sm:p-8 border border-charcoal-200/80 dark:border-charcoal-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
        >
          <div class="space-y-4">
            <!-- Stars & Date -->
            <div class="flex items-center justify-between">
              <div class="flex items-center text-amber-400 gap-1 text-sm">
                <i v-for="i in review.rating" :key="i" class="fa-solid fa-star"></i>
              </div>
              <span class="text-[11px] text-charcoal-400">
                {{ review.date }}
              </span>
            </div>

            <!-- Comment -->
            <p class="text-xs sm:text-sm text-charcoal-700 dark:text-charcoal-300 leading-relaxed italic">
              « {{ review.comment }} »
            </p>
          </div>

          <!-- Author info -->
          <div class="pt-5 mt-4 border-t border-charcoal-100 dark:border-charcoal-800 flex items-center justify-between">
            <div>
              <h4 class="text-sm font-bold text-charcoal-900 dark:text-white">
                {{ review.author }}
              </h4>
              <span v-if="review.role" class="text-[11px] text-charcoal-500 dark:text-charcoal-400">
                {{ review.role }}
              </span>
            </div>

            <span
              v-if="review.verified"
              class="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400"
            >
              <i class="fa-solid fa-circle-check text-xs"></i>
              <span>Vérifié</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Action Bar below reviews -->
      <div class="mt-10 p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-charcoal-200/80 dark:border-charcoal-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-600 dark:text-charcoal-300 text-center sm:text-left">
        <div class="flex items-center gap-2">
          <i class="fa-brands fa-google text-braise-500 text-base"></i>
          <span>Rejoignez plus de 160 clients satisfaits à Lomé. Note moyenne 4.9/5 sur notre fiche locale.</span>
        </div>
        <div class="flex items-center gap-2.5 shrink-0">
          <a
            :href="RESTAURANT_INFO.googleMapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="px-4 py-2 rounded-xl bg-charcoal-100 dark:bg-charcoal-800 hover:bg-charcoal-200 dark:hover:bg-charcoal-750 font-semibold text-charcoal-800 dark:text-charcoal-200 transition-colors inline-flex items-center gap-1.5"
          >
            <span>Voir la fiche Google</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
          <a
            href="#reservation"
            class="px-4 py-2 rounded-xl bg-braise-500 hover:bg-braise-600 font-semibold text-white transition-colors inline-flex items-center gap-1.5 shadow-sm"
          >
            <i class="fa-solid fa-calendar-check text-xs"></i>
            <span>Réserver une table</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
