import * as O from "fp-ts/Option";
import * as TE from "fp-ts/TaskEither";
import { GenericError } from "../domain/DomainError";
import { User, UserId } from "../domain/users/types";
import { UserRepository } from "../domain/users/UserRepository";

type FindUserError =
  | GenericError

export const FindUserUseCase =
  (userRepository: UserRepository) =>
    (id: UserId): TE.TaskEither<FindUserError, O.Option<User>> =>
      userRepository.find(id)

export type FindUserUseCase =
  ReturnType<typeof FindUserUseCase>;
