import type { Avatar } from '#ui/types'


declare module '#app' {
  interface NuxtApp {
    // $api: ofetch
    $formatDate: (rawTime: Date | string, locale?: Locale) => string
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    // $api: ofetch
    $formatDate: (rawTime: Date | string, locale?: Locale) => string
  }
}

export const enum ApiProvider {
  UPBIT = 'UPBIT',
}

export type UserStatus = 'subscribed' | 'unsubscribed' | 'bounced'

export interface User {
  id: number
  name: string
  email: string
  avatar?: Avatar
  status: UserStatus
  location: string
}

export interface Mail {
  id: number
  unread?: boolean
  from: User
  subject: string
  body: string
  date: string
}

export interface Member {
  name: string
  username: string
  role: 'member' | 'owner'
  avatar: Avatar
}

export interface Notification {
  id: number
  unread?: boolean
  sender: User
  body: string
  date: string
}

export type Period = 'daily' | 'weekly' | 'monthly'

export interface Range {
  start: Date
  end: Date
}

