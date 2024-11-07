export const AuthProvider = {
  KAKAO: 'kakao',
} as const

export type AuthProvider = typeof AuthProvider[keyof typeof AuthProvider]
