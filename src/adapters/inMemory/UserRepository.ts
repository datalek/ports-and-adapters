import * as TE from "fp-ts/TaskEither";
import { UserRepository } from "../../domain/users/UserRepository";

export const makeUserRepository = (): UserRepository => ({
  insert: (_) => TE.left(new Error("NYI"))
})
