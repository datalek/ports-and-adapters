import { makeUserRepository } from './adapters/map/users-repository.ts';
import { makeLogger } from './adapters/console/logger.ts';
import { makeMailer } from './adapters/aws/ses/email-mailer.ts';
import { makeApp } from './adapters/express/app.ts';
import { loadConfigOrThrow } from './config.ts';

const config = loadConfigOrThrow(process.env);

// create the adapters
const logger = makeLogger();
const userRepository = makeUserRepository();
const mailer = makeMailer(logger);

const env = {
  userRepository,
  mailer,
  logger,
};

// create the app
const app = makeApp(config, env);

// start the app
app.start();
