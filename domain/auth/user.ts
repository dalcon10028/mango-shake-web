export const Role = {
  GUEST: 'GUEST',
  USER: 'USER',
  ADMIN: 'ADMIN'
} as const

export type Role = typeof Role[keyof typeof Role]

export type AuthUser = {
  uid: number
  role : Role
  username: string
  nickname: string
  profileImageUrl: string
}
