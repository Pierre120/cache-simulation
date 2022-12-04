// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // For Vercel deployment
  nitro: {
    preset: 'vercel-edge',
  },
})
