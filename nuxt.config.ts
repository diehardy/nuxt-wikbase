// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    public: {
      // for using in public
      darkOffColor: '#f7f0e8',
      storageLink: 'https://media.wikbase.com/'
    }
  },
  pages: true,
  modules: ['@nuxtjs/tailwindcss', ['@pinia/nuxt', {autoImports: ['defineStore', 'acceptHMRUpdate']}]],
  imports: {
    dirs: ['stores']
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Wikbase your gaming wiki',
      meta: [
        {name: 'description', content: 'Wikbase will provide for you helpful details about various videogames.'}
      ],
      htmlAttrs: {
        lang: 'en',
      }
    },
  },
  nitro: {
    compressPublicAssets: true,
    minify: true
  },

})