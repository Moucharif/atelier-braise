import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { RESTAURANT_INFO, MENU_ITEMS, MENU_CATEGORIES, type MenuItem } from '~/data/restaurant'

export interface ReservationForm {
  name: string
  phone: string
  date: string
  time: string
  guests: number
  tableType: string
  selectedDishes: string[]
  notes: string
}

export const useReservationStore = defineStore('reservation', () => {
  const form = ref<ReservationForm>({
    name: '',
    phone: '',
    date: '',
    time: '19:30',
    guests: 2,
    tableType: 'terrasse',
    selectedDishes: [],
    notes: ''
  })

  const isDishModalOpen = ref(false)
  const modalSearch = ref('')
  const activeModalCategory = ref('all')
  const isSubmitted = ref(false)

  // Estimated total of selected pre-ordered dishes
  const selectedDishesTotal = computed(() => {
    return form.value.selectedDishes.reduce((total, dishName) => {
      const dish = MENU_ITEMS.find(item => item.name === dishName)
      return total + (dish ? dish.price : 0)
    }, 0)
  })

  // Dishes filtered for modal selection
  const modalFilteredDishes = computed(() => {
    const q = modalSearch.value.trim().toLowerCase()
    return MENU_ITEMS.filter(dish => {
      const matchesCat = activeModalCategory.value === 'all' || dish.category === activeModalCategory.value
      const matchesSearch = !q || dish.name.toLowerCase().includes(q) || dish.description.toLowerCase().includes(q)
      return matchesCat && matchesSearch
    }).sort((a, b) => {
      const aHasImg = Boolean(a.image)
      const bHasImg = Boolean(b.image)
      if (aHasImg && !bHasImg) return -1
      if (!aHasImg && bHasImg) return 1
      return 0
    })
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'
  }

  const getDishByName = (name: string): MenuItem | undefined => {
    return MENU_ITEMS.find(item => item.name === name)
  }

  const getDishPrice = (dishName: string): number => {
    const dish = getDishByName(dishName)
    return dish ? dish.price : 0
  }

  const isDishSelected = (dishName: string): boolean => {
    return form.value.selectedDishes.includes(dishName)
  }

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

  const clearSelectedDishes = () => {
    form.value.selectedDishes = []
  }

  const openModal = () => {
    isDishModalOpen.value = true
  }

  const closeModal = () => {
    isDishModalOpen.value = false
  }

  const submitReservation = () => {
    const dishesFormatted = form.value.selectedDishes.length > 0
      ? form.value.selectedDishes.map(d => `  - ${d} (${formatPrice(getDishPrice(d))})`).join('\n') + `\n  *Total estimé des plats : ${formatPrice(selectedDishesTotal.value)}*`
      : '  Aucun (choix à la carte sur place)'

    const tableTypeLabel = form.value.tableType === 'terrasse'
      ? 'Terrasse ombragée / aérée'
      : form.value.tableType === 'salle'
        ? 'Salle intérieure climatisée'
        : 'Espace lounge grillades'

    const text = `*Réservation de Table - ${RESTAURANT_INFO.name} (Lomé)* 📅
• Client : ${form.value.name}
• Téléphone : ${form.value.phone}
• Date souhaitée : ${form.value.date} à ${form.value.time}
• Nombre de personnes : ${form.value.guests} pers.
• Emplacement souhaité : ${tableTypeLabel}

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

  return {
    form,
    isDishModalOpen,
    modalSearch,
    activeModalCategory,
    isSubmitted,
    selectedDishesTotal,
    modalFilteredDishes,
    categories: MENU_CATEGORIES,
    formatPrice,
    getDishByName,
    getDishPrice,
    isDishSelected,
    toggleDishSelection,
    removeDish,
    clearSelectedDishes,
    openModal,
    closeModal,
    submitReservation
  }
})
