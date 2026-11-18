<script setup lang="ts">
import { ref } from 'vue'
import { RESTAURANT_INFO } from '~/data/restaurant'
import { useRestaurantStatus } from '~/composables/useRestaurantStatus'

const { status } = useRestaurantStatus()
const addressCopied = ref(false)

const copyAddress = async () => {
  try {
    await navigator.clipboard.writeText(RESTAURANT_INFO.address + ', ' + RESTAURANT_INFO.city)
    addressCopied.value = true
    setTimeout(() => {
      addressCopied.value = false
    }, 2500)
  } catch (err) {
    console.error(err)
  }
}

const currentDayName = () => {
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  return days[new Date().getDay()]
}
</script>

<template>
  <section id="infos" class="py-16 bg-white dark:bg-charcoal-900 border-t border-charcoal-200/80 dark:border-charcoal-800 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="max-w-2xl mx-auto text-center mb-12 space-y-3">
        <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-braise-500/10 text-braise-700 dark:text-braise-300 border border-braise-500/20">
          <i class="fa-regular fa-clock text-braise-500"></i>
          Infos Pratiques
        </span>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900 dark:text-white font-serif">
          Horaires, Accès & Paiements
        </h2>
        <p class="text-sm sm:text-base text-charcoal-600 dark:text-charcoal-300">
          Toutes les informations essentielles regroupées pour organiser votre venue sans hésitation.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Left: Opening Hours Table with rounded-3xl -->
        <div class="lg:col-span-6 bg-[#FAFAF8] dark:bg-charcoal-850 rounded-3xl p-6 sm:p-8 border border-charcoal-200/80 dark:border-charcoal-800 space-y-5 shadow-sm reveal-left">
          <div class="flex items-center justify-between pb-3 border-b border-charcoal-200/80 dark:border-charcoal-800">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-braise-500/10 text-braise-600 dark:text-braise-400 flex items-center justify-center">
                <i class="fa-regular fa-clock text-base"></i>
              </div>
              <h3 class="text-lg font-bold text-charcoal-900 dark:text-white font-serif">
                Horaires d'Ouverture
              </h3>
            </div>
            <!-- Live badge -->
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border" :class="status.badgeColor">
              <span class="w-1.5 h-1.5 rounded-full" :class="status.isOpen ? 'bg-emerald-500' : 'bg-amber-500'"></span>
              {{ status.label }}
            </span>
          </div>

          <div class="divide-y divide-charcoal-200/60 dark:divide-charcoal-800/80 text-xs sm:text-sm">
            <div
              v-for="item in RESTAURANT_INFO.hours"
              :key="item.day"
              class="py-2.5 flex items-center justify-between transition-colors"
              :class="currentDayName() === item.day ? 'font-bold text-braise-600 dark:text-braise-400 bg-braise-500/5 -mx-2 px-3 rounded-xl' : 'text-charcoal-700 dark:text-charcoal-300'"
            >
              <div class="flex items-center gap-2">
                <span>{{ item.day }}</span>
                <span
                  v-if="currentDayName() === item.day"
                  class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-braise-500 text-white"
                >
                  Aujourd'hui
                </span>
              </div>
              <span class="text-right" :class="!item.isOpen ? 'text-charcoal-400 dark:text-charcoal-500' : ''">
                {{ item.hours }}
              </span>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
            <i class="fa-solid fa-triangle-exclamation text-amber-600 mt-0.5 shrink-0"></i>
            <span>Pour les arrivées tardives après 22h00, nous conseillons d'envoyer un rapide message WhatsApp pour réserver votre part de braise.</span>
          </div>
        </div>

        <!-- Right: Address, Payment & Fast Contact -->
        <div class="lg:col-span-6 space-y-6 reveal-right">
          <!-- Address Card with Copy Action -->
          <div class="bg-[#FAFAF8] dark:bg-charcoal-850 rounded-3xl p-6 sm:p-8 border border-charcoal-200/80 dark:border-charcoal-800 space-y-4 shadow-sm">
            <div class="flex items-center gap-3 pb-2 border-b border-charcoal-200/80 dark:border-charcoal-800">
              <div class="w-10 h-10 rounded-2xl bg-braise-500/10 text-braise-600 dark:text-braise-400 flex items-center justify-center">
                <i class="fa-solid fa-location-dot text-base"></i>
              </div>
              <h3 class="text-lg font-bold text-charcoal-900 dark:text-white font-serif">
                Adresse & Repères à Lomé
              </h3>
            </div>

            <div class="space-y-1">
              <p class="text-base font-bold text-charcoal-900 dark:text-white">
                {{ RESTAURANT_INFO.address }}
              </p>
              <p class="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                {{ RESTAURANT_INFO.landmark }}
              </p>
            </div>

            <!-- Copy Address & Navigation buttons -->
            <div class="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                type="button"
                @click="copyAddress"
                class="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-700 text-xs font-semibold text-charcoal-700 dark:text-charcoal-200 hover:bg-charcoal-50 dark:hover:bg-charcoal-750 transition-colors"
              >
                <i v-if="addressCopied" class="fa-solid fa-check text-emerald-600"></i>
                <i v-else class="fa-regular fa-copy text-charcoal-500"></i>
                <span>{{ addressCopied ? 'Adresse copiée !' : 'Copier l\'adresse' }}</span>
              </button>

              <a
                :href="RESTAURANT_INFO.googleMapsUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-braise-500 hover:bg-braise-600 text-white text-xs font-semibold transition-colors shadow-sm"
              >
                <i class="fa-solid fa-map-location-dot"></i>
                <span>Itinéraire Google Maps</span>
              </a>
            </div>

            <!-- Parking badge -->
            <div class="pt-2 flex items-center gap-2 text-xs text-charcoal-600 dark:text-charcoal-300">
              <i class="fa-solid fa-square-parking text-emerald-600 dark:text-emerald-400 text-sm"></i>
              <span>Parking surveillé gratuit avec vigile en terrasse à Nyékonakpoé.</span>
            </div>
          </div>

          <!-- Direct Contact & Payments -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Phone Call Card -->
            <a
              :href="'tel:' + RESTAURANT_INFO.phoneRaw"
              class="p-6 rounded-2xl bg-white dark:bg-charcoal-850 border border-charcoal-200/80 dark:border-charcoal-800 hover:border-braise-500/40 transition-all block group shadow-sm"
            >
              <div class="flex items-center gap-2 text-xs text-charcoal-500 dark:text-charcoal-400 mb-1">
                <i class="fa-solid fa-phone text-braise-500"></i>
                <span>Appel téléphonique direct</span>
              </div>
              <p class="text-base font-bold text-charcoal-900 dark:text-white group-hover:text-braise-600 dark:group-hover:text-braise-400 transition-colors">
                {{ RESTAURANT_INFO.phoneDisplay }}
              </p>
              <span class="text-[11px] text-charcoal-400 block mt-1">
                Ligne directe du restaurant à Lomé
              </span>
            </a>

            <!-- WhatsApp Direct Card with Togo Number -->
            <a
              :href="'https://wa.me/' + RESTAURANT_INFO.whatsappNumber.replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent(RESTAURANT_INFO.whatsappDefaultMessage)"
              target="_blank"
              rel="noopener noreferrer"
              class="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 hover:border-emerald-500 transition-all block group shadow-sm"
            >
              <div class="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 mb-1">
                <i class="fa-brands fa-whatsapp text-emerald-600 dark:text-emerald-400 text-sm"></i>
                <span>WhatsApp Togo</span>
              </div>
              <p class="text-base font-bold text-emerald-900 dark:text-emerald-200">
                +228 70 44 43 06
              </p>
              <span class="text-[11px] text-emerald-700 dark:text-emerald-400 block mt-1">
                Réponse en &lt; 5 min
              </span>
            </a>
          </div>

          <!-- Accepted Payment Methods in Togo (T-Money, Flooz, Cash) -->
          <div class="p-5 rounded-2xl bg-white dark:bg-charcoal-850 border border-charcoal-200/80 dark:border-charcoal-800 flex items-center justify-between flex-wrap gap-2 text-xs shadow-sm">
            <div class="flex items-center gap-2 text-charcoal-600 dark:text-charcoal-300">
              <i class="fa-solid fa-credit-card text-braise-500"></i>
              <span class="font-bold text-charcoal-900 dark:text-white">Paiements acceptés :</span>
            </div>
            <div class="flex items-center gap-2 font-semibold text-charcoal-700 dark:text-charcoal-300">
              <span class="px-2.5 py-1 rounded-lg bg-charcoal-100 dark:bg-charcoal-800 flex items-center gap-1.5">
                <i class="fa-solid fa-mobile-screen-button text-emerald-500 text-xs"></i>
                T-Money (Togocom)
              </span>
              <span class="px-2.5 py-1 rounded-lg bg-charcoal-100 dark:bg-charcoal-800 flex items-center gap-1.5">
                <i class="fa-solid fa-money-bill-transfer text-blue-500 text-xs"></i>
                Moov Money (Flooz)
              </span>
              <span class="px-2.5 py-1 rounded-lg bg-charcoal-100 dark:bg-charcoal-800 flex items-center gap-1.5">
                <i class="fa-solid fa-coins text-amber-500 text-xs"></i>
                Espèces (FCFA)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
