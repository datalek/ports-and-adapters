import { LoggerEnv } from '../../domain/logger.js';

export const makeLogger = (): LoggerEnv['logger'] => console;
