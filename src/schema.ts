import { z } from 'zod'

export const ZodOptionsSchema = z.object({
  region: z.string(),
  accessKeyId: z.string(),
  secretAccessKey: z.string(),
})
