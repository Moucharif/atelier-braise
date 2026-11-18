<script setup lang="ts">
import { ref } from 'vue'
import { RESTAURANT_INFO } from '~/data/restaurant'

// Liste des index des questions ouvertes (première ouverte par défaut)
const openFaqs = ref<number[]>([0])

const toggleFaq = (index: number) => {
  const pos = openFaqs.value.indexOf(index)
  if (pos > -1) {
    openFaqs.value.splice(pos, 1)
  } else {
    openFaqs.value.push(index)
  }
}

const isFaqOpen = (index: number) => {
  return openFaqs.value.includes(index)
}

const faqs = [
  {
    question: "Faut-il réserver obligatoirement avant de venir ?",
    answer: "La réservation n'est pas obligatoire mais fortement conseillée le midi entre 12h30 et 14h, ainsi que les vendredis et samedis soirs. Réserver via WhatsApp au +228 70 44 43 06 vous assure une table réservée et permet de lancer la braise de votre poisson à l'avance pour éviter toute attente.",
    icon: "fa-solid fa-utensils"
  },
  {
    question: "Combien de temps prend la cuisson d'un poisson ou poulet braisé ?",
    answer: "Toutes nos pièces sont braisées à la minute sur charbon de bois naturel. Comptez environ 15 minutes pour les brochettes tchitchinga, 20 minutes pour le poulet fermier, et 25 à 30 minutes pour un gros capitaine braisé entier. Vous pouvez présélectionner vos plats dans le formulaire pour être servi immédiatement à votre arrivée.",
    icon: "fa-regular fa-clock"
  },
  {
    question: "Avez-vous un parking sécurisé sur place à Lomé ?",
    answer: "Oui, un parking surveillé et gratuit avec vigile en terrasse est à votre disposition directement devant le restaurant à Nyékonakpoé.",
    icon: "fa-solid fa-square-parking"
  },
  {
    question: "Quels moyens de paiement acceptez-vous au Togo ?",
    answer: "Nous acceptons les règlements par T-Money, Moov Flooz ainsi que les règlements en espèces FCFA. Les réceptions mobiles sont instantanées à table.",
    icon: "fa-solid fa-mobile-screen-button"
  },
  {
    question: "Proposez-vous la vente à emporter et la livraison à Lomé ?",
    answer: "Absolument. Vous pouvez commander directement sur le site ou par WhatsApp et choisir l'option 'À emporter' ou 'Livraison'. Vos grillades sont emballées dans des barquettes thermiques garantissant une dégustation bien chaude.",
    icon: "fa-solid fa-fire-burner"
  }
]
</script>

<template>
  <section id="faq" class="py-16 bg-white dark:bg-charcoal-900 border-t border-charcoal-200/80 dark:border-charcoal-800 transition-colors">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-10 space-y-3">
        <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-braise-500/10 text-braise-700 dark:text-braise-300 border border-braise-500/20">
          <i class="fa-solid fa-circle-question text-braise-500"></i>
          Foire Aux Questions
        </span>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900 dark:text-white font-serif">
          Les Réponses à Vos Questions
        </h2>
        <p class="text-sm sm:text-base text-charcoal-600 dark:text-charcoal-300">
          Tout ce que vous devez savoir pour profiter au mieux de votre expérience à l'Atelier Braisé.
        </p>
      </div>

      <!-- FAQ Accordion with rounded-2xl -->
      <div class="space-y-3">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="rounded-2xl border overflow-hidden transition-all duration-200"
          :class="isFaqOpen(index)
            ? 'border-braise-500/40 bg-white dark:bg-charcoal-850 shadow-sm ring-1 ring-braise-500/20'
            : 'border-charcoal-200/80 dark:border-charcoal-800 bg-[#FAFAF8] dark:bg-charcoal-850/60 hover:border-braise-300'"
        >
          <button
            type="button"
            @click="toggleFaq(index)"
            :aria-expanded="isFaqOpen(index)"
            class="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base cursor-pointer select-none transition-colors"
            :class="isFaqOpen(index)
              ? 'text-braise-600 dark:text-braise-400'
              : 'text-charcoal-900 dark:text-white hover:text-braise-600 dark:hover:text-braise-400'"
          >
            <div class="flex items-center gap-3.5">
              <i
                class="text-sm shrink-0 transition-colors"
                :class="[faq.icon, isFaqOpen(index) ? 'text-braise-500' : 'text-charcoal-400']"
              ></i>
              <span class="leading-snug">{{ faq.question }}</span>
            </div>
            <i
              class="fa-solid fa-chevron-down text-xs shrink-0 transition-transform duration-300"
              :class="isFaqOpen(index) ? 'rotate-180 text-braise-500' : 'text-charcoal-400'"
            ></i>
          </button>

          <!-- Smooth toggle answer with v-show for instant mobile responsiveness -->
          <div
            v-show="isFaqOpen(index)"
            class="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed border-t border-charcoal-100 dark:border-charcoal-800/80 animate-in fade-in duration-200"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>

      <!-- Still have questions card with WhatsApp & Phone Redirections -->
      <div class="mt-8 p-6 rounded-3xl bg-[#FAFAF8] dark:bg-charcoal-850 border border-charcoal-200/80 dark:border-charcoal-800 text-center space-y-3">
        <h4 class="text-sm sm:text-base font-bold text-charcoal-900 dark:text-white font-serif">
          Vous avez une autre question spécifique ?
        </h4>
        <p class="text-xs text-charcoal-500 dark:text-charcoal-400 max-w-md mx-auto">
          Notre équipe à Lomé est disponible pour répondre à toutes vos demandes de menu personnalisé, allergies ou réservations spéciales.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-3 pt-1">
          <a
            :href="'https://wa.me/' + RESTAURANT_INFO.whatsappNumber.replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent('Bonjour, j\'ai une question concernant L\'Atelier Braisé Lomé.')"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <i class="fa-brands fa-whatsapp text-base"></i>
            <span>Poser une question sur WhatsApp</span>
          </a>
          <a
            :href="'tel:' + RESTAURANT_INFO.phoneRaw"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-700 hover:bg-charcoal-50 dark:hover:bg-charcoal-750 text-xs font-semibold text-charcoal-800 dark:text-charcoal-200 transition-colors"
          >
            <i class="fa-solid fa-phone text-braise-500"></i>
            <span>{{ RESTAURANT_INFO.phoneDisplay }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
