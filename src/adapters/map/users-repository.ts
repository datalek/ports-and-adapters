import { User, UserEnv } from '../../domain/users.js';

export const makeUserRepository = (
  map: ReadonlyMap<User['id'], User> = new Map(),
): UserEnv['userRepository'] => {
  const db = new Map(map);
  return {
    insert: async (definition) => {
      const id = crypto.randomUUID();
      const user = { id, ...definition };
      // eslint-disable-next-line functional/no-expression-statements, functional/immutable-data
      db.set(id, user);
      return user;
    },
  };
};
