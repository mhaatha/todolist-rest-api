import { z, ZodType } from "zod";

export const register: ZodType = z.object({
  username: z.string().min(6).max(36),
  password: z.string().min(6)
});