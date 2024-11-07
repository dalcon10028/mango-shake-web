import { defineStore } from 'pinia'
import { jwtDecode } from "jwt-decode";
import type {AuthProvider} from "~/domain/auth/auth-provider";
import type {AuthUser} from "~/domain/auth/user";

const ACCESS_TOKEN_NAME = 'mango_shake_access_token'

export const useAuthStore = defineStore('auth', () => {
  const toast = useToast()
  const token = useCookie(ACCESS_TOKEN_NAME)
  const user = computed(() => token.value ? jwtDecode<AuthUser>(token.value) : null)
  const isAuthenticated = computed(() => !!user.value)

  function login(provider: AuthProvider) {
    const { public: { baseURL } } = useRuntimeConfig()
    location.href = `${baseURL}/oauth2/authorization/${provider}`
  }

  async function logout() {
    token.value = null
    navigateTo('/auth/login')
    toast.add({
      icon: 'i-heroicons-lock-open',
      title: '로그아웃',
      description: '로그아웃 되었습니다.',
      color: 'green'
    })
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout
  }
})
