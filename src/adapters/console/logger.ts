import { LoggerEnv } from '../../domain/logger.ts';

export const makeLogger = (): LoggerEnv['logger'] => console;
