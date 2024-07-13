import { z, ZodType } from 'zod';

const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

export const todolistBodyRequest: ZodType = z.object({
  name: z.string().min(1).max(50),
  priority: z.number().min(0).max(4),
  userId: z.string().regex(uuidRegex, { message: 'Invalid user id' })
}).strict();