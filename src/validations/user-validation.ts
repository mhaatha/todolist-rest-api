import { z, ZodType } from 'zod';

export const registerAndLogin: ZodType = z.object({
  username: z.string().min(6).max(36).regex(/^[a-z]*$/, { message: 'Username cannot contain spaces or capital letters' }),
  password: z.string().min(6)
}).strict();

export const updateUserBody: ZodType = z.object({
  username: z.string().min(6).max(36).regex(/^[a-z]*$/, { message: 'Username cannot contain spaces or capital letters' })
}).strict(); 