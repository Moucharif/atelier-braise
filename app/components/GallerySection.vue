<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { GALLERY_PHOTOS, GALLERY_CATEGORIES, type GalleryPhoto } from '~/data/restaurant'

const activeCategory = ref('all')
const selectedPhotoIndex = ref<number | null>(null)
const isLightboxOpen = ref(false)

// Photos filtered by selected category
const filteredPhotos = computed(() => {
  if (activeCategory.value === 'all') {
    return GALLERY_PHOTOS
  }
  return GALLERY_PHOTOS.filter(photo => photo.category === activeCategory.value)
})

const getCategoryCount = (catId: string) => {
  if (catId === 'all') return GALLERY_PHOTOS.length
  return GALLERY_PHOTOS.filter(p => p.category === catId).length
}

const openLightbox = (photo: GalleryPhoto) => {
  const index = filteredPhotos.value.findIndex(p => p.id === photo.id)
  selectedPhotoIndex.value = index > -1 ? index : 0
  isLightboxOpen.value = true
}

const closeLightbox = () => {
  isLightboxOpen.value = false
  selectedPhotoIndex.value = null
}

watch(isLightboxOpen, (val) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = val ? 'hidden' : ''
  }
})

const currentPhoto = computed<GalleryPhoto | null>(() => {
  if (selectedPhotoIndex.value === null) return null
  return filteredPhotos.value[selectedPhotoIndex.value] || null
})

const nextPhoto = () => {
  if (selectedPhotoIndex.value === null) return
  if (selectedPhotoIndex.value < filteredPhotos.value.length - 1) {
    selectedPhotoIndex.value++
  } else {
    selectedPhotoIndex.value = 0 // loop
  }
}

const prevPhoto = () => {
  if (selectedPhotoIndex.value === null) return
  if (selectedPhotoIndex.value > 0) {
    selectedPhotoIndex.value--
  } else {
    selectedPhotoIndex.value = filteredPhotos.value.length - 1 // loop
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!isLightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextPhoto()
  if (e.key === 'ArrowLeft') prevPhoto()
}

const route = useRoute()

watch(() => route.query.cat, (newCat) => {
  if (newCat && typeof newCat === 'string' && GALLERY_CATEGORIES.some(c => c.id === newCat)) {
    activeCategory.value = newCat
  }
})

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
    if (route.query.cat && typeof route.query.cat === 'string') {
      const exists = GALLERY_CATEGORIES.some(c => c.id === route.query.cat)
      if (exists) activeCategory.value = route.query.cat
    }
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
  }
})

const handleActionRedirect = (href?: string) => {
  closeLightbox()
  if (!href) return
  if (typeof window !== 'undefined') {
    if (href.startsWith('#')) {
      const el = document.getElementById(href.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.location.hash = href
      }
    } else {
      window.open(href, '_blank')
    }
  }
}
</script>

