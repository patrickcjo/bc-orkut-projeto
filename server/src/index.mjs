import 'express-async-errors';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ZodError } from 'zod';
import { postController } from './post/post.controller.mjs';
import { userController } from './user/user.controller.mjs';

const port = 9000;
const host = 'localhost';
const app = express();

function handleErrorMiddleware(err, req, res, next) {
  if (err instanceof ZodError) {
    console.error(err);
    return res.status(422).json(err);
  }

  throw err;
}

app.use(cors());
app.use(express.json());
app.use('/posts', postController);
app.use('/users', userController);
app.use(handleErrorMiddleware);

app.listen(port, host, () => {
  console.log(`Servidor express iniciado em http://${host}:${port}`);
});
