export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return

  const markAllRevealed = () => {
    const elementsToReveal = document.querySelectorAll(
      '.reveal-on-scroll, .reveal-scale, .reveal-left, .reveal-right'
    )
    elementsToReveal.forEach((el) => el.classList.add('is-revealed'))
  }

  // Reading progress indicator & Header scroll listener
  const handleScroll = () => {
    const progressBar = document.getElementById('scroll-progress')
    if (progressBar) {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0
      progressBar.style.width = `${scrolled}%`
    }

    // Scroll-to-top floating button visibility
    const backToTopBtn = document.getElementById('back-to-top-btn')
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4')
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0')
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4')
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0')
      }
    }
  }

  // Execute immediately to never block mobile render
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', markAllRevealed, { once: true })
  } else {
    markAllRevealed()
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  const nuxtApp = useNuxtApp()
  nuxtApp.hook('page:finish', () => {
    markAllRevealed()
  })
})
