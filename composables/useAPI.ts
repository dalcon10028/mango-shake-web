import { type FetchOptions, type ResponseType, ofetch} from "ofetch";
import type {ZodType, ZodTypeAny} from "zod";
import {useAuthStore} from "~/store/useAuthStore";

interface CustomError {
  message: string
  statusCode: number
}

export async function useAPI<T>(
  url: string,
  zodSchema: ZodType<T>,
  options: FetchOptions<"json", T> = {}
): Promise<T> {
  const { $api } = useNuxtApp()
  const { token } = useAuthStore()

  console.info(`Fetching ${url}`)

  return await $api<T>(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
    // zod parse
    onResponse({ response }) {
      if (response.ok) {
        const { success, data, error } =  zodSchema.safeParse(response._data)
        if (success) {
          response._data = data
        } else {
          console.log('####')
          console.error(error)
          throw error
        }
      }
    },
    ...options,
  })
}
