import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import { GenericError } from "../../domain/DomainError";
import { makeUser, makeUserId, User } from "../../domain/users/types";
import { UserRepository } from "../../domain/users/UserRepository";

const insertEntityTE =
  <K, V>(store: Map<K, V>) =>
  (idFn: (v: V) => K) =>
  (entity: V): TE.TaskEither<GenericError, V> => {
    const id = idFn(entity);
    store.set(id, entity);
    return TE.right(entity);
  };

export const makeUserRepository = (
  gen: () => string,
  snapshot: ReadonlyArray<User>
): UserRepository => {
  const store =
    new Map(snapshot.map((entity) => [entity.id, entity]));

  return {
    insert: (definition) => pipe(
      makeUserId(gen()),
      (id) => makeUser(id)(definition),
      insertEntityTE(store)((v) => v.id)
    )
  }
};
