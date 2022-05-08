import * as TE from "fp-ts/TaskEither";
import { User, UserDefinition } from "./types";

export interface UserRepository {
  /**
   * Given a user definition returns a user
   */
  insert: (definition: UserDefinition) => TE.TaskEither<Error, User>

}
