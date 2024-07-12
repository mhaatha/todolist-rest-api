import { z, ZodType } from 'zod';

export const tagBodyRequest: ZodType = z.object({
  name: z.string().min(1).max(50)
}).strict();