// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  hooks: {
    // https://nuxt.com/docs/guide/concepts/rendering#universal-rendering
    // https://youtu.be/7Lr0QTP1Ro8
    'prerender:routes' ({ routes }) {
      routes.clear() // Do not generate any routes (except the defaults)
    }
  },
  router: {
    options: {
      hashMode: true
    }
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:8080',
      enableMocking: process.env.ENV === 'local'
    }
  },

  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@vueuse/nuxt", '@nuxt/eslint', '@nuxt/icon', '@pinia/nuxt'],

  ui: {
    safelistColors: ['primary', 'red', 'orange', 'green']
  },

  colorMode: {
    disableTransition: true
  },

  routeRules: {
    // Temporary workaround for prerender regression. see https://github.com/nuxt/nuxt/issues/27490
    '/': { prerender: true }
  },

  buildModules: [
    '@nuxtjs/date-fns',
  ],

  compatibilityDate: "2024-09-28"
})