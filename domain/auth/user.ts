export const Privilege = {
  COMMUNITY_READ: 'COMMUNITY_READ',
  MEMBER_READ: 'MEMBER_READ',
  MEMBER_WRITE: 'MEMBER_WRITE',
  MEMBER_DELETE: 'MEMBER_DELETE',
  MANAGER_READ: 'MANAGER_READ',
  MANAGER_WRITE: 'MANAGER_WRITE',
  MANAGER_DELETE: 'MANAGER_DELETE',
} as const

export type Privilege = typeof Privilege[keyof typeof Privilege]

export const Role = {
  GUEST: 'GUEST',
  USER: 'USER',
  ADMIN: 'ADMIN'
} as const

export type Role = typeof Role[keyof typeof Role]

export type AuthUser = {
  uid: number
  role : Role
  privileges: Privilege[]
  username: string
  nickname: string
  profileImageUrl: string
}
