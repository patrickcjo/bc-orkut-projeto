import { z } from 'zod';

const content = z
  .string()
  .min(16, {
    message: 'Suapublicação precisa ter pelo menos 16 caracteres',
  })
  .max(270, {
    message: 'Sua publicação precisa ter no máximo 270 caracters',
  });

export const PostSchema = z.object({
  content,
/*   user_id: z.number().nullable(), */
});
