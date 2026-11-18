import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { MENU_ITEMS, MENU_CATEGORIES, type MenuItem } from '~/data/restaurant'

export const useMenuStore = defineStore('menu', () => {
  const activeCategory = ref('all')
  const searchQuery = ref('')
  const selectedDishForModal = ref<MenuItem | null>(null)
  const isModalOpen = ref(false)

  // Tri strict : TOUS les plats avec images sont disposés en premier
  const filteredAndSortedItems = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()
    const filtered = MENU_ITEMS.filter(item => {
      const matchesCategory = activeCategory.value === 'all' || item.category === activeCategory.value
      const matchesSearch = !q || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
      return matchesCategory && matchesSearch
    })

    // Priorité absolue aux plats possédant une image
    return filtered.sort((a, b) => {
      const aHasImg = Boolean(a.image)
      const bHasImg = Boolean(b.image)
      if (aHasImg && !bHasImg) return -1
      if (!aHasImg && bHasImg) return 1
      return 0
    })
  })

  const setCategory = (catId: string) => {
    activeCategory.value = catId
  }

  const setSearch = (q: string) => {
    searchQuery.value = q
  }

  const resetFilters = () => {
    activeCategory.value = 'all'
    searchQuery.value = ''
  }

  const openDishModal = (item: MenuItem) => {
    selectedDishForModal.value = item
    isModalOpen.value = true
  }

  const closeDishModal = () => {
    isModalOpen.value = false
    selectedDishForModal.value = null
  }

  return {
    activeCategory,
    searchQuery,
    selectedDishForModal,
    isModalOpen,
    categories: MENU_CATEGORIES,
    filteredAndSortedItems,
    setCategory,
    setSearch,
    resetFilters,
    openDishModal,
    closeDishModal
  }
})
