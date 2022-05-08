import * as TE from "fp-ts/TaskEither";
import { User, UserDefinition } from "../domain/users/types";
import { UserRepository } from "../domain/users/UserRepository";

type RegisterUserError =
  | "InvalidAge"
  | "InvalidFirstName"

export const RegisterUserUseCase =
  (userRepository: UserRepository) =>
  (definition: UserDefinition): TE.TaskEither<RegisterUserError, User> => {
    return TE.left("InvalidAge")
  }
