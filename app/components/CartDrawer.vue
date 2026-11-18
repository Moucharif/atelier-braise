<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCart } from '~/composables/useCart'
import { RESTAURANT_INFO } from '~/data/restaurant'

const {
  cart,
  isCartOpen,
  orderType,
  customerName,
  customerPhone,
  customerNotes,
  selectedZoneId,
  deliveryAddress,
  paymentMethod,
  currentZone,
  deliveryFee,
  itemsTotal,
  removeItem,
  updateQuantity,
  clearCart,
  totalCount,
  totalPrice,
  formatPrice,
  getWhatsAppOrderLink,
  LOME_DELIVERY_ZONES
} = useCart()

const showValidationWarning = ref(false)

const goToMenu = () => {
  isCartOpen.value = false
  if (typeof window !== 'undefined') {
    const el = document.getElementById('menu')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.hash = '#menu'
    }
  }
}

const finalizeOrder = () => {
  if (orderType.value === 'livraison' && !deliveryAddress.value.trim()) {
    showValidationWarning.value = true
    return
  }
  showValidationWarning.value = false

  const url = getWhatsAppOrderLink()
  if (url && typeof window !== 'undefined') {
    window.open(url, '_blank')
    isCartOpen.value = false
  }
}

watch(isCartOpen, (val) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = val ? 'hidden' : ''
  }
})
</script>

