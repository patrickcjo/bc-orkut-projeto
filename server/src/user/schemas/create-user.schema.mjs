import { z } from 'zod';

export const createUserSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  avatar: z.string(),
  password: z.string(),
});
