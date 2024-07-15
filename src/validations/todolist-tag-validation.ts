import { z, ZodType } from 'zod';

const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

export const todolistTagBodyRequest: ZodType = z.object({
  todolist_id: z.string().regex(uuidRegex, { message: 'Invalid uuid' }),
  tag_id: z.string().regex(uuidRegex, { message: 'Invalid uuid' })
}).strict();