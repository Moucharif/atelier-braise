import { computed } from 'vue'

export function useRestaurantStatus() {
  const status = computed(() => {
    const now = new Date()
    const day = now.getDay() // 0 = Dimanche, 1 = Lundi, 2 = Mardi...
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const currentMinutes = hours * 60 + minutes

    // Lundi = Fermé
    if (day === 1) {
      return {
        isOpen: false,
        label: 'Fermé le lundi',
        sublabel: 'Réouverture mardi à 12:00',
        badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
      }
    }

    // Mardi à Dimanche:
    // Midi: 12h00 (720 min) à 15h30 (930 min)
    // Soir: 18h30 (1110 min) à 23h45 (1425 min)
    const isMidi = currentMinutes >= 720 && currentMinutes <= 930
    const isSoir = currentMinutes >= 1110 && currentMinutes <= 1425

    if (isMidi || isSoir) {
      return {
        isOpen: true,
        label: 'Ouvert actuellement',
        sublabel: isMidi ? 'Service du midi jusqu\'à 15h30' : 'Service du soir en cours',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
      }
    }

    if (currentMinutes < 720) {
      return {
        isOpen: false,
        label: 'Fermé actuellement',
        sublabel: 'Ouvre ce midi à 12:00',
        badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
      }
    }

    if (currentMinutes > 930 && currentMinutes < 1110) {
      return {
        isOpen: false,
        label: 'Pause de l\'après-midi',
        sublabel: 'Réouverture ce soir à 18:30',
        badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
      }
    }

    return {
      isOpen: false,
      label: 'Fermé pour la nuit',
      sublabel: 'Ouvre demain à 12:00',
      badgeColor: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20'
    }
  })

  return {
    status
  }
}
