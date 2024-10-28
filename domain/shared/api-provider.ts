import { z } from 'zod';

export const ApiProviderName = ['UPBIT'] as const;
export type ApiProviderName = typeof ApiProviderName[number];

export const ApiProviderSchema = z.object({
  value: z.enum(ApiProviderName),
  name: z.string(),
  iconUrl: z.string(),
});

export interface ApiProvider extends z.infer<typeof ApiProviderSchema> {}

export const ApiProviderFactory = (name: ApiProviderName): ApiProvider => {
  switch (name) {
    case 'UPBIT':
      return {
        value: 'UPBIT',
        name: '업비트',
        iconUrl: 'assets/icons/upbit.jpg',
      };
    default:
      throw new Error(`Unknown api provider: ${name}`);
  }
}
