import { ref, computed } from 'vue'
import { RESTAURANT_INFO, LOME_DELIVERY_ZONES, type MenuItem, type DeliveryZone } from '~/data/restaurant'

export interface CartItem {
  dish: MenuItem
  quantity: number
  notes?: string
}

// Global reactive cart state across components
const cart = ref<CartItem[]>([])
const isCartOpen = ref(false)
const orderType = ref<'sur-place' | 'emporter' | 'livraison'>('sur-place')
const customerName = ref('')
const customerPhone = ref('')
const customerNotes = ref('')
const selectedZoneId = ref('zone-1')
const deliveryAddress = ref('')
const paymentMethod = ref<'especes' | 'tmoney' | 'flooz'>('especes')

export function useCart() {
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

  const totalCount = computed(() => {
    return cart.value.reduce((acc, item) => acc + item.quantity, 0)
  })

  // Dishes subtotal
  const itemsTotal = computed(() => {
    return cart.value.reduce((acc, item) => acc + item.dish.price * item.quantity, 0)
  })

  // Current selected delivery zone
  const currentZone = computed<DeliveryZone>(() => {
    return LOME_DELIVERY_ZONES.find(z => z.id === selectedZoneId.value) || LOME_DELIVERY_ZONES[0]
  })

  // Delivery fee (0 if on-site or takeout)
  const deliveryFee = computed(() => {
    return orderType.value === 'livraison' ? currentZone.value.fee : 0
  })

  // Grand total including delivery fee
  const totalPrice = computed(() => {
    return itemsTotal.value + deliveryFee.value
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'
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
      customerPhone.value ? `• Téléphone contact : ${customerPhone.value}` : ''
    ].filter(Boolean)

    if (isDelivery) {
      lines.push(
        `• Zone de livraison : ${currentZone.value.name}`,
        `• Quartiers : ${currentZone.value.neighborhoods}`,
        `• Adresse / Repère précis : ${deliveryAddress.value || 'À préciser sur WhatsApp'}`,
        `• Délai estimé livraison : ~${currentZone.value.estimatedTime}`
      )
    }

    lines.push('\n*Plat(s) commandé(s) :*')
    cart.value.forEach(item => {
      lines.push(`• ${item.quantity}x ${item.dish.name} (${formatPrice(item.dish.price * item.quantity)})`)
    })

    if (isDelivery) {
      lines.push(
        `\n*Sous-total plats :* ${formatPrice(itemsTotal.value)}`,
        `*Frais de livraison :* +${formatPrice(deliveryFee.value)} (${currentZone.value.shortLabel})`,
        `*TOTAL GÉNÉRAL À PAYER :* ${formatPrice(totalPrice.value)}`
      )
    } else {
      lines.push(`\n*TOTAL À PAYER :* ${formatPrice(totalPrice.value)}`)
    }

    lines.push(`• Règlement prévu : ${paymentLabel}`)

    if (customerNotes.value) {
      lines.push(`• Remarques / Piment : ${customerNotes.value}`)
    }

    lines.push(`\nMerci de me confirmer la préparation et l'heure estimée.`)

    const text = lines.join('\n')
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`
  }

  return {
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
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalCount,
    totalPrice,
    formatPrice,
    getWhatsAppOrderLink,
    LOME_DELIVERY_ZONES
  }
}
