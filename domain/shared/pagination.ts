import {z} from 'zod';

export interface Sort {
  field: string
  order: 'asc' | 'desc'
}

export interface PaginationQuery {
  next?: number
  limit?: number
  sort?: Sort
  q?: string
}

export const withPagination = <T>(schema: z.ZodType<T>) => z.object({
  items: z.array(schema),
  hasNext: z.boolean(),
  next: z.number().optional(),
})

export type Pagination<T> = z.infer<ReturnType<typeof withPagination>> & { items: T[] }
