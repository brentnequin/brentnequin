import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    host: 'localhost',
  },
  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/content',
    'nuxt-auth-utils',
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    tmdbAccessToken: process.env.NUXT_TMDB_ACCESS_TOKEN,
    adminGithubUsername: process.env.NUXT_ADMIN_GITHUB_USERNAME,
    oauth: {
      github: {
        clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET,
      },
    },
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      apiKey: process.env.NUXT_PUBLIC_API_KEY
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/quarter-rest.svg' },
      ],
    },
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