import { type FetchOptions, type ResponseType, ofetch} from "ofetch";
import type {ZodType, ZodTypeAny} from "zod";

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
  return await $api<T>(url, {
    // zod parse
    onResponse({ response }) {
      if (response.ok) {
        const { success, data, error } =  zodSchema.safeParse(response._data)
        if (success) {
          response._data = data
        } else {
          console.error(error)
          throw error
        }
      }
    },
    ...options,
  })
}
