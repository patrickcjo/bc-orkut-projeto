import { z } from 'zod';

const message = z
  .string()
  .min(4, {
    message: 'A mensagem precisa ter pelo menos 4 caracteres',
  })
  .max(96, {
    message: 'A mensagem precisa ter no máximo 96 caracteres',
  });

export const createPostCommentSchema = z.object({
  message,
  user_id: z.number().nullable(),
});