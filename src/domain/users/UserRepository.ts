import * as O from "fp-ts/Option";
import * as TE from "fp-ts/TaskEither";
import { GenericError } from "../DomainError";
import { User, UserDefinition, UserId } from "./types";

export interface UserRepository {
  /**
   * Given a user definition returns a user
   */
  insert: (definition: UserDefinition) => TE.TaskEither<GenericError, User>

  /*
   * Given a user id return the user
   */
  find: (id: UserId) => TE.TaskEither<GenericError, O.Option<User>>
}
