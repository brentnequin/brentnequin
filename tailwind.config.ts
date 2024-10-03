import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      fontFamily: {
        'm-plus-rounded-1c': ['"M PLUS Rounded 1c"', 'sans-serif']
      }
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: '600px',
        md: '728px',
        lg: '728px',
        xl: '1024px',
        '2xl': '1024px',
      },
    },
  },
  plugins: [],
}
