import express from 'express';
import { makeRegisterUserHandler } from './register-users.ts';
import { LoggerEnv } from '../../domain/logger.ts';
import { UserEnv } from '../../domain/users.ts';
import { EmailEnv } from '../../domain/email.ts';
import { Config } from '../../config.ts';

export type AppEnv = LoggerEnv & UserEnv & EmailEnv;

export const makeApp = (config: Config, env: AppEnv) => {
  const app = express();
  const { port } = config.server;
  // eslint-disable-next-line functional/no-expression-statements
  app.use(express.json());

  // eslint-disable-next-line functional/no-expression-statements
  app.post('/users', makeRegisterUserHandler(env));

  return {
    // eslint-disable-next-line functional/no-return-void
    start: () => {
      // eslint-disable-next-line functional/no-expression-statements, functional/no-return-void
      app.listen(port, () => {
        env.logger.log(`Example app listening on port ${port}`);
      });
    },
  };
};
