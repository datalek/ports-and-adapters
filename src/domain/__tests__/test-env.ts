import { vi } from 'vitest';
import { UserEnv } from '../users.js';
import { EmailEnv } from '../email.js';
import { LoggerEnv } from '../logger.js';

export const makeTestEnv = () => ({
  userRepository: {
    insert: vi.fn<UserEnv['userRepository']['insert']>(),
  },
  mailer: {
    send: vi.fn<EmailEnv['mailer']['send']>(),
  },
  logger: {
    log: vi.fn<LoggerEnv['logger']['log']>(),
    info: vi.fn<LoggerEnv['logger']['info']>(),
    warn: vi.fn<LoggerEnv['logger']['warn']>(),
    error: vi.fn<LoggerEnv['logger']['error']>(),
    debug: vi.fn<LoggerEnv['logger']['debug']>(),
  },
});
