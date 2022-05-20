import * as TE from "fp-ts/TaskEither";
import { GenericError } from "../domain/DomainError";
import { User, UserDefinition } from "../domain/users/types";
import { UserRepository } from "../domain/users/UserRepository";

type RegisterUserError =
  | GenericError

export type RegisterUserUseCase =
  (definition: UserDefinition) =>
  TE.TaskEither<RegisterUserError, User>

export const RegisterUserUseCase =
  (userRepository: UserRepository): RegisterUserUseCase =>
  (definition) => {
    return userRepository.insert(definition)
}
