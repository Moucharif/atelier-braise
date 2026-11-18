<script setup lang="ts">
const highlights = [
  {
    icon: 'fa-solid fa-fire-burner',
    title: 'Braise 100% au Bois & Charbon',
    description: 'Une cuisson lente et maîtrisée qui préserve le jus et apporte ce fumé incomparable aux poissons et viandes à Lomé.',
    linkHref: '#menu',
    linkLabel: 'Voir nos poissons braisés',
    delayClass: 'stagger-1'
  },
  {
    icon: 'fa-brands fa-whatsapp',
    title: 'Réservation Directe WhatsApp',
    description: 'Pas besoin d\'attendre au téléphone. Un message au +228 70 44 43 06 suffit pour réserver ou commander à emporter.',
    linkHref: '#reservation',
    linkLabel: 'Réserver une table',
    delayClass: 'stagger-2'
  },
  {
    icon: 'fa-solid fa-receipt',
    title: 'Carte & Prix Fixes en FCFA',
    description: 'Aucune mauvaise surprise à l\'addition. Tous nos plats, accompagnements et boissons sont affichés clairement.',
    linkHref: '#menu',
    linkLabel: 'Consulter tous les tarifs',
    delayClass: 'stagger-3'
  },
  {
    icon: 'fa-solid fa-tree',
    title: 'Cadre Aéré & Parking Gardé',
    description: 'Une terrasse verdoyante et ventilée à Nyékonakpoé avec un service soigné et un parking surveillé gratuit.',
    linkHref: '#infos',
    linkLabel: 'Voir horaires & accès',
    delayClass: 'stagger-4'
  }
]
</script>

<template>
  <section class="py-12 bg-white dark:bg-charcoal-900 border-y border-charcoal-200/80 dark:border-charcoal-800 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <a
          v-for="(item, index) in highlights"
          :key="index"
          :href="item.linkHref"
          class="p-6 rounded-3xl bg-[#FAFAF8] dark:bg-charcoal-850 border border-charcoal-200/70 dark:border-charcoal-800 flex flex-col justify-between hover:border-braise-500/40 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 reveal-scale group"
          :class="item.delayClass"
        >
          <div>
            <div class="w-12 h-12 rounded-2xl bg-braise-500/10 dark:bg-braise-500/20 text-braise-600 dark:text-braise-400 flex items-center justify-center mb-4 text-xl group-hover:scale-110 transition-transform">
              <i :class="item.icon"></i>
            </div>
            <h3 class="text-base font-bold text-charcoal-900 dark:text-white font-serif mb-2 group-hover:text-braise-600 dark:group-hover:text-braise-400 transition-colors">
              {{ item.title }}
            </h3>
            <p class="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed mb-4">
              {{ item.description }}
            </p>
          </div>

          <div class="flex items-center gap-1.5 text-xs font-semibold text-braise-600 dark:text-braise-400 pt-2 border-t border-charcoal-200/60 dark:border-charcoal-700/60">
            <span>{{ item.linkLabel }}</span>
            <i class="fa-solid fa-arrow-right text-[10px] transform group-hover:translate-x-1 transition-transform"></i>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
