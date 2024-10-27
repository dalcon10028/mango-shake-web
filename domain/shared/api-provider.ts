
export const ApiProviderName = ['UPBIT'] as const;
export type ApiProviderName = typeof ApiProviderName[number];

export interface ApiProvider {
  value: ApiProviderName;
  name: string;
  iconUrl: string;
}

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
