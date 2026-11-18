<script setup lang="ts">
import { RESTAURANT_INFO } from '~/data/restaurant'

const eventBenefits = [
  'Privatisation totale ou partielle de notre terrasse à Lomé',
  'Service traiteur braise mobile à domicile ou en entreprise',
  'Formules sur-mesure (cocktails, buffets de poissons & viandes)',
  'Maîtrise complète de la braise par nos chefs grillardins'
]
</script>

<template>
  <section id="evenements" class="py-16 bg-[#FAFAF8] dark:bg-charcoal-950 border-t border-charcoal-200/80 dark:border-charcoal-800 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-gradient-to-br from-charcoal-900 to-charcoal-950 text-white rounded-3xl p-8 sm:p-12 border border-charcoal-800 relative overflow-hidden shadow-xl isolate">
        <!-- Warm ambient accent glow strictly contained -->
        <div class="absolute right-0 bottom-0 w-60 h-60 bg-braise-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div class="lg:col-span-8 space-y-5">
            <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-braise-500/20 text-braise-300 border border-braise-500/30">
              <i class="fa-solid fa-champagne-glasses text-braise-400"></i>
              Service Traiteur & Privatisation
            </span>

            <h3 class="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif leading-tight">
              Organisez vos Anniversaires, Repas d'Affaires & Événements Privés
            </h3>

            <p class="text-xs sm:text-sm text-charcoal-300 max-w-2xl leading-relaxed">
              Que ce soit sur notre terrasse à Nyékonakpoé ou directement chez vous partout à Lomé avec nos grilloirs mobiles, nous préparons un festin de braise inoubliable pour vos invités.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-charcoal-300">
              <div
                v-for="benefit in eventBenefits"
                :key="benefit"
                class="flex items-center gap-2.5"
              >
                <i class="fa-solid fa-check text-emerald-400 shrink-0 text-xs"></i>
                <span>{{ benefit }}</span>
              </div>
            </div>
          </div>

          <div class="lg:col-span-4 flex flex-col gap-3">
            <div class="p-6 rounded-2xl bg-charcoal-850/80 border border-charcoal-700/80 space-y-3.5">
              <span class="text-xs font-semibold text-charcoal-400 uppercase tracking-wider block">
                Devis rapide & sans engagement
              </span>
              <p class="text-sm font-medium text-white">
                Indiquez-nous le nombre d'invités et la date souhaitée, nous vous répondons sous 2 heures sur WhatsApp.
              </p>
              <a
                :href="'https://wa.me/' + RESTAURANT_INFO.whatsappNumber.replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent('Bonjour, je souhaite un devis traiteur / privatisation à Lomé.')"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                <i class="fa-brands fa-whatsapp text-base"></i>
                <span>Demander un devis traiteur</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
