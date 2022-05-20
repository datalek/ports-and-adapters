import * as TE from "fp-ts/TaskEither";
import { GenericError } from "../DomainError";
import { User, UserDefinition } from "./types";

export interface UserRepository {
  /**
   * Given a user definition returns a user
   */
  insert: (definition: UserDefinition) => TE.TaskEither<GenericError, User>

}
