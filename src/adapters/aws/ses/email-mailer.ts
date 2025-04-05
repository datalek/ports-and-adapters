import { EmailEnv } from '../../../domain/email.js';
import { LoggerEnv } from '../../../domain/logger.js';

export const makeMailer = (
  logger: LoggerEnv['logger'],
): EmailEnv['mailer'] => ({
  send: async (email) => {
    logger.info('Sending email to:', email.to);
    return void 0;
  },
});
