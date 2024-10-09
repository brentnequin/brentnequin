// @ts-nocheck
export default defineNuxtConfig({
  $production: {
    ignore: [
      'pages/test/**/*',
      'pages/**/-*'
    ]
  },

  imports: {
    dirs: [
      'types/**/*.ts'
    ]
  },

  css: [
    '~/assets/css/tailwind.css',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    'unplugin-icons/nuxt',
    '@nuxt/content',
    '@nuxtjs/google-fonts',
    // '@nuxtjs/color-mode',
  ],

  googleFonts: {
    download: true,
    display: "swap",
    preload: true,
    families: {
      'M PLUS Rounded 1c': [400],
    }
  },

  colorMode: {
    classSuffix: ''
  },

  vite: {
    server: {
      watch: {
        usePolling: true
      }
    }
  },

  compatibilityDate: '2024-10-02'
})