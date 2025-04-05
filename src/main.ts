import { makeUserRepository } from './adapters/map/users-repository.js';
import { makeLogger } from './adapters/console/logger.js';
import { makeMailer } from './adapters/aws/ses/email-mailer.js';
import { makeApp } from './adapters/express/app.js';

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
const app = makeApp(env);

// start the app
app.start();
