import express from 'express';
import { makeRegisterUserHandler } from './register-users.js';
import { LoggerEnv } from '../../domain/logger.js';
import { UserEnv } from '../../domain/users.js';
import { EmailEnv } from '../../domain/email.js';
import { Config } from '../../config.js';

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
