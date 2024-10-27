// import { useAuthStore } from '~/store/auth'
import { ofetch } from 'ofetch'

// https://stackoverflow.com/questions/75434573/redefine-fetch-in-nuxt3-with-global-onrequest-handler
// https://nuxt.com/docs/guide/recipes/custom-usefetch
export default defineNuxtPlugin((_nuxtApp) => {
  const config = useRuntimeConfig()

  const api = ofetch.create({
    baseURL: config.public.baseURL,
    timeout: 3000,

    async onRequest({ request, options}) {
      // const authStore = useAuthStore()
      // if (authStore.isAuthenticated) {
      const headers = new Headers(options.headers);
      const username = "user";
      const password = "user";
      headers.set("Authorization", `Basic ${btoa(`${username}:${password}`)}`);
      options.headers = headers;
      // console.log(options)
      // } else {
      //   console.log('Not authenticated')
      // }
    },
    // async onRequestError({ request, options, error }) {
    //   console.log("[fetch request error]");
    // },
    async onResponse({ request, response, options }) {
      console.log("[fetch response]");
    },
    // async onResponseError({ request, response, options }) {
    //   if (response.status === 401) {
    //     // return navigateTo('/login')
    //   }
    // },
  })

  return {
    provide: {
      api
    }
  }
})