<template>
  <Teleport to="body">
    <!-- Floating Cart Trigger Button (Visible only on desktop/tablet, MobileStickyBar handles mobile) -->
    <div
      v-if="totalCount > 0 && !isCartOpen"
      class="hidden md:block fixed bottom-6 right-6 z-40"
    >
      <button
        type="button"
        @click="isCartOpen = true"
        class="flex items-center gap-3 px-4 py-3 rounded-2xl bg-charcoal-900 dark:bg-charcoal-800 text-white shadow-2xl border border-charcoal-700 hover:border-braise-500 transition-all transform hover:scale-105 group"
      >
        <div class="relative">
          <div class="w-10 h-10 rounded-xl bg-braise-500 flex items-center justify-center text-white">
            <i class="fa-solid fa-bag-shopping text-base"></i>
          </div>
          <span class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-[11px] font-bold text-white flex items-center justify-center border-2 border-charcoal-900">
            {{ totalCount }}
          </span>
        </div>

        <div class="text-left pr-2">
          <span class="text-[11px] text-charcoal-400 block font-semibold uppercase tracking-wider">
            Votre Commande
          </span>
          <span class="text-sm font-extrabold text-amber-300">
            {{ formatPrice(totalPrice) }}
          </span>
        </div>

        <div class="w-8 h-8 rounded-xl bg-charcoal-800 group-hover:bg-braise-500 flex items-center justify-center text-charcoal-300 group-hover:text-white transition-colors">
          <i class="fa-solid fa-arrow-right text-xs"></i>
        </div>
      </button>
    </div>

    <!-- Slide-over Backdrop & Drawer (Full width on mobile, sleek drawer on desktop) -->
    <div v-if="isCartOpen" class="fixed inset-0 z-[9990] overflow-hidden">
      <!-- Backdrop -->
      <div
        @click="isCartOpen = false"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      ></div>

      <!-- Drawer Panel -->
      <div class="fixed inset-y-0 right-0 max-w-full flex w-full sm:w-auto">
        <div class="w-full sm:w-[440px] max-w-full h-full bg-white dark:bg-charcoal-900 sm:border-l border-charcoal-200 dark:border-charcoal-800 shadow-2xl flex flex-col justify-between relative">
          
          <!-- Header -->
          <div class="p-4 sm:p-5 border-b border-charcoal-200 dark:border-charcoal-800 flex items-center justify-between shrink-0 bg-white dark:bg-charcoal-900">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-braise-500/10 text-braise-600 dark:text-braise-400 flex items-center justify-center">
                <i class="fa-solid fa-bag-shopping text-base"></i>
              </div>
              <div>
                <h3 class="text-base font-bold text-charcoal-900 dark:text-white font-serif">
                  Votre Commande
                </h3>
                <span class="text-xs text-charcoal-500 dark:text-charcoal-400">
                  {{ totalCount }} {{ totalCount > 1 ? 'plats sélectionnés' : 'plat sélectionné' }}
                </span>
              </div>
            </div>

            <div class="flex items-center gap-1">
              <button
                v-if="cart.length > 0"
                type="button"
                @click="clearCart"
                class="p-2 text-charcoal-400 hover:text-rose-600 transition-colors"
                title="Vider la commande"
              >
                <i class="fa-solid fa-trash-can text-sm"></i>
              </button>
              <button
                type="button"
                @click="isCartOpen = false"
                class="p-2 text-charcoal-400 hover:text-charcoal-900 dark:hover:text-white transition-colors"
              >
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>
          </div>

        <!-- Body: Cart Items & Form -->
        <div class="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          <!-- Empty State -->
          <div v-if="cart.length === 0" class="text-center py-16 space-y-3">
            <div class="w-16 h-16 mx-auto rounded-3xl bg-charcoal-100 dark:bg-charcoal-800 flex items-center justify-center text-charcoal-400 text-2xl">
              <i class="fa-solid fa-bag-shopping"></i>
            </div>
            <h4 class="text-base font-bold text-charcoal-800 dark:text-white font-serif">
              Votre panier est vide
            </h4>
            <p class="text-xs text-charcoal-500 dark:text-charcoal-400 max-w-xs mx-auto">
              Ajoutez vos poissons braisés, poulets, accompagnements et boissons depuis la carte.
            </p>
            <button
              type="button"
              @click="goToMenu"
              class="mt-2 px-5 py-2.5 rounded-xl bg-braise-500 text-white text-xs font-semibold hover:bg-braise-600 transition-colors inline-flex items-center gap-2"
            >
              <i class="fa-solid fa-utensils text-xs"></i>
              <span>Parcourir la Carte</span>
            </button>
          </div>

          <!-- Items List -->
          <div v-else class="space-y-4">
            <div class="space-y-2.5">
              <div
                v-for="item in cart"
                :key="item.dish.id"
                class="p-3.5 rounded-2xl bg-[#FAFAF8] dark:bg-charcoal-850 border border-charcoal-200/80 dark:border-charcoal-800 flex items-center justify-between gap-3"
              >
                <!-- Image thumbnail if available -->
                <img
                  v-if="item.dish.image"
                  :src="item.dish.image"
                  :alt="item.dish.name"
                  class="w-12 h-12 rounded-xl object-cover shrink-0 border border-charcoal-200 dark:border-charcoal-700"
                />

                <div class="min-w-0 flex-1">
                  <h5 class="text-xs sm:text-sm font-bold text-charcoal-900 dark:text-white line-clamp-2 leading-snug">
                    {{ item.dish.name }}
                  </h5>
                  <span class="text-xs font-semibold text-braise-600 dark:text-braise-400 block mt-0.5">
                    {{ formatPrice(item.dish.price * item.quantity) }}
                    <span v-if="item.quantity > 1" class="text-[10px] text-charcoal-400 font-normal">
                      • {{ formatPrice(item.dish.price) }} / unité
                    </span>
                  </span>
                </div>

                <!-- Quantity Controls -->
                <div class="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    @click="updateQuantity(item.dish.id, item.quantity - 1)"
                    class="w-7 h-7 rounded-lg bg-white dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-700 text-charcoal-700 dark:text-charcoal-200 flex items-center justify-center hover:bg-charcoal-100 dark:hover:bg-charcoal-750 text-xs transition-colors"
                  >
                    <i class="fa-solid fa-minus text-[10px]"></i>
                  </button>
                  <span class="text-xs font-bold text-charcoal-900 dark:text-white w-5 text-center">
                    {{ item.quantity }}
                  </span>
                  <button
                    type="button"
                    @click="updateQuantity(item.dish.id, item.quantity + 1)"
                    class="w-7 h-7 rounded-lg bg-white dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-700 text-charcoal-700 dark:text-charcoal-200 flex items-center justify-center hover:bg-charcoal-100 dark:hover:bg-charcoal-750 text-xs transition-colors"
                  >
                    <i class="fa-solid fa-plus text-[10px]"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Formule Selection: Sur place / A emporter / Livraison -->
            <div class="pt-3 space-y-3.5 border-t border-charcoal-200/80 dark:border-charcoal-800">
              <label class="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300">
                Mode de commande
              </label>
              <div class="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  @click="orderType = 'sur-place'"
                  class="py-2.5 px-1 text-center rounded-xl text-xs font-semibold border flex flex-col items-center gap-1 transition-all"
                  :class="orderType === 'sur-place'
                    ? 'bg-braise-500 text-white border-braise-500 shadow-sm'
                    : 'bg-white dark:bg-charcoal-850 text-charcoal-700 dark:text-charcoal-300 border-charcoal-200 dark:border-charcoal-700 hover:border-braise-300'"
                >
                  <i class="fa-solid fa-chair text-xs"></i>
                  <span>Sur place</span>
                </button>
                <button
                  type="button"
                  @click="orderType = 'emporter'"
                  class="py-2.5 px-1 text-center rounded-xl text-xs font-semibold border flex flex-col items-center gap-1 transition-all"
                  :class="orderType === 'emporter'
                    ? 'bg-braise-500 text-white border-braise-500 shadow-sm'
                    : 'bg-white dark:bg-charcoal-850 text-charcoal-700 dark:text-charcoal-300 border-charcoal-200 dark:border-charcoal-700 hover:border-braise-300'"
                >
                  <i class="fa-solid fa-bag-shopping text-xs"></i>
                  <span>À emporter</span>
                </button>
                <button
                  type="button"
                  @click="orderType = 'livraison'"
                  class="py-2.5 px-1 text-center rounded-xl text-xs font-semibold border flex flex-col items-center gap-1 transition-all"
                  :class="orderType === 'livraison'
                    ? 'bg-braise-500 text-white border-braise-500 shadow-sm'
                    : 'bg-white dark:bg-charcoal-850 text-charcoal-700 dark:text-charcoal-300 border-charcoal-200 dark:border-charcoal-700 hover:border-braise-300'"
                >
                  <i class="fa-solid fa-motorcycle text-xs"></i>
                  <span>Livraison</span>
                </button>
              </div>

              <!-- DELIVERY CONFIGURATION SECTION (Zone + Frais + Adresse) -->
              <div v-if="orderType === 'livraison'" class="p-3.5 rounded-2xl bg-braise-500/5 dark:bg-braise-500/10 border border-braise-500/20 space-y-3">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-braise-700 dark:text-braise-300 flex items-center gap-1.5">
                    <i class="fa-solid fa-location-crosshairs text-braise-500"></i>
                    Zone de livraison à Lomé *
                  </span>
                  <span class="text-[11px] font-extrabold text-braise-600 dark:text-braise-400">
                    +{{ formatPrice(deliveryFee) }}
                  </span>
                </div>

                <!-- Zone Select -->
                <select
                  v-model="selectedZoneId"
                  class="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-700 text-charcoal-900 dark:text-white focus:outline-none focus:border-braise-500 font-medium"
                >
                  <option
                    v-for="zone in LOME_DELIVERY_ZONES"
                    :key="zone.id"
                    :value="zone.id"
                  >
                    {{ zone.name }} +{{ formatPrice(zone.fee) }}
                  </option>
                </select>

                <!-- Zone Details & Neighborhoods Covered -->
                <div class="text-[11px] text-charcoal-600 dark:text-charcoal-300 space-y-1 bg-white/70 dark:bg-charcoal-800/70 p-2.5 rounded-xl border border-charcoal-200/60 dark:border-charcoal-700/60">
                  <div class="flex items-center justify-between">
                    <span class="font-semibold text-charcoal-800 dark:text-charcoal-200">Quartiers desservis :</span>
                    <span class="text-emerald-600 dark:text-emerald-400 font-bold">~{{ currentZone.estimatedTime }}</span>
                  </div>
                  <p class="leading-relaxed text-charcoal-500 dark:text-charcoal-400">
                    {{ currentZone.neighborhoods }}
                  </p>
                </div>

                <!-- Delivery Address & Landmark -->
                <div>
                  <label class="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
                    Adresse ou repère précis de livraison *
                  </label>
                  <input
                    v-model="deliveryAddress"
                    type="text"
                    required
                    placeholder="Ex: Nyékonakpoé, 2ème rue après la pharmacie..."
                    class="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-charcoal-800 border text-charcoal-900 dark:text-white placeholder-charcoal-400 focus:outline-none focus:border-braise-500"
                    :class="showValidationWarning && !deliveryAddress.trim() ? 'border-rose-500' : 'border-charcoal-200 dark:border-charcoal-700'"
                  />
                  <p v-if="showValidationWarning && !deliveryAddress.trim()" class="text-[10px] text-rose-500 mt-1 font-semibold">
                    Veuillez indiquer un repère pour le livreur à Lomé.
                  </p>
                </div>
              </div>

              <!-- Customer Name & Phone -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label class="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
                    Votre nom
                  </label>
                  <input
                    v-model="customerName"
                    type="text"
                    placeholder="Ex : M. Koffi"
                    class="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-700 text-charcoal-900 dark:text-white focus:outline-none focus:border-braise-500"
                  />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
                    Téléphone Togo
                  </label>
                  <input
                    v-model="customerPhone"
                    type="tel"
                    placeholder="Ex : 70 44 43 06"
                    class="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-700 text-charcoal-900 dark:text-white focus:outline-none focus:border-braise-500"
                  />
                </div>
              </div>

              <!-- Payment Method in Togo -->
              <div>
                <label class="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1.5">
                  Règlement souhaité
                </label>
                <div class="grid grid-cols-3 gap-1.5 text-xs">
                  <button
                    type="button"
                    @click="paymentMethod = 'especes'"
                    class="py-2 px-2 rounded-xl border text-center transition-colors text-[11px] font-semibold"
                    :class="paymentMethod === 'especes'
                      ? 'bg-charcoal-900 dark:bg-white text-white dark:text-charcoal-900 border-charcoal-900 dark:border-white'
                      : 'bg-white dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 border-charcoal-200 dark:border-charcoal-700'"
                  >
                    Espèces
                  </button>
                  <button
                    type="button"
                    @click="paymentMethod = 'tmoney'"
                    class="py-2 px-2 rounded-xl border text-center transition-colors text-[11px] font-semibold"
                    :class="paymentMethod === 'tmoney'
                      ? 'bg-braise-500 text-white border-braise-500'
                      : 'bg-white dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 border-charcoal-200 dark:border-charcoal-700'"
                  >
                    T-Money
                  </button>
                  <button
                    type="button"
                    @click="paymentMethod = 'flooz'"
                    class="py-2 px-2 rounded-xl border text-center transition-colors text-[11px] font-semibold"
                    :class="paymentMethod === 'flooz'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 border-charcoal-200 dark:border-charcoal-700'"
                  >
                    Moov Flooz
                  </button>
                </div>
              </div>

              <!-- Notes / Special request -->
              <div>
                <label class="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 mb-1">
                  Précisions ou piment
                </label>
                <input
                  v-model="customerNotes"
                  type="text"
                  placeholder="Ex : Piment vert doux, poisson bien grillé..."
                  class="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-700 text-charcoal-900 dark:text-white focus:outline-none focus:border-braise-500"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Footer: Price Breakdown & Final WhatsApp Action -->
        <div v-if="cart.length > 0" class="p-4 sm:p-6 border-t border-charcoal-200 dark:border-charcoal-800 bg-[#FAFAF8] dark:bg-charcoal-850 space-y-3 shrink-0 cart-safe-pb">
          
          <!-- Detailed breakdown when delivery -->
          <div v-if="orderType === 'livraison'" class="space-y-1.5 text-xs text-charcoal-600 dark:text-charcoal-300 pb-2 border-b border-charcoal-200/60 dark:border-charcoal-700/60">
            <div class="flex items-center justify-between">
              <span>Sous-total plats :</span>
              <span class="font-semibold text-charcoal-900 dark:text-white">{{ formatPrice(itemsTotal) }}</span>
            </div>
            <div class="flex items-center justify-between text-braise-600 dark:text-braise-400">
              <span class="flex items-center gap-1">
                <i class="fa-solid fa-motorcycle text-[10px]"></i>
                Frais de livraison - {{ currentZone.shortLabel }} :
              </span>
              <span class="font-bold">+{{ formatPrice(deliveryFee) }}</span>
            </div>
          </div>

          <!-- Total display -->
          <div class="flex items-center justify-between text-sm">
            <span class="font-bold text-charcoal-700 dark:text-charcoal-300">
              {{ orderType === 'livraison' ? 'TOTAL À PAYER :' : 'Total de la commande :' }}
            </span>
            <span class="text-xl font-black text-braise-600 dark:text-braise-400 font-serif">
              {{ formatPrice(totalPrice) }}
            </span>
          </div>

          <!-- Submit Button -->
          <button
            type="button"
            @click="finalizeOrder"
            class="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5"
          >
            <i class="fa-brands fa-whatsapp text-lg"></i>
            <span>Commander sur WhatsApp</span>
          </button>

          <p class="text-[11px] text-center text-charcoal-500 dark:text-charcoal-400">
            Votre commande sera transmise directement au chef braiseur avec le récapitulatif complet des plats et des frais.
          </p>
        </div>
      </div>
    </div>
  </div>
  </Teleport>
</template>

<style scoped>
.cart-safe-pb {
  padding-bottom: max(1.25rem, env(safe-area-inset-bottom));
}
</style>
