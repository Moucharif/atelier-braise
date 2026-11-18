import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.{vue,js,ts,jsx,tsx}',
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif']
      },
      colors: {
        braise: {
          50: '#FDF7F4',
          100: '#F9ECE5',
          200: '#F2D3C4',
          300: '#E7B298',
          400: '#D68962',
          500: '#C25E34', // Signature terracotta / braise
          600: '#A94A23',
          700: '#8A381A',
          800: '#712E17',
          900: '#5E2816',
          950: '#34130A'
        },
        charcoal: {
          50: '#F7F7F8',
          100: '#EEEEF1',
          200: '#DCDCE1',
          300: '#BDBDC6',
          400: '#9494A3',
          500: '#717183',
          600: '#555565',
          700: '#41414E',
          800: '#2A2A33',
          850: '#1F1F27',
          900: '#16161C',
          950: '#0E0E12'
        },
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#1EBE5D',
          hover: '#1DA851'
        }
      }
    }
  }
}
