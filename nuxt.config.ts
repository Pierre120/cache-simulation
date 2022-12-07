// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: "utf-8" },
      ],
      title: 'Full Associative Mapping (LRU) Cache Read Simulation'
    }
  },

  // Nuxt extensions
  modules: [
    '@nuxtjs/tailwindcss', // css framework
    '@nuxtjs/color-mode', // default color mode preference option
    '@pinia/nuxt', // state management
  ],

  // Setting default theme of UI
  colorMode: {
    preference: 'night', // default theme
    dataValue: 'theme', // activate data-theme in <html> tag
    classSuffix: '',
  },

  // For Vercel deployment
  nitro: {
    preset: 'vercel-edge',
  },
})
