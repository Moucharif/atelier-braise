import { ref, onMounted } from 'vue'

// Shared reactive state across components (default: FALSE = light theme)
const isDark = ref(false)

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value
    if (typeof document !== 'undefined') {
      if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }
  }

  const applyTheme = () => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme')

      // STRICTEMENT CLAIR PAR DÉFAUT :
      // Le site est toujours en mode clair sauf si l'utilisateur a explicitement cliqué pour passer en mode sombre.
      if (storedTheme === 'dark') {
        isDark.value = true
        document.documentElement.classList.add('dark')
      } else {
        isDark.value = false
        document.documentElement.classList.remove('dark')
        // Si aucune préférence n'était enregistrée, on consigne explicitement 'light'
        if (!storedTheme) {
          localStorage.setItem('theme', 'light')
        }
      }
    }
  }

  onMounted(() => {
    applyTheme()
  })

  return {
    isDark,
    toggleTheme,
    applyTheme
  }
}
