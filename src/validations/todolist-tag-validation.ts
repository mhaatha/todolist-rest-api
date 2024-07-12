import { z, ZodType } from 'zod';

export const todolistTagBodyRequest: ZodType = z.object({
  todolistId: z.string().regex(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/, { message: 'Invalid uuid' }),
  tagId: z.string().regex(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/, { message: 'Invalid uuid' })
}).strict();