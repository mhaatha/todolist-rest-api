import { z, ZodType } from 'zod';

export const createTodolist: ZodType = z.object({
  name: z.string().min(1).max(50),
  priority: z.number().min(0).max(5),
  tags: z.array(z.string()).optional(),
  userId: z.string().regex(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/, { message: 'Invalid user id' })
}).strict();