<template>
  <section id="galerie" class="py-16 lg:py-24 bg-white dark:bg-charcoal-900 border-t border-charcoal-200/80 dark:border-charcoal-800 transition-colors reveal-on-scroll">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="max-w-2xl mx-auto text-center mb-10 space-y-3">
        <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-braise-500/10 text-braise-700 dark:text-braise-300 border border-braise-500/20">
          <i class="fa-solid fa-camera text-braise-500"></i>
          Galerie Photos & Ambiance
        </span>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900 dark:text-white font-serif">
          L'Atelier en Images : Braise, Terrasse & Saveurs
        </h2>
        <p class="text-sm sm:text-base text-charcoal-600 dark:text-charcoal-300">
          Explorez nos différentes galeries thématiques : nos poissons braisés, le cadre aéré de notre terrasse à Nyékonakpoé, et les secrets de notre cuisine au feu de bois.
        </p>
      </div>

      <!-- Category Filter Tabs with Count & Font Awesome Icons -->
      <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10">
        <button
          v-for="cat in GALLERY_CATEGORIES"
          :key="cat.id"
          type="button"
          @click="activeCategory = cat.id"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200"
          :class="activeCategory === cat.id
            ? 'bg-braise-500 text-white shadow-md transform scale-105'
            : 'bg-[#FAFAF8] dark:bg-charcoal-850 text-charcoal-700 dark:text-charcoal-300 border border-charcoal-200/80 dark:border-charcoal-800 hover:border-braise-400 hover:text-braise-600'"
        >
          <i :class="cat.icon" class="text-xs"></i>
          <span>{{ cat.label }}</span>
          <span
            class="text-[11px] px-2 py-0.5 rounded-md font-bold"
            :class="activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-charcoal-200/70 dark:bg-charcoal-750 text-charcoal-600 dark:text-charcoal-400'"
          >
            {{ getCategoryCount(cat.id) }}
          </span>
        </button>
      </div>

      <!-- Photos Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="(photo, index) in filteredPhotos"
          :key="photo.id"
          @click="openLightbox(photo)"
          class="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-charcoal-100 dark:bg-charcoal-800 border border-charcoal-200/80 dark:border-charcoal-800 shadow-sm cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <!-- Photo image -->
          <img
            :src="photo.url"
            :alt="photo.title"
            class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            loading="lazy"
          />

          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
            
            <!-- Top pill: category & zoom -->
            <div class="flex items-center justify-between">
              <span class="px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md text-[11px] font-semibold border border-white/20">
                {{ photo.categoryLabel }}
              </span>
              <span class="w-8 h-8 rounded-full bg-braise-500 text-white flex items-center justify-center text-xs shadow-md">
                <i class="fa-solid fa-expand"></i>
              </span>
            </div>

            <!-- Bottom title & description -->
            <div class="space-y-1">
              <h4 class="text-sm font-bold font-serif leading-snug">
                {{ photo.title }}
              </h4>
              <p class="text-xs text-charcoal-200 line-clamp-2">
                {{ photo.desc }}
              </p>
              <div v-if="photo.actionLabel" class="pt-1 flex items-center gap-1.5 text-amber-300 text-[11px] font-semibold">
                <span>{{ photo.actionLabel }}</span>
                <i class="fa-solid fa-arrow-right text-[9px]"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Bar below gallery with direct redirections -->
      <div class="mt-12 p-6 rounded-3xl bg-[#FAFAF8] dark:bg-charcoal-850 border border-charcoal-200/80 dark:border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div class="space-y-1">
          <h4 class="text-base font-bold text-charcoal-900 dark:text-white font-serif">
            Ces images vous ont ouvert l'appétit ?
          </h4>
          <p class="text-xs text-charcoal-500 dark:text-charcoal-400">
            Retrouvez tous ces plats avec leurs prix fixes en FCFA ou réservez dès maintenant pour ce midi ou ce soir.
          </p>
        </div>

        <div class="flex flex-wrap items-center justify-center sm:justify-end gap-3 shrink-0">
          <a
            href="#menu"
            class="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-charcoal-900 dark:bg-white text-white dark:text-charcoal-900 text-xs sm:text-sm font-bold shadow-sm hover:bg-black dark:hover:bg-charcoal-100 transition-colors"
          >
            <i class="fa-solid fa-utensils text-xs"></i>
            <span>Consulter la Carte & Prix</span>
          </a>

          <a
            href="#reservation"
            class="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-braise-500 hover:bg-braise-600 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors"
          >
            <i class="fa-solid fa-calendar-check text-xs"></i>
            <span>Réserver une table</span>
          </a>
        </div>
      </div>
    </div>

    <!-- INTERACTIVE LIGHTBOX MODAL WITH FULLSCREEN NAVIGATION & REDIRECTION -->
    <div
      v-if="isLightboxOpen && currentPhoto"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md transition-opacity"
      @click.self="closeLightbox"
    >
      <!-- Close Button -->
      <button
        type="button"
        @click="closeLightbox"
        class="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md transition-colors"
        aria-label="Fermer la vue photo"
      >
        <i class="fa-solid fa-xmark text-lg"></i>
      </button>

      <!-- Previous Arrow Button -->
      <button
        type="button"
        @click="prevPhoto"
        class="absolute left-3 sm:left-6 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md transition-all transform hover:scale-110"
        aria-label="Photo précédente"
      >
        <i class="fa-solid fa-chevron-left text-base"></i>
      </button>

      <!-- Next Arrow Button -->
      <button
        type="button"
        @click="nextPhoto"
        class="absolute right-3 sm:right-6 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md transition-all transform hover:scale-110"
        aria-label="Photo suivante"
      >
        <i class="fa-solid fa-chevron-right text-base"></i>
      </button>

      <!-- Lightbox Main Card -->
      <div class="relative max-w-4xl w-full bg-charcoal-900 rounded-3xl border border-charcoal-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        <!-- Large Image -->
        <div class="relative bg-black flex items-center justify-center overflow-hidden max-h-[62vh]">
          <img
            :src="currentPhoto.url"
            :alt="currentPhoto.title"
            class="w-full h-full max-h-[62vh] object-contain"
          />
        </div>

        <!-- Lightbox Caption & Redirection CTA -->
        <div class="p-5 sm:p-6 bg-charcoal-900 border-t border-charcoal-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="space-y-1.5 min-w-0 flex-1">
            <div class="flex items-center gap-2.5">
              <span class="px-2.5 py-0.5 rounded-md bg-braise-500/20 text-braise-400 border border-braise-500/30 text-[11px] font-bold">
                {{ currentPhoto.categoryLabel }}
              </span>
              <span class="text-xs text-charcoal-400">
                Photo {{ (selectedPhotoIndex || 0) + 1 }} sur {{ filteredPhotos.length }}
              </span>
            </div>

            <h3 class="text-base sm:text-lg font-bold text-white font-serif">
              {{ currentPhoto.title }}
            </h3>

            <p class="text-xs sm:text-sm text-charcoal-300 leading-relaxed">
              {{ currentPhoto.desc }}
            </p>
          </div>

          <!-- Direct Redirection Button -->
          <div v-if="currentPhoto.actionHref" class="shrink-0 w-full sm:w-auto">
            <button
              type="button"
              @click="handleActionRedirect(currentPhoto.actionHref)"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-braise-500 hover:bg-braise-600 text-white font-semibold text-xs sm:text-sm transition-colors shadow-md"
            >
              <span>{{ currentPhoto.actionLabel || 'En savoir plus' }}</span>
              <i class="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
