import {z} from 'zod';

export const DataRecordSchema = z.object({
  date: z.coerce.date(),
  amount: z.number(),
})

export const DataRecordsSchema = z.array(DataRecordSchema)

export type DataRecord = z.infer<typeof DataRecordSchema>
