import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { RESTAURANT_INFO, LOME_DELIVERY_ZONES, type MenuItem, type DeliveryZone } from '~/data/restaurant'

export interface CartItem {
  dish: MenuItem
  quantity: number
  notes?: string
}

export const useCartStore = defineStore('cart', () => {
  // State
  const cart = ref<CartItem[]>([])
  const isCartOpen = ref(false)
  const orderType = ref<'sur-place' | 'emporter' | 'livraison'>('sur-place')
  const customerName = ref('')
  const customerPhone = ref('')
  const customerNotes = ref('')
  const selectedZoneId = ref('zone-1')
  const deliveryAddress = ref('')
  const paymentMethod = ref<'especes' | 'tmoney' | 'flooz'>('especes')

  // Getters
  const totalCount = computed(() => {
    return cart.value.reduce((acc, item) => acc + item.quantity, 0)
  })

  const itemsTotal = computed(() => {
    return cart.value.reduce((acc, item) => acc + item.dish.price * item.quantity, 0)
  })

  const currentZone = computed<DeliveryZone>(() => {
    return LOME_DELIVERY_ZONES.find(z => z.id === selectedZoneId.value) || LOME_DELIVERY_ZONES[0]
  })

  const deliveryFee = computed(() => {
    return orderType.value === 'livraison' ? currentZone.value.fee : 0
  })

  const totalPrice = computed(() => {
    return itemsTotal.value + deliveryFee.value
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'
  }

  // Actions
  const addItem = (dish: MenuItem) => {
    const existing = cart.value.find(item => item.dish.id === dish.id)
    if (existing) {
      existing.quantity++
    } else {
      cart.value.push({ dish, quantity: 1 })
    }
  }

  const removeItem = (dishId: string) => {
    const index = cart.value.findIndex(item => item.dish.id === dishId)
    if (index > -1) {
      cart.value.splice(index, 1)
    }
  }

  const updateQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(dishId)
      return
    }
    const item = cart.value.find(item => item.dish.id === dishId)
    if (item) {
      item.quantity = quantity
    }
  }

  const clearCart = () => {
    cart.value = []
  }

  const openCart = () => {
    isCartOpen.value = true
  }

  const closeCart = () => {
    isCartOpen.value = false
  }

  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value
  }

  const getWhatsAppOrderLink = () => {
    if (cart.value.length === 0) return ''

    const isDelivery = orderType.value === 'livraison'
    const isTakeout = orderType.value === 'emporter'

    let typeLabel = 'Dégustation sur place à Nyékonakpoé'
    if (isDelivery) typeLabel = '🛵 Livraison à domicile / bureau (Lomé)'
    if (isTakeout) typeLabel = '🥡 À emporter (Passage au restaurant)'

    const paymentLabel = paymentMethod.value === 'tmoney'
      ? 'T-Money (+228 70 44 43 06)'
      : paymentMethod.value === 'flooz'
        ? 'Moov Money (Flooz)'
        : 'Espèces (FCFA)'

    const lines: string[] = [
      `*Commande - ${RESTAURANT_INFO.name} (Lomé)* 🍽️`,
      `• Formule : ${typeLabel}`,
      customerName.value ? `• Nom du client : ${customerName.value}` : '• Client : Non précisé',
      customerPhone.value ? `• Téléphone : ${customerPhone.value}` : '',
      isDelivery ? `• Quartier / Zone Lomé : ${currentZone.value.name} (+${formatPrice(currentZone.value.fee)})` : '',
      isDelivery && deliveryAddress.value ? `• Adresse précise : ${deliveryAddress.value}` : '',
      `• Mode de règlement : ${paymentLabel}`,
      '',
      '*Détail des plats commandés :*'
    ].filter(Boolean)

    cart.value.forEach(item => {
      lines.push(`- ${item.quantity}x ${item.dish.name} (${formatPrice(item.dish.price * item.quantity)})`)
      if (item.notes) {
        lines.push(`  ↳ Note : ${item.notes}`)
      }
    })

    lines.push('')
    lines.push(`*Sous-total plats :* ${formatPrice(itemsTotal.value)}`)
    if (isDelivery) {
      lines.push(`*Frais de livraison :* ${formatPrice(deliveryFee.value)}`)
    }
    lines.push(`*TOTAL À PAYER : ${formatPrice(totalPrice.value)}*`)

    if (customerNotes.value) {
      lines.push('')
      lines.push(`*Instructions spéciales :* ${customerNotes.value}`)
    }

    lines.push('')
    lines.push('Merci de confirmer ma commande et le délai de préparation au feu de bois.')

    const message = lines.join('\n')
    const cleanNumber = RESTAURANT_INFO.whatsappNumber.replace(/[^0-9]/g, '')
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`
  }

  return {
    // State
    cart,
    isCartOpen,
    orderType,
    customerName,
    customerPhone,
    customerNotes,
    selectedZoneId,
    deliveryAddress,
    paymentMethod,
    LOME_DELIVERY_ZONES,
    // Getters
    totalCount,
    itemsTotal,
    currentZone,
    deliveryFee,
    totalPrice,
    // Actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
    formatPrice,
    getWhatsAppOrderLink
  }
})
