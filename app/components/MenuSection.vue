<script setup lang="ts">
import { storeToRefs } from 'pinia'
import {
  RESTAURANT_INFO,
  type MenuItem
} from '~/data/restaurant'
import { useMenuStore } from '~/stores/menu'
import { useCartStore } from '~/stores/cart'

const menuStore = useMenuStore()
const cartStore = useCartStore()

const {
  activeCategory,
  searchQuery,
  selectedDishForModal,
  isModalOpen,
  categories,
  filteredAndSortedItems
} = storeToRefs(menuStore)

const { openDishModal, closeDishModal } = menuStore
const { addItem, formatPrice } = cartStore

const getWhatsAppOrderUrl = (item: MenuItem) => {
  const text = `Bonjour L'Atelier Braisé Lomé, je souhaite commander : 1x ${item.name} (${formatPrice(item.price)}).`
  return `https://wa.me/${RESTAURANT_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`
}
</script>

<template>
  <section id="menu" class="py-16 lg:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="max-w-2xl mx-auto text-center mb-10 space-y-3">
        <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-braise-500/10 text-braise-700 dark:text-braise-300 border border-braise-500/20">
          <i class="fa-solid fa-utensils text-braise-500"></i>
          Carte & Tarifs en FCFA
        </span>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900 dark:text-white font-serif">
          Notre Carte & Grillades du Jour
        </h2>
        <p class="text-sm sm:text-base text-charcoal-600 dark:text-charcoal-300">
          Toutes nos pièces sont braisées à la minute sur charbon de bois naturel avec nos marinades du terroir togolais.
        </p>
      </div>

      <!-- Categories & Search Bar with Soft Rounded Radius -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        <!-- Category Filters -->
        <div class="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            @click="activeCategory = cat.id"
            class="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200"
            :class="activeCategory === cat.id
              ? 'bg-braise-500 text-white shadow-sm transform scale-105'
              : 'bg-white dark:bg-charcoal-850 text-charcoal-700 dark:text-charcoal-300 border border-charcoal-200 dark:border-charcoal-800 hover:border-braise-400'"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- Search Input with Font Awesome Search Icon -->
        <div class="relative w-full md:w-72">
          <i class="fa-solid fa-magnifying-glass text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-sm pointer-events-none"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher un plat, poisson..."
            class="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-white dark:bg-charcoal-850 border border-charcoal-200 dark:border-charcoal-800 text-charcoal-900 dark:text-white placeholder-charcoal-400 focus:outline-none focus:border-braise-500 transition-colors shadow-sm"
          />
        </div>
      </div>

      <!-- Dishes Grid: All items with images displayed first -->
      <div v-if="filteredAndSortedItems.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <div
          v-for="item in filteredAndSortedItems"
          :key="item.id"
          class="bg-white dark:bg-charcoal-850 rounded-3xl border border-charcoal-200/80 dark:border-charcoal-800 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
        >
          <div>
            <!-- Image with Soft Curve and Modal Trigger -->
            <div
              v-if="item.image"
              @click="openDishModal(item)"
              class="relative aspect-[16/10] overflow-hidden bg-charcoal-100 dark:bg-charcoal-800 cursor-pointer"
            >
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              <!-- Badges with Font Awesome Icons -->
              <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span
                  v-if="item.isChefSpecial"
                  class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-braise-500 text-white shadow-sm flex items-center gap-1.5"
                >
                  <i class="fa-solid fa-fire text-amber-200 text-xs"></i>
                  Spécialité Braise
                </span>
                <span
                  v-if="item.isPopular"
                  class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-charcoal-900/90 text-amber-300 backdrop-blur-sm border border-charcoal-700"
                >
                  Très demandé
                </span>
              </div>

              <!-- Eye pill -->
              <span class="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-[11px] font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                <i class="fa-solid fa-eye text-xs"></i>
                Voir détails
              </span>
            </div>

            <!-- Content -->
            <div class="p-6 space-y-3">
              <div class="flex items-start justify-between gap-3">
                <h3
                  @click="openDishModal(item)"
                  class="text-base sm:text-lg font-bold text-charcoal-900 dark:text-white font-serif leading-snug cursor-pointer hover:text-braise-600 dark:hover:text-braise-400 transition-colors"
                >
                  {{ item.name }}
                </h3>
                <span class="text-base font-extrabold text-braise-600 dark:text-braise-400 whitespace-nowrap">
                  {{ formatPrice(item.price) }}
                </span>
              </div>

              <p class="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                {{ item.description }}
              </p>

              <div v-if="item.prepTime" class="pt-1 flex items-center gap-1.5 text-xs text-charcoal-500 dark:text-charcoal-400">
                <i class="fa-regular fa-clock text-braise-500 text-xs"></i>
                <span>Temps de braise : ~{{ item.prepTime }}</span>
              </div>
            </div>
          </div>

          <!-- Bottom Actions: Add to Order + WhatsApp Direct with Font Awesome Icons -->
          <div class="px-6 pb-6 pt-3 border-t border-charcoal-100 dark:border-charcoal-800/60 mt-auto grid grid-cols-2 gap-2.5">
            <!-- Add to Order Button -->
            <button
              type="button"
              @click="addItem(item)"
              class="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-braise-50 hover:bg-braise-100 dark:bg-braise-950/40 dark:hover:bg-braise-950/70 border border-braise-200 dark:border-braise-800/80 text-braise-700 dark:text-braise-300 text-xs font-semibold transition-colors"
            >
              <i class="fa-solid fa-plus text-xs"></i>
              <span>+ Ajouter</span>
            </button>

            <!-- Direct WhatsApp single-dish order -->
            <a
              :href="getWhatsAppOrderUrl(item)"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold transition-colors"
              title="Commander ce plat sur WhatsApp"
            >
              <i class="fa-brands fa-whatsapp text-emerald-600 dark:text-emerald-400 text-sm"></i>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-12 bg-white dark:bg-charcoal-850 rounded-3xl border border-charcoal-200 dark:border-charcoal-800">
        <p class="text-charcoal-600 dark:text-charcoal-400 text-sm">
          Aucun plat ne correspond à « {{ searchQuery }} ».
        </p>
        <button
          type="button"
          @click="menuStore.resetFilters()"
          class="mt-3 text-xs font-semibold text-braise-600 dark:text-braise-400 hover:underline"
        >
          Réinitialiser la recherche
        </button>
      </div>

      <!-- Notice for Lomé Clients -->
      <div class="mt-8 p-5 rounded-2xl bg-charcoal-100 dark:bg-charcoal-850 border border-charcoal-200 dark:border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-charcoal-600 dark:text-charcoal-300">
        <span class="text-center sm:text-left">
          <strong>Service rapide à Lomé :</strong> Tous nos plats sont préparés à la minute. Vous pouvez régler sur place ou à la commande par <strong>T-Money</strong>, <strong>Moov Money (Flooz)</strong> ou <strong>Espèces</strong>.
        </span>
        <a
          :href="'https://wa.me/' + RESTAURANT_INFO.whatsappNumber.replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent('Bonjour, je souhaite commander un menu complet pour un groupe.')"
          target="_blank"
          rel="noopener noreferrer"
          class="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
        >
          Menu de groupe &rarr;
        </a>
      </div>
    </div>

    <!-- Dish Detail Modal -->
    <DishDetailModal
      :dish="selectedDishForModal"
      :is-open="isModalOpen"
      @close="closeDishModal"
    />
  </section>
</template>
