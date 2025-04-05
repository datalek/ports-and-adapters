import express from 'express';
import z from 'zod';
import { registerUser } from '../../domain/users.js';
import { AppEnv } from './app.js';

const RegisterUserBodyCodec = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  age: z.number(),
});

export const makeRegisterUserHandler =
  (env: AppEnv) => async (req: express.Request, res: express.Response) => {
    const result = RegisterUserBodyCodec.safeParse(req.body);

    if (result.success) {
      const user = await registerUser(result.data)(env);
      // eslint-disable-next-line functional/no-expression-statements
      res.json(user);
    } else {
      const response = { error: result.error.issues };
      // eslint-disable-next-line functional/no-expression-statements
      res.status(400).json(response);
    }
  };
