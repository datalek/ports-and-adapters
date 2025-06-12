import { describe, it, expect } from 'vitest';
import { makeTestEnv } from './test-env.js';
import { registerUser } from '../users.js';
import { aUser, aUserDefinition } from './data.js';

describe('registerUser', () => {
  it('should work as expected', async () => {
    const env = makeTestEnv();

    env.userRepository.insert.mockResolvedValueOnce(aUser);

    const actual = await registerUser(aUserDefinition)(env);

    expect(actual).toStrictEqual(aUser);
    expect(env.userRepository.insert).toBeCalledTimes(1);
    expect(env.mailer.send).toBeCalledTimes(1);
    expect(env.logger.log).toBeCalledTimes(2);
  });
});
