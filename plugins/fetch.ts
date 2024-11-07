// import { useAuthStore } from '~/store/auth'
import { ofetch } from 'ofetch'
import {HttpStatusCode} from "~/domain/shared/http-status";
import {useAuthStore} from "~/store/useAuthStore";


// https://stackoverflow.com/questions/75434573/redefine-fetch-in-nuxt3-with-global-onrequest-handler
// https://nuxt.com/docs/guide/recipes/custom-usefetch
export default defineNuxtPlugin((_nuxtApp) => {
  const config = useRuntimeConfig()

  const api = ofetch.create({
    baseURL: config.public.baseURL,
    timeout: 3000,
    // async onRequestError({ request, options, error }) {
    //   console.log("[fetch request error]");
    // },
    async onResponse({ request, response, options }) {
      console.log("[fetch response]");
    },
    async onResponseError({ request, response, options, error }) {
      const toast = useToast()
      console.log("[fetch response error]", response.status, error)
      switch (response.status) {
        case HttpStatusCode.NotFound:
          console.error('404 Not Found')
          break
        case HttpStatusCode.Forbidden:
          toast.add({
            icon: 'i-heroicons-lock-closed',
            title: '권한 없음',
            description: '리소스에 접근할 권한이 없습니다.',
            color: 'yellow'
          })
          navigateTo('/auth/login')
          break
        case HttpStatusCode.Unauthorized:
          toast.add({
            icon: 'i-heroicons-lock-closed',
            title: '로그인 만료',
            description: '로그인 정보가 만료되었습니다. 다시 로그인해주세요.',
            color: 'yellow'
          })
          navigateTo('/auth/login')
          break
        case HttpStatusCode.InternalServerError:
          console.error('500 Internal Server Error')
          break
        default:
          console.error('Unknown error')
          break
      }
    }
  })

  return {
    provide: {
      api
    }
  }
})
