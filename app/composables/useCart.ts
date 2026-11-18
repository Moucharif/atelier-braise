import { storeToRefs } from 'pinia'
import { useCartStore } from '~/stores/cart'

export function useCart() {
  const store = useCartStore()
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
    totalCount,
    itemsTotal,
    currentZone,
    deliveryFee,
    totalPrice
  } = storeToRefs(store)

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
    LOME_DELIVERY_ZONES: store.LOME_DELIVERY_ZONES,
    totalCount,
    itemsTotal,
    currentZone,
    deliveryFee,
    totalPrice,
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    openCart: store.openCart,
    closeCart: store.closeCart,
    toggleCart: store.toggleCart,
    formatPrice: store.formatPrice,
    getWhatsAppOrderLink: store.getWhatsAppOrderLink
  }
}
