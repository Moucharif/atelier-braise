<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { RESTAURANT_INFO, MENU_ITEMS, MENU_CATEGORIES, type MenuItem } from '~/data/restaurant'

const form = ref({
  name: '',
  phone: '',
  date: '',
  service: 'soir',
  time: '20:00',
  guests: '2 personnes',
  selectedDishes: [] as string[],
  notes: ''
})

const isDishModalOpen = ref(false)
const isSubmitted = ref(false)
const modalSearch = ref('')
const modalCategory = ref('all')

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'
}

const getDishByName = (dishName: string): MenuItem | undefined => {
  return MENU_ITEMS.find(d => d.name === dishName)
}

const getDishPrice = (dishName: string): number => {
  const dish = getDishByName(dishName)
  return dish ? dish.price : 0
}

const selectedDishesTotal = computed(() => {
  return form.value.selectedDishes.reduce((sum, name) => sum + getDishPrice(name), 0)
})

const toggleDishSelection = (dishName: string) => {
  const index = form.value.selectedDishes.indexOf(dishName)
  if (index > -1) {
    form.value.selectedDishes.splice(index, 1)
  } else {
    form.value.selectedDishes.push(dishName)
  }
}

const removeDish = (dishName: string) => {
  const index = form.value.selectedDishes.indexOf(dishName)
  if (index > -1) {
    form.value.selectedDishes.splice(index, 1)
  }
}

const isDishSelected = (dishName: string) => {
  return form.value.selectedDishes.includes(dishName)
}

// Filtered dishes for the selection modal
const filteredModalItems = computed(() => {
  return MENU_ITEMS.filter(dish => {
    const matchesCat = modalCategory.value === 'all' || dish.category === modalCategory.value
    const matchesQuery = dish.name.toLowerCase().includes(modalSearch.value.toLowerCase()) ||
                         dish.description.toLowerCase().includes(modalSearch.value.toLowerCase())
    return matchesCat && matchesQuery
  })
})

const getCategoryCount = (catId: string) => {
  if (catId === 'all') return MENU_ITEMS.length
  return MENU_ITEMS.filter(d => d.category === catId).length
}

const openModal = () => {
  isDishModalOpen.value = true
}

const closeModal = () => {
  isDishModalOpen.value = false
}

watch(isDishModalOpen, (val) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = val ? 'hidden' : ''
  }
})

