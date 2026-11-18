import { onMounted } from 'vue'
import { useThemeStore } from '~/stores/theme'

export function useTheme() {
  const store = useThemeStore()

  onMounted(() => {
    store.applyTheme()
  })

  return {
    isDark: store.isDark,
    toggleTheme: store.toggleTheme,
    applyTheme: store.applyTheme,
    setTheme: store.setTheme
  }
}
