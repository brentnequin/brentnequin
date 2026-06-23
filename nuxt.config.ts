import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/color-mode'],
  css: ['./assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },
})