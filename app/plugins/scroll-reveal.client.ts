export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return

  const setupScrollReveal = () => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
        }
      })
    }, observerOptions)

    const elementsToReveal = document.querySelectorAll(
      '.reveal-on-scroll, .reveal-scale, .reveal-left, .reveal-right'
    )
    elementsToReveal.forEach((el) => observer.observe(el))
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

  // Initialize after DOM is ready
  window.addEventListener('DOMContentLoaded', () => {
    setupScrollReveal()
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  // Nuxt page hook to re-observe if DOM updates
  const nuxtApp = useNuxtApp()
  nuxtApp.hook('page:finish', () => {
    setTimeout(setupScrollReveal, 100)
  })

  // Initial trigger
  setTimeout(() => {
    setupScrollReveal()
    window.addEventListener('scroll', handleScroll, { passive: true })
  }, 150)
})
