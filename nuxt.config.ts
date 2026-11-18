// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  postcss: {
    plugins: {
      'tailwindcss/nesting': false,
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  css: [
    '@fortawesome/fontawesome-free/css/all.min.css',
    '~/assets/css/main.css'
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'fr'
      },
      title: "L'Atelier Braisé | Grillades au Feu de Bois & Saveurs du Terroir - Lomé, Togo",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover' },
        {
          name: 'description',
          content: "Restaurant de grillades au feu de bois à Lomé, Togo. Poissons braisés frais, poulets fermiers marinés et accompagnements locaux. Réservez sur WhatsApp au +228 70 44 43 06."
        },
        { property: 'og:title', content: "L'Atelier Braisé | Grillades & Saveurs Authentiques - Lomé" },
        {
          property: 'og:description',
          content: "Le spécialiste du poisson braisé et des grillades au feu de bois à Lomé. Commandes et réservations directes sur WhatsApp au +228 70 44 43 06."
        },
        { property: 'og:type', content: 'restaurant' },
        { name: 'theme-color', content: '#FAFAF8' }
      ],
      script: [
        {
          children: "try { if (localStorage.getItem('theme') === 'dark') { document.documentElement.classList.add('dark'); } else { document.documentElement.classList.remove('dark'); } } catch (e) {}"
        }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&display=swap'
        }
      ]
    }
  }
})
