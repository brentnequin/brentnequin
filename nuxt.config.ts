// @ts-nocheck
export default defineNuxtConfig({
  $production: {
    ignore: [
      'pages/test/**/*',
      'pages/**/-*'
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
  }
})