const handleReservation = () => {
  let dishesFormatted = 'À choisir sur place'
  if (form.value.selectedDishes.length > 0) {
    const list = form.value.selectedDishes.map(d => `  • ${d} (${formatPrice(getDishPrice(d))})`).join('\n')
    dishesFormatted = `${list}\n  *Total estimé plats : ${formatPrice(selectedDishesTotal.value)}*`
  }

  const text = `*Réservation - ${RESTAURANT_INFO.name} (Lomé)* 🍽️
• Nom : ${form.value.name || 'Non précisé'}
• Téléphone : ${form.value.phone || 'Non précisé'}
• Date souhaitée : ${form.value.date || 'Aujourd\'hui'}
• Service : ${form.value.service === 'midi' ? 'Service du Midi' : 'Service du Soir'} (~${form.value.time})
• Nombre de personnes : ${form.value.guests}

*Plat(s) pré-commandé(s) à l'avance :*
${dishesFormatted}
${form.value.notes ? `\n• Remarques : ${form.value.notes}` : ''}

Merci de me confirmer la réservation et la disponibilité de la table.`

  const waUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`
  
  if (typeof window !== 'undefined') {
    window.open(waUrl, '_blank')
    isSubmitted.value = true
  }
}
</script>

<template>
  <section id="reservation" class="py-16 lg:py-24 bg-white dark:bg-charcoal-900 border-t border-charcoal-200/80 dark:border-charcoal-800 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="max-w-2xl mx-auto text-center mb-12 space-y-3">
        <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-braise-500/10 text-braise-700 dark:text-braise-300 border border-braise-500/20">
          <i class="fa-solid fa-calendar-check text-braise-500"></i>
          Réservation & Pré-commande
        </span>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900 dark:text-white font-serif">
          Réservez Votre Table en 1 Clic
        </h2>
        <p class="text-sm sm:text-base text-charcoal-600 dark:text-charcoal-300">
          Pré-commandez vos poissons braisés ou grillades à l'avance pour qu'ils soient prêts pile à votre arrivée à Lomé.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <!-- Left: Quick Direct Contact Cards -->
        <div class="lg:col-span-5 space-y-5">
          <div class="bg-[#FAFAF8] dark:bg-charcoal-850 rounded-3xl p-6 sm:p-8 border border-charcoal-200/80 dark:border-charcoal-800 space-y-5 shadow-sm">
            <h3 class="text-lg font-bold text-charcoal-900 dark:text-white font-serif">
              Réservation Sans Attente
            </h3>
            <p class="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
              Pas envie de remplir le formulaire ? Écrivez-nous directement sur WhatsApp ou composez notre numéro togolais. Nous répondons en moins de 5 minutes.
            </p>

            <div class="space-y-3 pt-2">
              <a
                :href="'https://wa.me/' + RESTAURANT_INFO.whatsappNumber.replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent('Bonjour, je souhaite réserver une table à L\'Atelier Braisé Lomé.')"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm shadow-sm transition-all transform hover:-translate-y-0.5 group"
              >
                <i class="fa-brands fa-whatsapp text-lg"></i>
                <span>WhatsApp</span>
              </a>

              <a
                :href="'tel:' + RESTAURANT_INFO.phoneRaw"
                class="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-white dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-700 text-charcoal-800 dark:text-charcoal-200 font-semibold text-sm hover:bg-charcoal-50 dark:hover:bg-charcoal-750 transition-colors"
              >
                <i class="fa-solid fa-phone text-braise-500"></i>
                <span>Appeler le restaurant</span>
              </a>
            </div>
          </div>

          <!-- Reassurance Box -->
          <div class="p-6 rounded-3xl bg-braise-500/5 dark:bg-braise-500/10 border border-braise-500/20 text-xs text-charcoal-700 dark:text-charcoal-300 space-y-2">
            <div class="flex items-center gap-2 font-bold text-braise-700 dark:text-braise-300 font-serif text-sm">
              <i class="fa-solid fa-fire-flame-curved text-braise-500"></i>
              <span>Cuisson Artisanale au Charbon de Bois</span>
            </div>
            <p class="leading-relaxed">
              La cuisson d'un poisson entier ou d'un poulet fermier prend environ 25 à 30 minutes. En choisissant vos plats à l'avance, nous lançons le feu pour que vous soyez servis dès votre installation.
            </p>
          </div>
        </div>

        <!-- Right: Intuitive Booking Form with Chic Dish Selection Trigger & Tray -->
        <div class="lg:col-span-7 bg-[#FAFAF8] dark:bg-charcoal-850 rounded-3xl p-6 sm:p-8 border border-charcoal-200/80 dark:border-charcoal-800 shadow-sm">
          <form @submit.prevent="handleReservation" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Name -->
              <div>
                <label class="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1.5">
                  Votre Nom ou Prénom *
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Ex : M. Koffi"
                  class="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-700 text-charcoal-900 dark:text-white placeholder-charcoal-400 focus:outline-none focus:border-braise-500 transition-colors"
                />
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1.5">
                  Numéro de téléphone Togo *
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  required
                  placeholder="Ex : 70 44 43 06 ou 90 00 00 00"
                  class="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-700 text-charcoal-900 dark:text-white placeholder-charcoal-400 focus:outline-none focus:border-braise-500 transition-colors"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <!-- Number of guests -->
              <div>
                <label class="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1.5">
                  Nombre de personnes
                </label>
                <select
                  v-model="form.guests"
                  class="w-full px-3 py-2.5 rounded-xl text-sm bg-white dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-700 text-charcoal-900 dark:text-white focus:outline-none focus:border-braise-500 transition-colors"
                >
                  <option value="1 personne">1 personne</option>
                  <option value="2 personnes">2 personnes</option>
                  <option value="3-4 personnes">3 à 4 personnes</option>
                  <option value="5-6 personnes">5 à 6 personnes</option>
                  <option value="Groupe 8 personnes et plus">Groupe 8 personnes et plus</option>
                </select>
              </div>

              <!-- Date -->
              <div>
                <label class="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1.5">
                  Date
                </label>
                <input
                  v-model="form.date"
                  type="date"
                  class="w-full px-3 py-2.5 rounded-xl text-sm bg-white dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-700 text-charcoal-900 dark:text-white focus:outline-none focus:border-braise-500 transition-colors"
                />
              </div>

              <!-- Service / Time -->
              <div>
                <label class="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1.5">
                  Heure souhaitée
                </label>
                <input
                  v-model="form.time"
                  type="time"
                  class="w-full px-3 py-2.5 rounded-xl text-sm bg-white dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-700 text-charcoal-900 dark:text-white focus:outline-none focus:border-braise-500 transition-colors"
                />
              </div>
            </div>

            <!-- CHIC DISH PRE-ORDER SECTION -->
            <div class="space-y-2 pt-1">
              <div class="flex items-center justify-between">
                <label class="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300">
                  Plats souhaités à l'avance <span class="font-normal text-charcoal-400">• Optionnel</span>
                </label>
                <span v-if="form.selectedDishes.length > 0" class="text-xs font-bold text-braise-600 dark:text-braise-400">
                  {{ form.selectedDishes.length }} sélectionné{{ form.selectedDishes.length > 1 ? 's' : '' }}
                </span>
              </div>

              <!-- Clean Trigger Button (Opens the Dialog Modal) -->
              <button
                type="button"
                @click="openModal"
                class="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-white dark:bg-charcoal-800 border flex items-center justify-between gap-3 transition-all shadow-xs hover:border-braise-500 group text-left"
                :class="form.selectedDishes.length > 0
                  ? 'border-braise-500/40 dark:border-braise-500/40 ring-1 ring-braise-500/20'
                  : 'border-charcoal-200 dark:border-charcoal-700'"
              >
                <!-- Placeholder state -->
                <div v-if="form.selectedDishes.length === 0" class="flex items-center gap-2.5 text-xs sm:text-sm text-charcoal-500 dark:text-charcoal-400">
                  <i class="fa-solid fa-utensils text-braise-500 text-xs"></i>
                  <span>Sélectionnez vos plats dans la carte pour lancer la cuisson...</span>
                </div>

                <!-- Active state with summary -->
                <div v-else class="flex items-center gap-2.5 min-w-0">
                  <span class="w-6 h-6 rounded-lg bg-braise-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {{ form.selectedDishes.length }}
                  </span>
                  <span class="text-xs sm:text-sm font-semibold text-charcoal-900 dark:text-white truncate">
                    {{ form.selectedDishes.length === 1 ? '1 plat sélectionné' : `${form.selectedDishes.length} plats pré-commandés` }}
                  </span>
                  <span class="text-xs font-bold text-braise-600 dark:text-braise-400 shrink-0">
                    ({{ formatPrice(selectedDishesTotal) }})
                  </span>
                </div>

                <!-- Right Action Button -->
                <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-braise-50 dark:bg-braise-950/40 group-hover:bg-braise-500 text-braise-700 dark:text-braise-300 group-hover:text-white text-xs font-semibold transition-colors shrink-0">
                  <i class="fa-solid fa-pen-to-square text-[11px]"></i>
                  <span>{{ form.selectedDishes.length > 0 ? 'Modifier' : 'Choisir' }}</span>
                </span>
              </button>

              <!-- DEDICATED PRE-ORDER SUMMARY TRAY (When dishes are selected) -->
              <div
                v-if="form.selectedDishes.length > 0"
                class="p-3 sm:p-4 rounded-2xl bg-white dark:bg-charcoal-800 border border-charcoal-200/80 dark:border-charcoal-700/80 shadow-xs space-y-2.5"
              >
                <div class="flex items-center justify-between text-xs pb-2 border-b border-charcoal-100 dark:border-charcoal-700/60">
                  <span class="font-bold text-charcoal-800 dark:text-charcoal-200 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <i class="fa-solid fa-fire text-braise-500"></i>
                    Plats à griller à votre arrivée
                  </span>
                  <button
                    type="button"
                    @click="form.selectedDishes = []"
                    class="text-[11px] text-rose-600 hover:text-rose-700 dark:text-rose-400 font-semibold flex items-center gap-1 hover:underline transition-colors"
                  >
                    <i class="fa-solid fa-trash-can text-[10px]"></i>
                    Tout effacer
                  </button>
                </div>

                <!-- Elegant list of pre-ordered items -->
                <div class="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                  <div
                    v-for="dishName in form.selectedDishes"
                    :key="dishName"
                    class="p-2 sm:px-3 sm:py-2 rounded-xl bg-charcoal-50 dark:bg-charcoal-850 border border-charcoal-100 dark:border-charcoal-750 flex items-center justify-between gap-2.5 group hover:border-braise-300 transition-colors"
                  >
                    <!-- Thumbnail if dish has image -->
                    <div class="flex items-center gap-2.5 min-w-0">
                      <img
                        v-if="getDishByName(dishName)?.image"
                        :src="getDishByName(dishName)?.image"
                        :alt="dishName"
                        class="w-9 h-9 rounded-lg object-cover shrink-0 border border-charcoal-200/60 dark:border-charcoal-700"
                      />
                      <div v-else class="w-9 h-9 rounded-lg bg-braise-500/10 text-braise-500 flex items-center justify-center shrink-0">
                        <i class="fa-solid fa-utensils text-xs"></i>
                      </div>

                      <span class="text-xs font-semibold text-charcoal-800 dark:text-charcoal-200 truncate">
                        {{ dishName }}
                      </span>
                    </div>

                    <!-- Price & Remove button -->
                    <div class="flex items-center gap-2 shrink-0">
                      <span class="text-xs font-bold text-braise-600 dark:text-braise-400">
                        {{ formatPrice(getDishPrice(dishName)) }}
                      </span>
                      <button
                        type="button"
                        @click.stop="removeDish(dishName)"
                        class="w-6 h-6 rounded-lg text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center justify-center transition-colors"
                        title="Retirer ce plat"
                      >
                        <i class="fa-solid fa-xmark text-xs"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Tray Subtotal Footer -->
                <div class="pt-2 border-t border-charcoal-100 dark:border-charcoal-700/60 flex items-center justify-between text-xs px-1">
                  <span class="text-charcoal-500 dark:text-charcoal-400">Total estimé des plats :</span>
                  <span class="font-extrabold text-charcoal-900 dark:text-white font-serif text-sm">
                    {{ formatPrice(selectedDishesTotal) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Notes -->
            <div>
              <label class="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1.5">
                Précisions ou demandes particulières
              </label>
              <textarea
                v-model="form.notes"
                rows="2"
                placeholder="Ex : Table calme en terrasse, anniversaire, niveau de piment doux..."
                class="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-700 text-charcoal-900 dark:text-white placeholder-charcoal-400 focus:outline-none focus:border-braise-500 transition-colors resize-none"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm shadow-sm transition-all transform hover:-translate-y-0.5"
            >
              <i class="fa-brands fa-whatsapp text-lg"></i>
              <span>Envoyer ma réservation sur WhatsApp</span>
            </button>

            <p class="text-[11px] text-center text-charcoal-500 dark:text-charcoal-400 pt-1">
              Votre message sera envoyé avec la liste complète des plats sélectionnés directement sur le WhatsApp du restaurant.
            </p>
          </form>
        </div>
      </div>
    </div>

    <!-- DEDICATED SELECTION MODAL DIALOG (TELEPORTED TO BODY TO NEVER OVERFLOW) -->
    <Teleport to="body">
      <div
        v-if="isDishModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm transition-opacity"
        @click.self="closeModal"
      >
        <div class="relative max-w-xl w-full bg-white dark:bg-charcoal-850 rounded-3xl border border-charcoal-200 dark:border-charcoal-700 shadow-2xl overflow-hidden flex flex-col max-h-[88vh] animate-in fade-in zoom-in-95 duration-200">
          
          <!-- Modal Header -->
          <div class="p-5 sm:p-6 border-b border-charcoal-200 dark:border-charcoal-800 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-braise-500/10 text-braise-600 dark:text-braise-400 flex items-center justify-center text-base">
                <i class="fa-solid fa-utensils"></i>
              </div>
              <div>
                <h3 class="text-base sm:text-lg font-bold text-charcoal-900 dark:text-white font-serif">
                  Pré-commander vos plats au feu de bois
                </h3>
                <span class="text-xs text-charcoal-500 dark:text-charcoal-400 block">
                  Cochez les plats à lancer avant votre arrivée à Lomé
                </span>
              </div>
            </div>

            <button
              type="button"
              @click="closeModal"
              class="w-9 h-9 rounded-xl text-charcoal-400 hover:text-charcoal-900 dark:hover:text-white hover:bg-charcoal-100 dark:hover:bg-charcoal-750 flex items-center justify-center transition-colors"
              aria-label="Fermer"
            >
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <!-- Search & Category Filters -->
          <div class="p-4 sm:px-6 bg-[#FAFAF8] dark:bg-charcoal-900 border-b border-charcoal-200/80 dark:border-charcoal-800 space-y-3">
            <div class="relative">
              <i class="fa-solid fa-magnifying-glass text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-xs"></i>
              <input
                v-model="modalSearch"
                type="text"
                placeholder="Rechercher un poisson, poulet, brochettes, alloco..."
                class="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-700 text-charcoal-900 dark:text-white placeholder-charcoal-400 focus:outline-none focus:border-braise-500 shadow-2xs"
              />
            </div>

            <!-- Category Pills with Count -->
            <div class="flex flex-wrap gap-1.5">
              <button
                v-for="cat in MENU_CATEGORIES"
                :key="cat.id"
                type="button"
                @click="modalCategory = cat.id"
                class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all inline-flex items-center"
                :class="modalCategory === cat.id
                  ? 'bg-braise-500 text-white shadow-xs'
                  : 'bg-white dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-300 border border-charcoal-200 dark:border-charcoal-700 hover:border-braise-300'"
              >
                <span>{{ cat.label }}</span>
                <span
                  class="text-[10px] ml-1.5 px-1.5 py-0.5 rounded-md font-bold"
                  :class="modalCategory === cat.id ? 'bg-white/20 text-white' : 'bg-charcoal-200/60 dark:bg-charcoal-700 text-charcoal-600 dark:text-charcoal-400'"
                >
                  {{ getCategoryCount(cat.id) }}
                </span>
              </button>
            </div>
          </div>

          <!-- Dishes Scrollable List -->
          <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2 divide-y divide-charcoal-100 dark:divide-charcoal-800">
            <div
              v-for="dish in filteredModalItems"
              :key="dish.id"
              @click="toggleDishSelection(dish.name)"
              class="pt-2 first:pt-0 p-2.5 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all hover:bg-charcoal-50 dark:hover:bg-charcoal-800/60"
              :class="isDishSelected(dish.name) ? 'bg-braise-500/10 dark:bg-braise-500/15 ring-1 ring-braise-500/30' : ''"
            >
              <div class="flex items-center gap-3 min-w-0 pr-2">
                <!-- Custom Checkbox -->
                <div
                  class="w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all"
                  :class="isDishSelected(dish.name)
                    ? 'bg-braise-500 border-braise-500 text-white shadow-xs'
                    : 'border-charcoal-300 dark:border-charcoal-600 bg-white dark:bg-charcoal-800'"
                >
                  <i v-if="isDishSelected(dish.name)" class="fa-solid fa-check text-[11px]"></i>
                </div>

                <!-- HD Dish Image Thumbnail -->
                <img
                  v-if="dish.image"
                  :src="dish.image"
                  :alt="dish.name"
                  class="w-11 h-11 rounded-xl object-cover shrink-0 border border-charcoal-200 dark:border-charcoal-700 shadow-2xs"
                  loading="lazy"
                />

                <div class="min-w-0 flex-1">
                  <h4 class="text-xs sm:text-sm font-bold text-charcoal-900 dark:text-white line-clamp-2 leading-snug">
                    {{ dish.name }}
                  </h4>
                  <span class="text-[11px] text-charcoal-500 dark:text-charcoal-400 block line-clamp-1 mt-0.5">
                    {{ dish.description }}
                  </span>
                </div>
              </div>

              <div class="text-right shrink-0">
                <span class="text-xs sm:text-sm font-black text-braise-600 dark:text-braise-400 block">
                  {{ formatPrice(dish.price) }}
                </span>
                <span v-if="dish.prepTime" class="text-[10px] text-charcoal-400">
                  ~{{ dish.prepTime }}
                </span>
              </div>
            </div>

            <!-- Empty search state -->
            <div v-if="filteredModalItems.length === 0" class="py-12 text-center text-xs text-charcoal-500 dark:text-charcoal-400 space-y-2">
              <p>Aucun plat trouvé pour « {{ modalSearch }} ».</p>
              <button
                type="button"
                @click="modalSearch = ''; modalCategory = 'all'"
                class="font-semibold text-braise-600 dark:text-braise-400 hover:underline"
              >
                Réinitialiser la recherche
              </button>
            </div>
          </div>

          <!-- Fixed Modal Footer -->
          <div class="p-4 sm:p-5 border-t border-charcoal-200 dark:border-charcoal-800 bg-[#FAFAF8] dark:bg-charcoal-900 flex items-center justify-between gap-3">
            <div class="text-xs">
              <span class="text-charcoal-500 dark:text-charcoal-400 block">Sélectionnés :</span>
              <span class="font-extrabold text-charcoal-900 dark:text-white text-sm">
                {{ form.selectedDishes.length }} {{ form.selectedDishes.length > 1 ? 'plats' : 'plat' }} • {{ formatPrice(selectedDishesTotal) }}
              </span>
            </div>

            <div class="flex items-center gap-2">
              <button
                v-if="form.selectedDishes.length > 0"
                type="button"
                @click="form.selectedDishes = []"
                class="px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              >
                Tout désélectionner
              </button>

              <button
                type="button"
                @click="closeModal"
                class="px-5 py-2.5 rounded-xl bg-braise-500 hover:bg-braise-600 text-white text-xs sm:text-sm font-bold shadow-md transition-all"
              >
                Valider mon choix
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>
