<script setup lang="ts">
import { RESTAURANT_INFO } from '~/data/restaurant'
import { useCart } from '~/composables/useCart'

const { isCartOpen, totalCount, totalPrice, formatPrice } = useCart()
const isMobileMenuOpen = useState('isMobileMenuOpen', () => false)
</script>

<template>
  <div v-show="!isCartOpen && !isMobileMenuOpen" class="fixed bottom-0 inset-x-0 z-40 md:hidden flex flex-col transition-all duration-200">
    <!-- Active Cart Mini Banner (Appears if dishes are selected) -->
    <div
      v-if="totalCount > 0"
      @click="isCartOpen = true"
      class="bg-braise-500 hover:bg-braise-600 active:bg-braise-700 text-white px-4 py-2.5 flex items-center justify-between shadow-lg cursor-pointer transition-colors"
    >
      <div class="flex items-center gap-2">
        <i class="fa-solid fa-bag-shopping text-sm"></i>
        <span class="text-xs font-semibold">
          {{ totalCount }} {{ totalCount > 1 ? 'plats' : 'plat' }} • {{ formatPrice(totalPrice) }}
        </span>
      </div>
      <span class="text-xs font-bold underline flex items-center gap-1.5">
        <span>Voir ma commande</span>
        <i class="fa-solid fa-arrow-right text-[10px]"></i>
      </span>
    </div>

    <!-- Main 4-action Sticky Bar with Font Awesome Icons & rounded items -->
    <div class="bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-md border-t border-charcoal-200/80 dark:border-charcoal-800 px-3 py-2 shadow-2xl safe-area-pb">
      <div class="grid grid-cols-4 gap-1.5 items-center text-center">
        <!-- 1. Call -->
        <a
          :href="'tel:' + RESTAURANT_INFO.phoneRaw"
          class="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-charcoal-700 dark:text-charcoal-300 hover:bg-charcoal-100 dark:hover:bg-charcoal-800 transition-colors"
        >
          <i class="fa-solid fa-phone text-braise-500 text-base mb-1"></i>
          <span class="text-[10px] font-semibold leading-none">Appeler</span>
        </a>

        <!-- 2. Menu -->
        <a
          href="#menu"
          class="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-charcoal-700 dark:text-charcoal-300 hover:bg-charcoal-100 dark:hover:bg-charcoal-800 transition-colors"
        >
          <i class="fa-solid fa-utensils text-braise-500 text-base mb-1"></i>
          <span class="text-[10px] font-semibold leading-none">La Carte</span>
        </a>

        <!-- 3. Localisation -->
        <a
          href="#localisation"
          class="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-charcoal-700 dark:text-charcoal-300 hover:bg-charcoal-100 dark:hover:bg-charcoal-800 transition-colors"
        >
          <i class="fa-solid fa-location-dot text-braise-500 text-base mb-1"></i>
          <span class="text-[10px] font-semibold leading-none">Lomé</span>
        </a>

        <!-- 4. WhatsApp (Prominent) -->
        <a
          :href="'https://wa.me/' + RESTAURANT_INFO.whatsappNumber.replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent(RESTAURANT_INFO.whatsappDefaultMessage)"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white shadow-sm transition-colors"
        >
          <i class="fa-brands fa-whatsapp text-lg mb-0.5"></i>
          <span class="text-[10px] font-bold leading-none">WhatsApp</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.safe-area-pb {
  padding-bottom: max(0.5rem, env(safe-area-inset-bottom));
}
</style>
