import { useCartStore } from '~/stores/cart'

export function useCart() {
  const store = useCartStore()

  return {
    cart: store.cart,
    isCartOpen: store.isCartOpen,
    orderType: store.orderType,
    customerName: store.customerName,
    customerPhone: store.customerPhone,
    customerNotes: store.customerNotes,
    selectedZoneId: store.selectedZoneId,
    deliveryAddress: store.deliveryAddress,
    paymentMethod: store.paymentMethod,
    LOME_DELIVERY_ZONES: store.LOME_DELIVERY_ZONES,
    totalCount: store.totalCount,
    itemsTotal: store.itemsTotal,
    currentZone: store.currentZone,
    deliveryFee: store.deliveryFee,
    totalPrice: store.totalPrice,
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
