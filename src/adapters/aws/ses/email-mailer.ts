import { EmailEnv } from '../../../domain/email.ts';
import { LoggerEnv } from '../../../domain/logger.ts';

export const makeMailer = (
  logger: LoggerEnv['logger'],
): EmailEnv['mailer'] => ({
  send: async (email) => {
    logger.info('Sending email to:', email.to);
    return void 0;
  },
});
