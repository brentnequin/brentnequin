// @ts-nocheck
export default defineNuxtConfig({
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
        '@nuxtjs/google-fonts',
        '@nuxtjs/color-mode',
        'unplugin-icons/nuxt',
        '@nuxt/content'
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
    }
})
