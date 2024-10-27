import {z} from 'zod';
import {ApiProviderFactory, ApiProviderName} from "~/domain/shared/api-provider";

export const WalletStatus = ['ACTIVE', 'INACTIVE'] as const

export type WalletStatus = typeof WalletStatus[number]

export const WalletSchema = z.object({
  id: z.number(),
  apiProvider: z.enum(ApiProviderName).transform(value => ApiProviderFactory(value)),
  status: z.enum(WalletStatus),
  appKey: z.string(),
  // additionalInfo: z.object({type: z.string(),},),
  memo: z.string().optional(),
  beginningAssets: z.number(),
  endingAssets: z.number(),
  depositsDuringPeriod: z.number(),
  withdrawalsDuringPeriod: z.number(),
  createdAt: z.coerce.date(),
})

export const WalletsSchema = z.array(WalletSchema)

export type Wallet = z.infer<typeof WalletSchema>

