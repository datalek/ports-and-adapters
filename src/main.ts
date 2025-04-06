import { makeUserRepository } from './adapters/map/users-repository.js';
import { makeLogger } from './adapters/console/logger.js';
import { makeMailer } from './adapters/aws/ses/email-mailer.js';
import { makeApp } from './adapters/express/app.js';
import { loadConfigOrThrow } from './config.js';

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
