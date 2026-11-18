<script setup lang="ts">
import { ref } from 'vue'
import { type MenuItem } from '~/data/restaurant'
import { useCart } from '~/composables/useCart'

const props = defineProps<{
  dish: MenuItem | null
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { addItem, formatPrice } = useCart()
const addedSuccess = ref(false)

const handleAddToCart = () => {
  if (props.dish) {
    addItem(props.dish)
    addedSuccess.value = true
    setTimeout(() => {
      addedSuccess.value = false
      emit('close')
    }, 900)
  }
}
</script>

<template>
  <div v-if="isOpen && dish" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div
      @click="emit('close')"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
    ></div>

    <!-- Modal Content with rounded-3xl -->
    <div class="relative w-full max-w-lg bg-white dark:bg-charcoal-900 rounded-3xl border border-charcoal-200 dark:border-charcoal-800 shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
      <!-- Close Button with Font Awesome -->
      <button
        type="button"
        @click="emit('close')"
        class="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-colors"
      >
        <i class="fa-solid fa-xmark text-sm"></i>
      </button>

      <!-- Dish Image -->
      <div v-if="dish.image" class="relative aspect-[16/9] w-full overflow-hidden bg-charcoal-100 dark:bg-charcoal-800">
        <img
          :src="dish.image"
          :alt="dish.name"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div class="absolute bottom-3 left-4 flex gap-2">
          <span
            v-if="dish.isChefSpecial"
            class="px-3 py-1 rounded-lg text-xs font-bold bg-braise-500 text-white shadow-sm flex items-center gap-1.5"
          >
            <i class="fa-solid fa-fire text-amber-200"></i>
            Spécialité du Chef
          </span>
        </div>
      </div>

      <!-- Dish Info -->
      <div class="p-6 space-y-4">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3 class="text-xl font-bold font-serif text-charcoal-900 dark:text-white">
              {{ dish.name }}
            </h3>
            <span class="text-xs uppercase tracking-wider text-braise-600 dark:text-braise-400 font-bold block mt-1">
              Catégorie : {{ dish.category }}
            </span>
          </div>
          <span class="text-xl font-black text-braise-600 dark:text-braise-400 whitespace-nowrap">
            {{ formatPrice(dish.price) }}
          </span>
        </div>

        <p class="text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
          {{ dish.description }}
        </p>

        <!-- Preparation & Pairing Advice with Font Awesome -->
        <div class="p-4 rounded-2xl bg-charcoal-50 dark:bg-charcoal-850 border border-charcoal-200/80 dark:border-charcoal-800 space-y-2.5 text-xs">
          <div class="flex items-center gap-2.5 text-charcoal-700 dark:text-charcoal-300">
            <i class="fa-regular fa-clock text-braise-500 text-sm"></i>
            <span>Temps moyen de braise : <strong>{{ dish.prepTime || '15-20 min' }}</strong></span>
          </div>
          <div class="flex items-center gap-2.5 text-charcoal-700 dark:text-charcoal-300">
            <i class="fa-solid fa-fire text-braise-500 text-sm"></i>
            <span>Accompagnement conseillé : <strong>Alloco doré ou Frites de patate douce</strong></span>
          </div>
        </div>

        <!-- Add to cart CTA -->
        <div class="pt-2">
          <button
            type="button"
            @click="handleAddToCart"
            class="w-full flex items-center justify-center gap-2 py-4 px-5 rounded-2xl font-bold text-sm transition-all shadow-md"
            :class="addedSuccess
              ? 'bg-emerald-600 text-white'
              : 'bg-braise-500 hover:bg-braise-600 text-white'"
          >
            <i v-if="addedSuccess" class="fa-solid fa-check text-base"></i>
            <i v-else class="fa-solid fa-bag-shopping text-base"></i>
            <span>{{ addedSuccess ? 'Ajouté à votre commande !' : 'Ajouter à ma commande' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
